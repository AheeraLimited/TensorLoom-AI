import { useEffect, useRef } from 'react'

export default function NeuralLoomCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
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

    let isVisible = true
    const handleVisibility = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibility)

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

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    // Generate subtle optimized workflow nodes
    const nodeCount = Math.min(28, Math.floor((width * height) / 36000))
    const nodes = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.6 + 1.0,
        phase: Math.random() * Math.PI * 2,
        isAccent: Math.random() > 0.7
      })
    }

    // Subtle frosted white ambient wave curves
    const threads = [
      { yOffset: 0.2, amp: 28, freq: 0.0012, speed: 0.0005, color: 'rgba(255, 255, 255, 0.04)' },
      { yOffset: 0.5, amp: 36, freq: 0.0010, speed: 0.0004, color: 'rgba(255, 255, 255, 0.03)' },
      { yOffset: 0.75, amp: 30, freq: 0.0013, speed: -0.0004, color: 'rgba(255, 255, 255, 0.035)' },
    ]

    let time = 0
    const maxDist = 110
    const maxDistSq = maxDist * maxDist
    const mouseRadiusSq = 160 * 160

    const render = () => {
      if (isVisible) {
        time += 1
        ctx.clearRect(0, 0, width, height)

        // Smooth mouse lerp
        mouse.x += (mouse.targetX - mouse.x) * 0.08
        mouse.y += (mouse.targetY - mouse.y) * 0.08

        // 1. Draw light bezier curves
        for (let tIdx = 0; tIdx < threads.length; tIdx++) {
          const t = threads[tIdx]
          ctx.beginPath()
          const baseY = height * t.yOffset
          ctx.moveTo(0, baseY)

          for (let x = 0; x < width; x += 24) {
            const wave = Math.sin(x * t.freq + time * t.speed + tIdx) * t.amp
            const dx = x - mouse.x
            const dy = baseY + wave - mouse.y
            const distSq = dx * dx + dy * dy
            let mouseDisplace = 0
            if (distSq < mouseRadiusSq) {
              const dist = Math.sqrt(distSq)
              mouseDisplace = (1 - dist / 160) * -20
            }
            ctx.lineTo(x, baseY + wave + mouseDisplace)
          }

          ctx.strokeStyle = t.color
          ctx.lineWidth = 1.0
          ctx.stroke()
        }

        // 2. Update & render subtle nodes (batched lines for maximum FPS)
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
        ctx.lineWidth = 0.6

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i]
          n.x += n.vx
          n.y += n.vy

          // Wrap boundaries
          if (n.x < 0) n.x = width
          if (n.x > width) n.x = 0
          if (n.y < 0) n.y = height
          if (n.y > height) n.y = 0

          // Mouse attraction
          const mdx = mouse.x - n.x
          const mdy = mouse.y - n.y
          const mDistSq = mdx * mdx + mdy * mdy
          if (mouse.active && mDistSq < mouseRadiusSq) {
            const mDist = Math.sqrt(mDistSq)
            const force = (1 - mDist / 160) * 0.015
            n.x += mdx * force
            n.y += mdy * force
          }

          // Draw connections between nearby nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j]
            const dx = n.x - n2.x
            const dy = n.y - n2.y
            const distSq = dx * dx + dy * dy

            if (distSq < maxDistSq) {
              ctx.moveTo(n.x, n.y)
              ctx.lineTo(n2.x, n2.y)
            }
          }
        }
        ctx.stroke()

        // Draw node dots in a single batch
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i]
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
          ctx.fillStyle = n.isAccent ? 'rgba(255, 109, 66, 0.6)' : 'rgba(255, 255, 255, 0.25)'
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="neural-loom-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        transform: 'translateZ(0)',
        willChange: 'transform',
      }}
    />
  )
}
