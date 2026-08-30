import { useEffect, useRef } from 'react'

export default function NeuralLoomCanvas({ theme = 'light' }) {
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
      radius: 180,
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

    // Gentle, subtle node count
    const nodeCount = Math.min(32, Math.max(20, Math.floor((width * height) / 38000)))
    const nodes = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.4 + 1.0,
        phase: Math.random() * Math.PI * 2,
        isAccent: Math.random() > 0.75,
        isSky: Math.random() > 0.80
      })
    }

    const isLight = theme === 'light'
    
    // Soft, elegant wave colors (gentle and soothing, not overpowering)
    const threadColors = isLight
      ? [
          'rgba(255, 109, 66, 0.08)',   // Soft coral mist
          'rgba(14, 165, 233, 0.07)',   // Soft sky mist
          'rgba(139, 92, 246, 0.06)',   // Soft violet mist
          'rgba(16, 185, 129, 0.05)'    // Soft emerald mist
        ]
      : [
          'rgba(255, 109, 66, 0.08)', 
          'rgba(14, 165, 233, 0.07)', 
          'rgba(139, 92, 246, 0.06)',
          'rgba(255, 255, 255, 0.04)'
        ]

    const threads = [
      { yOffset: 0.18, amp: 32, freq: 0.0012, speed: 0.0004, color: threadColors[0] },
      { yOffset: 0.45, amp: 38, freq: 0.0009, speed: 0.0003, color: threadColors[1] },
      { yOffset: 0.72, amp: 34, freq: 0.0011, speed: -0.0003, color: threadColors[2] },
    ]

    let time = 0
    const maxDist = 115
    const maxDistSq = maxDist * maxDist
    const mouseRadiusSq = 180 * 180

    const render = () => {
      if (isVisible) {
        time += 1
        ctx.clearRect(0, 0, width, height)

        // Smooth mouse lerp
        mouse.x += (mouse.targetX - mouse.x) * 0.06
        mouse.y += (mouse.targetY - mouse.y) * 0.06

        // 1. Draw soft undulating ribbons
        for (let tIdx = 0; tIdx < threads.length; tIdx++) {
          const t = threads[tIdx]
          ctx.beginPath()
          const baseY = height * t.yOffset
          ctx.moveTo(0, baseY)

          for (let x = 0; x <= width + 24; x += 24) {
            const wave = Math.sin(x * t.freq + time * t.speed + tIdx * 1.5) * t.amp
            const dx = x - mouse.x
            const dy = baseY + wave - mouse.y
            const distSq = dx * dx + dy * dy
            let mouseDisplace = 0
            if (distSq < mouseRadiusSq) {
              const dist = Math.sqrt(distSq)
              mouseDisplace = (1 - dist / 180) * -18
            }
            ctx.lineTo(x, baseY + wave + mouseDisplace)
          }

          ctx.strokeStyle = t.color
          ctx.lineWidth = 1.0
          ctx.stroke()
        }

        // 2. Render connecting filaments between nearby nodes
        ctx.beginPath()
        ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.05)' : 'rgba(255, 255, 255, 0.04)'
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

          // Gentle mouse displacement
          const mdx = mouse.x - n.x
          const mdy = mouse.y - n.y
          const mDistSq = mdx * mdx + mdy * mdy
          if (mouse.active && mDistSq < mouseRadiusSq) {
            const mDist = Math.sqrt(mDistSq)
            const force = (1 - mDist / 180) * 0.012
            n.x += mdx * force
            n.y += mdy * force
          }

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

        // 3. Draw soft, delicate nodes
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i]
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)

          if (n.isAccent) {
            ctx.fillStyle = isLight ? 'rgba(255, 109, 66, 0.45)' : 'rgba(255, 109, 66, 0.5)'
          } else if (n.isSky) {
            ctx.fillStyle = isLight ? 'rgba(14, 165, 233, 0.38)' : 'rgba(14, 165, 233, 0.4)'
          } else {
            ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.16)' : 'rgba(255, 255, 255, 0.18)'
          }
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
  }, [theme])

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
