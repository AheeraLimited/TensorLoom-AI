import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import lottie from 'lottie-web'
import welcomeMorphAnimation from '../assets/welcome-morph.json'
import LoomMark from './LoomMark.jsx'
import './WelcomeScreen.css'

const BOOT_STAGES = [
  'Initializing Neural Architecture...',
  'Weaving Autonomous AI Mesh...',
  'Compiling Intelligent Workflows...',
  'Welcome to TensorLoom AI'
]

export default function WelcomeScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [stageIndex, setStageIndex] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const lottieContainerRef = useRef(null)
  const animInstanceRef = useRef(null)
  const hasFinishedRef = useRef(false)

  const handleFinish = useCallback(() => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    setProgress(100)
    setIsExiting(true)
    setTimeout(() => {
      if (onComplete) onComplete()
    }, 450)
  }, [onComplete])

  // 1. Hardware-Accelerated Lottie Animation Mounting
  useEffect(() => {
    if (lottieContainerRef.current) {
      lottieContainerRef.current.innerHTML = ''
      const anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: welcomeMorphAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet',
        }
      })
      if (anim && typeof anim.setSubframe === 'function') {
        anim.setSubframe(true)
      }
      animInstanceRef.current = anim
    }

    return () => {
      if (animInstanceRef.current) {
        animInstanceRef.current.destroy()
        animInstanceRef.current = null
      }
    }
  }, [])

  // 2. High-Performance Boot Progress Lifecycle (8.4s duration synced to 35 FPS)
  useEffect(() => {
    const startTime = performance.now()
    const DURATION = 8400 // 8.4s total (294 frames / 35 fps)

    let rafId
    const step = (now) => {
      const elapsed = now - startTime
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100))
      setProgress(pct)

      if (pct >= 100) {
        setTimeout(handleFinish, 350)
      } else {
        rafId = requestAnimationFrame(step)
      }
    }

    rafId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [handleFinish])

  // 3. Stage switching based on progress
  useEffect(() => {
    if (progress < 30) setStageIndex(0)
    else if (progress < 65) setStageIndex(1)
    else if (progress < 92) setStageIndex(2)
    else setStageIndex(3)
  }, [progress])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          className="welcome-screen-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: 'blur(20px)', pointerEvents: 'none' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleFinish}
        >
          {/* Deep Ambient Atmospheric Neural Glow Backdrop */}
          <div className="welcome-backdrop">
            <div className="welcome-blob blob-purple" />
            <div className="welcome-blob blob-coral" />
            <div className="welcome-blob blob-cyan" />
            <div className="welcome-mesh-overlay" />
          </div>

          {/* Top-Right Frosted Glass Skip Pill */}
          <button 
            type="button" 
            className="welcome-skip-btn"
            onClick={(e) => {
              e.stopPropagation()
              handleFinish()
            }}
            aria-label="Skip Intro"
          >
            <span>Skip</span>
            <span className="skip-arrow">→</span>
          </button>

          {/* Central Frosted Glass Hologram Pod */}
          <motion.div 
            className="welcome-glass-pod"
            initial={{ scale: 0.93, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Morphing Animation Container */}
            <div className="welcome-animation-wrap">
              <div className="welcome-lottie-halo" />
              <div 
                ref={lottieContainerRef} 
                className="welcome-lottie-player"
              />
            </div>

            {/* Brand Mark & Typography */}
            <div className="welcome-brand-group">
              <div className="welcome-brand-header">
                <LoomMark size={28} />
                <h1 className="welcome-brand-title">
                  TensorLoom <span className="text-gradient-coral">AI</span>
                </h1>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={stageIndex}
                  className="welcome-stage-capsule"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="stage-pulse-dot" />
                  <p className="welcome-stage-status">{BOOT_STAGES[stageIndex]}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Frosted Glass Progress Meter Strip */}
            <div className="welcome-meter-strip">
              <div className="welcome-meter-track">
                <motion.div 
                  className="welcome-meter-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="welcome-meter-metrics">
                <span className="metric-tag">SYS: ONLINE</span>
                <span className="metric-pct">{progress}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
