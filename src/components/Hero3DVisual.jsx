import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  Sparkles, Zap, Activity, CheckCircle2, ArrowUpRight, 
  Cpu, Shield, Layers, Bot
} from 'lucide-react'

export default function Hero3DVisual() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  // 3D Parallax Tilt with Smooth Physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 120 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  // 3D Neural Loom Canvas Engine (Data Splines, Orbital Rings & Volumetric Nodes)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let width = (canvas.width = canvas.offsetWidth * 2)
    let height = (canvas.height = canvas.offsetHeight * 2)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth * 2
      height = canvas.height = canvas.offsetHeight * 2
    }
    window.addEventListener('resize', handleResize)

    let t = 0
    // Generate 3D orbital data particles
    const particleCount = 46
    const particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        radius: 125 + Math.random() * 85,
        theta: Math.random() * Math.PI * 2,
        phi: (Math.random() - 0.5) * Math.PI * 0.75,
        speed: (Math.random() * 0.007 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2.6 + 1.2,
        color: i % 3 === 0 ? '#ff6d42' : i % 3 === 1 ? '#0ea5e9' : '#8b5cf6'
      })
    }

    const render = () => {
      t += 0.015
      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      const rotX = t * 0.2 + mouseY.get() * 0.6
      const rotY = t * 0.25 + mouseX.get() * 0.6

      // 1. Draw Refractive Orbital Loom Rings (Chassis)
      const ringCount = 3
      for (let r = 0; r < ringCount; r++) {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(rotY * (r % 2 === 0 ? 0.5 : -0.5) + (r * Math.PI) / 3)
        ctx.scale(1, 0.45 + r * 0.14)

        const radius = 145 + r * 35
        const grad = ctx.createLinearGradient(-radius, 0, radius, 0)
        grad.addColorStop(0, 'rgba(14, 165, 233, 0)')
        grad.addColorStop(0.3, r === 0 ? 'rgba(255, 109, 66, 0.5)' : 'rgba(234, 75, 113, 0.4)')
        grad.addColorStop(0.7, 'rgba(139, 92, 246, 0.5)')
        grad.addColorStop(1, 'rgba(14, 165, 233, 0)')

        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, Math.PI * 2)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5 + (r === 0 ? 0.8 : 0)
        ctx.stroke()
        ctx.restore()
      }

      // 2. Draw Weaving Glowing Data Splines (The Neural Loom)
      const threadCount = 4
      for (let k = 0; k < threadCount; k++) {
        ctx.beginPath()
        const phase = t * 1.15 + (k * Math.PI) / 2
        const startX = cx + Math.sin(phase) * 165
        const startY = cy + Math.cos(phase * 0.8) * 105
        const cp1X = cx + Math.cos(phase * 1.1) * 175
        const cp1Y = cy + Math.sin(phase * 0.9) * 135
        const cp2X = cx - Math.sin(phase * 0.7) * 175
        const cp2Y = cy - Math.cos(phase * 1.2) * 135
        const endX = cx - Math.cos(phase) * 165
        const endY = cy - Math.sin(phase * 0.8) * 105

        ctx.moveTo(startX, startY)
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, endX, endY)

        const splineGrad = ctx.createLinearGradient(startX, startY, endX, endY)
        splineGrad.addColorStop(0, 'rgba(255, 109, 66, 0.65)')
        splineGrad.addColorStop(0.5, 'rgba(234, 75, 113, 0.7)')
        splineGrad.addColorStop(1, 'rgba(139, 92, 246, 0.65)')

        ctx.strokeStyle = splineGrad
        ctx.lineWidth = 2.2
        ctx.shadowColor = '#ff6d42'
        ctx.shadowBlur = 10
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      // 3. 3D Orbiting Data Particles
      particles.forEach((p) => {
        p.theta += p.speed

        const x3d = p.radius * Math.cos(p.theta) * Math.cos(p.phi)
        const y3d = p.radius * Math.sin(p.phi)
        const z3d = p.radius * Math.sin(p.theta) * Math.cos(p.phi)

        const xRot = x3d * Math.cos(rotY) - z3d * Math.sin(rotY)
        const zRot = x3d * Math.sin(rotY) + z3d * Math.cos(rotY)
        const yRot = y3d * Math.cos(rotX) - zRot * Math.sin(rotX)
        const depth = zRot * Math.cos(rotX) + y3d * Math.sin(rotX)

        const scale = (depth + 290) / 290
        if (scale <= 0) return

        const screenX = cx + xRot * scale
        const screenY = cy + yRot * scale
        const alpha = Math.max(0.15, Math.min(0.92, (depth + 160) / 320))

        ctx.beginPath()
        ctx.arc(screenX, screenY, p.size * scale, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8 * scale
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1.0
      })

      // 4. Central Luminous Core Glow
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 95)
      coreGrad.addColorStop(0, 'rgba(255, 109, 66, 0.35)')
      coreGrad.addColorStop(0.4, 'rgba(234, 75, 113, 0.18)')
      coreGrad.addColorStop(0.8, 'rgba(139, 92, 246, 0.08)')
      coreGrad.addColorStop(1, 'transparent')

      ctx.beginPath()
      ctx.arc(cx, cy, 95, 0, Math.PI * 2)
      ctx.fillStyle = coreGrad
      ctx.fill()

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [mouseX, mouseY])

  return (
    <div 
      ref={containerRef}
      className="hero-3d-stage"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="hero-3d-rig"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background 3D Loom Canvas */}
        <canvas 
          ref={canvasRef} 
          className="hero-3d-canvas" 
          aria-hidden="true" 
        />

        {/* Ambient Backlight Halo */}
        <div className="hero-3d-halo" />

        {/* -------------------------------------------------------------
            FOCAL ELEMENT: Hyper-Realistic Frosted Glass Dashboard HUD
            ------------------------------------------------------------- */}
        <div className="hero-glass-hud tl-glass">
          {/* Top Bar Status */}
          <div className="hud-header">
            <div className="hud-status-group">
              <span className="pulse-dot dot-emerald" />
              <span className="hud-title">TensorEngine Live Loom</span>
            </div>
            <div className="hud-chip-badge">
              <Sparkles size={11} color="var(--coral)" />
              <span>v4.2 Active</span>
            </div>
          </div>

          {/* Core Telemetry Metrics */}
          <div className="hud-body">
            <div className="hud-metric-row">
              <div className="hud-metric-card">
                <span className="hud-metric-lbl">Throughput</span>
                <span className="hud-metric-val text-gradient-n8n">14.8k <span className="hud-metric-unit">ops/s</span></span>
              </div>
              <div className="hud-metric-card">
                <span className="hud-metric-lbl">Latency</span>
                <span className="hud-metric-val">12<span className="hud-metric-unit">ms</span></span>
              </div>
              <div className="hud-metric-card">
                <span className="hud-metric-lbl">Automation</span>
                <span className="hud-metric-val text-emerald">99.98%</span>
              </div>
            </div>

            {/* Live Visual Waveform Chart */}
            <div className="hud-stream-chart">
              <div className="hud-stream-top">
                <span className="hud-stream-label">
                  <Activity size={12} color="var(--coral)" />
                  <span>Real-Time Business Neural Flow</span>
                </span>
                <span className="hud-stream-rate">+42.6% Growth</span>
              </div>
              <div className="hud-bars-wrap">
                {[45, 62, 54, 78, 92, 68, 85, 96, 72, 88, 100, 84, 95, 70, 88].map((h, i) => (
                  <motion.div
                    key={i}
                    className="hud-live-bar"
                    style={{ height: `${h}%` }}
                    animate={{
                      scaleY: [1, 0.7 + (i % 4) * 0.15, 1],
                      opacity: [0.85, 1, 0.85]
                    }}
                    transition={{
                      duration: 1.6 + (i % 3) * 0.3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                      delay: i * 0.08
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Micro Chips */}
          <div className="hud-footer">
            <div className="hud-tag">
              <CheckCircle2 size={11} color="var(--emerald)" />
              <span>Smart Delivery CRM</span>
            </div>
            <div className="hud-tag">
              <Zap size={11} color="var(--coral)" />
              <span>Autonomous Agents</span>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------
            SATELLITE FLOATING GLASS PILL BADGES (VISITE Style Orbit)
            ------------------------------------------------------------- */}

        {/* Top-Right Pill: '0:10 Instant Sync' */}
        <motion.div 
          className="hero-orbit-pill pill-top-right tl-glass"
          animate={{
            y: [-3, 4, -3]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className="pill-dot dot-coral" />
          <span className="pill-bold">0:10</span>
          <span className="pill-dim">Instant Sync</span>
          <ArrowUpRight size={13} className="pill-arrow" />
        </motion.div>

        {/* Top-Left Pill: 'Autonomous AI Loom' */}
        <motion.div 
          className="hero-orbit-pill pill-top-left tl-glass"
          animate={{
            y: [4, -4, 4]
          }}
          transition={{
            duration: 5.0,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.3
          }}
        >
          <Cpu size={13} color="var(--coral)" />
          <span className="pill-text">Autonomous AI Architecture</span>
        </motion.div>

        {/* Bottom-Right Pill: '24/7 Enterprise Scale' */}
        <motion.div 
          className="hero-orbit-pill pill-bottom-right tl-glass"
          animate={{
            y: [3, -4, 3]
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.6
          }}
        >
          <Shield size={13} color="var(--emerald)" />
          <span className="pill-text">24/7 Enterprise Scale</span>
        </motion.div>

      </motion.div>
    </div>
  )
}
