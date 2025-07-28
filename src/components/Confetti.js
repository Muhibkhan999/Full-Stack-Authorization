import React, { useEffect, useRef } from 'react'

const Confetti = ({ isActive, onComplete }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (isActive) {
      const container = containerRef.current
      const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c']
      
      // Create minimal confetti particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div')
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 6 + 3}px;
          height: ${Math.random() * 6 + 3}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: 50%;
          pointer-events: none;
          z-index: 50;
          left: ${Math.random() * window.innerWidth}px;
          top: -10px;
          animation: confettiFall 2s linear forwards;
        `
        
        container.appendChild(particle)
        
        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 2000)
      }
      
      // Auto-complete after animation
      setTimeout(() => {
        onComplete && onComplete()
      }, 2500)
    }
  }, [isActive, onComplete])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  )
}

export default Confetti 