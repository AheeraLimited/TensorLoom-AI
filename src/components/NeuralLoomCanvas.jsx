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
      radius: 200,
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

    // Generate responsive workflow nodes
    const nodeCount = Math.min(48, Math.max(28, Math.floor((width * height) / 26000)))
    const nodes = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.2 + 1.2,
        phase: Math.random() * Math.PI * 2,
        isAccent: Math.random() > 0.65,
        isSky: Math.random() > 0.75
      })
    }

    const isLight = theme === 'light'
    
    // Distinct, vibrant wave filaments for Light and Dark modes
    const threadColors = isLight
      ? [
          'rgba(255, 109, 66, 0.22)',   // Vibrant coral ribbon
          'rgba(14, 165, 233, 0.20)',   // Vibrant sky cyan ribbon
          'rgba(139, 92, 246, 0.18)',   // Violet purple ribbon
          'rgba(16, 185, 129, 0.16)'    // Emerald accent ribbon
        ]
      : [
          'rgba(255, 109, 66, 0.12)', 
          'rgba(14, 165, 233, 0.10)', 
          'rgba(139, 92, 246, 0.09)',
          'rgba(255, 255, 255, 0.05)'
        ]

    const threads = [
      { yOffset: 0.15, amp: 42, freq: 0.0014, speed: 0.0006, color: threadColors[0], width: isLight ? 1.8 : 1.2 },
      { yOffset: 0.38, amp: 54, freq: 0.0010, speed: 0.0005, color: threadColors[1], width: isLight ? 2.0 : 1.4 },
      { yOffset: 0.65, amp: 46, freq: 0.0012, speed: -0.0005, color: threadColors[2], width: isLight ? 1.6 : 1.0 },
      { yOffset: 0.88, amp: 38, freq: 0.0015, speed: 0.0007, color: threadColors[3], width: isLight ? 1.4 : 1.0 }
    ]

    let time = 0
    const maxDist = 135
    const maxDistSq = maxDist * maxDist
    const mouseRadiusSq = 200 * 200

    const render = () => {
      if (isVisible) {
        time += 1
        ctx.clearRect(0, 0, width, height)

        // Smooth mouse lerp
        mouse.x += (mouse.targetX - mouse.x) * 0.08
        mouse.y += (mouse.targetY - mouse.y) * 0.08

        // 1. Draw flowing neural ribbons
        for (let tIdx = 0; tIdx < threads.length; tIdx++) {
          const t = threads[tIdx]
          ctx.beginPath()
          const baseY = height * t.yOffset
          ctx.moveTo(0, baseY)

          for (let x = 0; x <= width + 24; x += 20) {
            const wave = Math.sin(x * t.freq + time * t.speed + tIdx * 1.5) * t.amp
            const dx = x - mouse.x
            const dy = baseY + wave - mouse.y
            const distSq = dx * dx + dy * dy
            let mouseDisplace = 0
            if (distSq < mouseRadiusSq) {
              const dist = Math.sqrt(distSq)
              mouseDisplace = (1 - dist / 200) * -28
            }
            ctx.lineTo(x, baseY + wave + mouseDisplace)
          }

          ctx.strokeStyle = t.color
          ctx.lineWidth = t.width
          ctx.stroke()
        }

        // 2. Render connecting filaments between nearby nodes
        ctx.beginPath()
        ctx.strokeStyle = isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.08)'
        ctx.lineWidth = isLight ? 0.9 : 0.6

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
            const force = (1 - mDist / 200) * 0.02
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

        // 3. Draw constellation nodes with luminous colors
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i]
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)

          if (n.isAccent) {
            ctx.fillStyle = isLight ? 'rgba(255, 109, 66, 0.85)' : 'rgba(255, 109, 66, 0.8)'
          } else if (n.isSky) {
            ctx.fillStyle = isLight ? 'rgba(14, 165, 233, 0.75)' : 'rgba(14, 165, 233, 0.7)'
          } else {
            ctx.fillStyle = isLight ? 'rgba(15, 23, 42, 0.35)' : 'rgba(255, 255, 255, 0.3)'
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
