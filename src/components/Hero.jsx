import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, Shield, Zap, Sparkles, Calendar, Cpu, Layers
} from 'lucide-react'
import HeroLottieVisual from './HeroLottieVisual.jsx'
import './Hero.css'

const KINETIC_WORDS = [
  'Custom Web Apps',
  'Online Stores',
  'AI Workflows',
  'Business Automation'
]

export default function Hero({ onOpenDiscoveryModal }) {
  const [wordIdx, setWordIdx] = useState(0)

  // Cycle kinetic words smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % KINETIC_WORDS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="top" className="hero-section hero-split-layout">
      {/* -------------------------------------------------------------
          1. Atmospheric Ambient Backdrop
          ------------------------------------------------------------- */}
      <div className="hero-atmospheric-backdrop" aria-hidden="true">
        <div className="hero-glow-blob blob-purple-left" />
        <div className="hero-glow-blob blob-coral-center" />
        <div className="hero-glow-blob blob-cyan-right" />
        <div className="hero-mesh-overlay" />
      </div>

      <div className="tl-shell hero-split-shell">
        <div className="hero-grid-split">
          
          {/* =========================================================
              2. LEFT SIDE: Clean Minimal Hero Typography & Actions
              ========================================================= */}
          <motion.div 
            className="hero-content-col"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Top Eyebrow Glass Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-badge-wrap"
            >
              <div className="eyebrow hero-glass-eyebrow">
                <span className="pulse-dot dot-coral" />
                <span>CUSTOM WEB APPS & AI AUTOMATION</span>
              </div>
            </motion.div>

            {/* Bold Crisp Client-Focused Headline */}
            <motion.h1 
              className="hero-headline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We build smart software for{' '}
              <span className="hero-kinetic-holder">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIdx}
                    className="hero-kinetic-text text-gradient-n8n"
                    initial={{ y: 22, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -22, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {KINETIC_WORDS[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            {/* Subheadline / Value Proposition */}
            <motion.p 
              className="hero-tagline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              TensorLoom AI creates custom web applications, online stores, and smart automated systems that save you time, delight your customers, and grow your revenue.
            </motion.p>

            {/* Action CTA Buttons */}
            <motion.div 
              className="hero-cta-group"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a href="#projects" className="tl-btn tl-btn-primary hero-btn-coral-glow">
                <span>See Our Live Work</span>
                <ArrowRight size={16} />
              </a>

              <button 
                type="button" 
                onClick={onOpenDiscoveryModal} 
                className="tl-btn tl-btn-secondary hero-btn-ice-glass"
                title="Schedule a 30-min discovery session on Calendly"
              >
                <Calendar size={15} color="var(--coral)" />
                <span>Book 30-Min Call</span>
              </button>
            </motion.div>

            {/* Trust Badges Strip (Frosted Glass Chips) */}
            <motion.div 
              className="hero-stats-strip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="hero-stat-pill">
                <span className="pulse-dot dot-emerald" />
                <span className="hero-stat-val">&lt; 1.2s</span>
                <span className="hero-stat-desc">Fast Loading</span>
              </div>
              <div className="hero-stat-pill">
                <Zap size={13} color="#a78bfa" />
                <span className="hero-stat-val">24/7</span>
                <span className="hero-stat-desc">Smart Automation</span>
              </div>
              <div className="hero-stat-pill">
                <Shield size={13} color="var(--coral)" />
                <span className="hero-stat-val">100%</span>
                <span className="hero-stat-desc">Reliable & Secure</span>
              </div>
            </motion.div>
          </motion.div>

          {/* =========================================================
              3. RIGHT SIDE: Hero Interactive Lottie Animation
              ========================================================= */}
          <motion.div 
            className="hero-right-focal"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <HeroLottieVisual />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
