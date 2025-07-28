import React, { useEffect, useRef } from 'react'

const ParticleBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse position
    let mouseX = 0
    let mouseY = 0
    let isMouseMoving = false

    // Track mouse movement
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMouseMoving = true
      
      setTimeout(() => {
        isMouseMoving = false
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Enhanced Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 4 + 2
        this.speedX = Math.random() * 1.5 - 0.75
        this.speedY = Math.random() * 1.5 - 0.75
        this.opacity = Math.random() * 0.6 + 0.3
        this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`
        this.originalX = this.x
        this.originalY = this.y
        this.attractionRadius = 150
      }

      update() {
        // Calculate distance from mouse
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Magnetic attraction effect
        if (distance < this.attractionRadius && isMouseMoving) {
          const force = (this.attractionRadius - distance) / this.attractionRadius
          this.x += dx * force * 0.02
          this.y += dy * force * 0.02
          
          // Increase opacity when attracted
          this.opacity = Math.min(1, this.opacity + force * 0.1)
        } else {
          // Return to original position gradually
          this.x += (this.originalX - this.x) * 0.01
          this.y += (this.originalY - this.y) * 0.01
          
          // Normal movement
          this.x += this.speedX
          this.y += this.speedY
          
          // Reset opacity
          this.opacity = Math.max(0.3, this.opacity - 0.01)
        }

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height

        // Update original position for smooth return
        this.originalX += this.speedX * 0.1
        this.originalY += this.speedY * 0.1
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        
        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        )
        gradient.addColorStop(0, this.color)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Add glow effect
        ctx.shadowColor = this.color
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()
      }
    }

    // Create particles
    const particles = []
    const particleCount = 80

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const bgGradient = ctx.createRadialGradient(
        mouseX, mouseY, 0,
        mouseX, mouseY, Math.max(canvas.width, canvas.height)
      )
      bgGradient.addColorStop(0, 'rgba(102, 126, 234, 0.1)')
      bgGradient.addColorStop(0.5, 'rgba(118, 75, 162, 0.05)')
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
      
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw enhanced connections
      particles.forEach((particle, index) => {
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x
          const dy = particle.y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = 0.15 * (1 - distance / 120)
            ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`
            ctx.lineWidth = 2
            ctx.lineCap = 'round'
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })

      // Draw mouse influence area
      if (isMouseMoving) {
        const influenceGradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 200
        )
        influenceGradient.addColorStop(0, 'rgba(102, 126, 234, 0.1)')
        influenceGradient.addColorStop(1, 'rgba(102, 126, 234, 0)')
        
        ctx.fillStyle = influenceGradient
        ctx.beginPath()
        ctx.arc(mouseX, mouseY, 200, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

export default ParticleBackground 