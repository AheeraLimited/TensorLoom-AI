import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, Pause, ArrowRight, CheckCircle, ShieldCheck, 
  Sparkles, Activity, FileText, Bot, Cpu, Layers, AlertCircle
} from 'lucide-react'
import Reveal from './Reveal.jsx'
import { INDUSTRIES } from '../data/industries.js'
import './IndustryDemo.css'

const STEP_DURATION = 4200 // ms per auto-advancing step

const STAGE_ICONS = [
  <AlertCircle size={18} strokeWidth={2.2} />,
  <Bot size={18} strokeWidth={2.2} />,
  <Cpu size={18} strokeWidth={2.2} />,
  <ShieldCheck size={18} strokeWidth={2.2} />
]

function VisualPayloadCard({ card, stage }) {
  if (card.kind === 'incoming') {
    return (
      <div className="v-card v-card-incoming">
        <div className="v-card-top-bar">
          <span className="v-badge">{card.badge}</span>
          <span className="v-latency">t = 0.00s</span>
        </div>
        <h4 className="v-card-title">{card.title}</h4>
        <p className="v-card-meta">{card.meta}</p>
        <div className="v-card-pulse-line" />
      </div>
    )
  }
  if (card.kind === 'checks') {
    return (
      <div className="v-card v-card-checks">
        <div className="v-card-top-bar">
          <span className="v-badge badge-reason">NEURAL REASONING</span>
          <span className="v-latency">confidence: 99.4%</span>
        </div>
        <div className="v-checks-list">
          {card.items.map((it, i) => (
            <motion.div 
              className="v-check-item" 
              key={it}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="v-check-icon"><CheckCircle size={14} color="#34d399" /></span>
              <span>{it}</span>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }
  if (card.kind === 'action') {
    return (
      <div className="v-card v-card-action">
        <div className="v-card-top-bar">
          <span className="v-badge badge-action">TOOL EXECUTION</span>
          <span className="v-latency">API 200 OK</span>
        </div>
        <h4 className="v-card-title">{card.title}</h4>
        <p className="v-card-meta">{card.meta}</p>
        <div className="v-action-meter">
          <div className="v-action-meter-fill" />
        </div>
      </div>
    )
  }
  return (
    <div className="v-card v-card-result">
      <div className="v-card-top-bar">
        <span className="v-badge badge-success">GOVERNED CHECKPOINT</span>
        <span className="v-latency">AUDIT READY</span>
      </div>
      <h4 className="v-card-title">{card.title}</h4>
      <p className="v-card-meta">{card.meta}</p>
      <div className="v-verified-stamp">
        <ShieldCheck size={16} color="var(--coral)" />
        <span>Human-in-the-Loop Safe</span>
      </div>
    </div>
  )
}

export default function IndustryDemo() {
  const [industryIdx, setIndustryIdx] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  const industry = INDUSTRIES[industryIdx]
  const step = industry.steps[stepIdx]

  function goToStep(i) {
    setStepIdx(i)
    setProgress(0)
    startRef.current = null
  }

  function selectIndustry(i) {
    setIndustryIdx(i)
    setStepIdx(0)
    setProgress(0)
    startRef.current = null
  }

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }
    function tick(ts) {
      if (startRef.current === null) startRef.current = ts
      const elapsed = ts - startRef.current
      const pct = Math.min(100, (elapsed / STEP_DURATION) * 100)
      setProgress(pct)
      if (pct >= 100) {
        startRef.current = null
        setStepIdx((prev) => (prev + 1) % industry.steps.length)
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [playing, stepIdx, industryIdx, industry.steps.length])

  return (
    <section id="demo" className="tl-section demo-section">
      <div className="demo-bg-glow tl-glow" />

      <div className="tl-shell">
        <div className="demo-header-center">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>INTERACTIVE DEMO</span>
          </div>
          <h2 className="demo-main-title">
            See how our smart automations <br />
            <span className="text-gradient-gold">work in real time.</span>
          </h2>
          <p className="demo-main-sub">
            Click any industry below to watch how incoming customer inquiries, orders, and bookings are automatically verified, processed, and confirmed without manual effort.
          </p>
        </div>

        {/* Industry Sector Pills */}
        <div className="demo-sector-pills">
          {INDUSTRIES.map((ind, i) => (
            <button
              key={ind.id}
              className={`demo-sector-btn ${i === industryIdx ? 'active' : ''}`}
              onClick={() => selectIndustry(i)}
            >
              <span>{ind.label}</span>
              {i === industryIdx && (
                <motion.div 
                  layoutId="sectorActivePill" 
                  className="sector-active-glow" 
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Visual Architecture Command Center Box */}
        <div className="demo-command-cockpit tl-glass">
          {/* Top Control Bar */}
          <div className="command-bar">
            <div className="command-info">
              <span className="pulse-dot dot-emerald" />
              <span className="command-scenario-tag">{industry.scenario}</span>
              <span className="command-queue-name">[{industry.queueLabel}]</span>
            </div>

            <div className="command-playback">
              <button
                className="playback-btn"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause Simulation' : 'Resume Simulation'}
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
                <span>{playing ? 'PAUSE' : 'PLAY'}</span>
              </button>
            </div>
          </div>

          {/* Visual Topology Pipeline */}
          <div className="command-topology">
            <div className="topology-track">
              {industry.steps.map((s, i) => {
                const isComplete = i < stepIdx
                const isActive = i === stepIdx
                return (
                  <div key={s.stage} className="topology-step-wrapper">
                    {i > 0 && (
                      <div className="topology-segment-rail" aria-hidden="true">
                        <div 
                          className="topology-segment-fill" 
                          style={{ 
                            width: i <= stepIdx ? '100%' : '0%' 
                          }} 
                        />
                      </div>
                    )}

                    <div 
                      className={`topology-node ${isActive ? 'node-active' : ''} ${isComplete ? 'node-complete' : ''}`}
                      onClick={() => { goToStep(i); setPlaying(false) }}
                    >
                      <div className="node-circle-wrap">
                        <div className="node-circle">
                          <span className="node-icon">{STAGE_ICONS[i]}</span>
                        </div>
                        {isActive && (
                          <span className="node-ring-pulse" />
                        )}
                      </div>
                      <div className="node-label-wrap">
                        <span className="node-index">STAGE 0{i + 1}</span>
                        <span className="node-title">{s.stage}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Interactive Screen Display */}
          <div className="command-display-split">
            {/* Left: Active Live Payload Card */}
            <div className="display-card-side">
              <div className="screen-tag">
                <Activity size={12} color="var(--coral)" />
                <span>LIVE TELEMETRY PAYLOAD</span>
              </div>
              <div className="telemetry-card-frame">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={`${industryIdx}-${stepIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <VisualPayloadCard card={step.card} stage={step.stage} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: Agent Reasoning & Deep Context */}
            <div className="display-detail-side">
              <div className="detail-header">
                <span className="detail-stage-pill">{step.stage} Logic</span>
                <span className="detail-progress-num">
                  {Math.round(progress)}% Step Cycle
                </span>
              </div>
              <h3 className="detail-title">{step.title}</h3>
              <p className="detail-copy">{step.detail}</p>

              {/* Before vs After Impact Meters */}
              <div className="detail-impact-box">
                <div className="impact-header">
                  <span>BEFORE TENSORLOOM AI</span>
                  <span className="impact-stat-bad">Manual Lag</span>
                </div>
                <div className="impact-track">
                  <div className="impact-fill fill-before" />
                </div>
                <p className="impact-text">{industry.impact.before}</p>

                <div className="impact-header" style={{ marginTop: 12 }}>
                  <span className="text-gradient-n8n">WITH TENSORLOOM AI AGENT</span>
                  <span className="impact-stat-good">Autonomous</span>
                </div>
                <div className="impact-track">
                  <div className="impact-fill fill-after" />
                </div>
                <p className="impact-text good">{industry.impact.after}</p>
              </div>

              {/* Key Benefit Badges */}
              <div className="detail-chips">
                {industry.impact.chips.map((c) => (
                  <span key={c} className="benefit-chip">
                    <CheckCircle size={11} color="var(--coral)" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
