import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, Shield, Zap, CheckCircle2, Sparkles, Cpu, Activity, Star
} from 'lucide-react'
import './Hero.css'

const KINETIC_WORDS = [
  'Online Stores',
  'Smart Delivery',
  'Fleet Logistics',
  'Business Automation'
]

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)

  // Cycle kinetic words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % KINETIC_WORDS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="top" className="hero-section hero-centered-layout">
      {/* Background Watermark and Ambient Meshes */}
      <div className="hero-watermark-bg" aria-hidden="true">TENSORLOOM</div>
      <div className="hero-ambient-glow hero-glow-coral" />
      <div className="hero-ambient-glow hero-glow-purple" />

      <div className="tl-shell hero-shell-centered">
        <div className="hero-content-center">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-wrap"
          >
            <div className="eyebrow">
              <span className="pulse-dot dot-coral" />
              <span>CUSTOM WEB APPS & AI AUTOMATION</span>
            </div>
          </motion.div>

          {/* Main Kinetic Headline */}
          <motion.h1 
            className="hero-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We build smart software for <br />
            <span className="hero-kinetic-holder">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  className="hero-kinetic-text text-gradient-n8n"
                  initial={{ y: 24, opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -24, opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {KINETIC_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subtitle / Value Proposition */}
          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            TensorLoom AI creates custom web applications, online stores, and smart automated systems that save you time, delight your customers, and grow your revenue.
          </motion.p>

          {/* CTA Action Buttons */}
          <motion.div 
            className="hero-cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="#projects" className="tl-btn tl-btn-primary">
              <span>See Our Live Work</span>
              <ArrowRight size={16} />
            </a>
            <a href="#capabilities" className="tl-btn tl-btn-ghost">
              <span>What We Build</span>
            </a>
          </motion.div>

          {/* Trust Metric Badges Strip */}
          <motion.div 
            className="hero-stats-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-stat-pill">
              <span className="pulse-dot dot-emerald" />
              <span className="hero-stat-val">&lt; 1.2s</span>
              <span className="hero-stat-desc">Fast Loading</span>
            </div>
            <div className="hero-stat-pill">
              <Shield size={13} color="var(--coral)" />
              <span className="hero-stat-val">100%</span>
              <span className="hero-stat-desc">Reliable & Secure</span>
            </div>
            <div className="hero-stat-pill">
              <Zap size={13} color="#a78bfa" />
              <span className="hero-stat-val">24/7</span>
              <span className="hero-stat-desc">Smart Automation</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
