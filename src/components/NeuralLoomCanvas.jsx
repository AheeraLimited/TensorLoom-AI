import { useEffect, useRef } from 'react'

export default function NeuralLoomCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouse = {
      x: width / 2,
      y: height / 3,
      targetX: width / 2,
      targetY: height / 3,
      radius: 160,
      active: false
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Generate subtle workflow nodes
    const nodeCount = Math.min(45, Math.floor((width * height) / 28000))
    const nodes = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2 + 1.2,
        phase: Math.random() * Math.PI * 2,
        isAccent: Math.random() > 0.65
      })
    }

    // Light-mode workflow bezier curves (coral & lavender)
    const threads = [
      { yOffset: 0.18, amp: 35, freq: 0.0015, speed: 0.0006, color: 'rgba(255, 109, 66, 0.07)' },
      { yOffset: 0.42, amp: 50, freq: 0.0011, speed: 0.0005, color: 'rgba(124, 58, 237, 0.05)' },
      { yOffset: 0.68, amp: 40, freq: 0.0014, speed: -0.0005, color: 'rgba(255, 109, 66, 0.05)' },
    ]

    let time = 0

    const render = () => {
      time += 1
      ctx.clearRect(0, 0, width, height)

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      // 1. Draw light bezier curves
      threads.forEach((t, index) => {
        ctx.beginPath()
        const baseY = height * t.yOffset
        ctx.moveTo(0, baseY)

        for (let x = 0; x < width; x += 15) {
          const wave = Math.sin(x * t.freq + time * t.speed + index) * t.amp
          const mouseDist = Math.hypot(x - mouse.x, baseY + wave - mouse.y)
          let mouseDisplace = 0
          if (mouseDist < mouse.radius) {
            mouseDisplace = (1 - mouseDist / mouse.radius) * -25
          }
          ctx.lineTo(x, baseY + wave + mouseDisplace)
        }

        ctx.strokeStyle = t.color
        ctx.lineWidth = 1.2
        ctx.stroke()
      })

      // 2. Update & render subtle nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx
        n.y += n.vy
        n.phase += 0.02

        // Wrap boundaries
        if (n.x < 0) n.x = width
        if (n.x > width) n.x = 0
        if (n.y < 0) n.y = height
        if (n.y > height) n.y = 0

        // Mouse attraction
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const dist = Math.hypot(dx, dy)
        if (mouse.active && dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.015
          n.x += dx * force
          n.y += dy * force
        }

        // Draw connections between nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const dNodes = Math.hypot(n.x - n2.x, n.y - n2.y)
          const maxDist = 120

          if (dNodes < maxDist) {
            const alpha = (1 - dNodes / maxDist) * 0.14
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.strokeStyle = n.isAccent || n2.isAccent
              ? `rgba(255, 109, 66, ${alpha * 1.5})`
              : `rgba(20, 18, 30, ${alpha * 0.5})`
            ctx.lineWidth = n.isAccent ? 1.0 : 0.6
            ctx.stroke()
          }
        }

        // Connect to mouse if close
        if (mouse.active && dist < mouse.radius) {
          const mouseAlpha = (1 - dist / mouse.radius) * 0.25
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(255, 109, 66, ${mouseAlpha})`
          ctx.lineWidth = 1.0
          ctx.stroke()
        }

        // Draw node dot
        const pulse = Math.sin(n.phase) * 0.2 + 0.8
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = n.isAccent ? 'rgba(255, 109, 66, 0.45)' : 'rgba(20, 18, 30, 0.18)'
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.95
      }}
      aria-hidden="true"
    />
  )
}
