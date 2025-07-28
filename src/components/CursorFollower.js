import React, { useEffect, useRef } from 'react'

const CursorFollower = () => {
  const cursorRef = useRef(null)
  const borderRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const border = borderRef.current

    let mouseX = 0
    let mouseY = 0
    let borderX = 0
    let borderY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Animation loop for smooth border following
    const animate = () => {
      // Main cursor follows instantly
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      
      // Border circle follows with delay (trail effect)
      borderX += (mouseX - borderX) * 0.08
      borderY += (mouseY - borderY) * 0.08
      
      border.style.transform = `translate(${borderX}px, ${borderY}px) translate(-50%, -50%)`
      
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Simple main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50"
        style={{
          width: '10px',
          height: '10px',
          background: '#667eea',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(102, 126, 234, 0.8)',
          willChange: 'transform'
        }}
      />
      
      {/* Border circle with trail effect */}
      <div
        ref={borderRef}
        className="fixed pointer-events-none z-40"
        style={{
          width: '50px',
          height: '50px',
          border: '2px solid rgba(102, 126, 234, 0.7)',
          borderRadius: '50%',
          willChange: 'transform'
        }}
      />
    </>
  )
}

export default CursorFollower 