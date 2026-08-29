import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, Play, CheckCircle2, Cpu, Zap, Activity, 
  Shield, Terminal, RefreshCw, Layers, Sparkles, Workflow, ArrowRightCircle, Bot
} from 'lucide-react'
import LoomMark from './LoomMark.jsx'
import './Hero.css'

const KINETIC_WORDS = [
  'Autonomous Ops',
  'Clinical Workflows',
  'Global Logistics',
  'Realtime Fintech'
]

const PIPELINE_STEPS = [
  {
    id: 'trigger',
    stage: 'NODE 01 / TRIGGER',
    nodeType: 'Webhook Intake',
    title: 'Event Signal Ingested',
    meta: 'Unstructured referral parsed • 14ms latency',
    code: '{ "event": "referral_received", "priority": "high", "routing": "auto" }',
    badge: 'Webhook Trigger',
    color: '#0284c7',
    iconComponent: Zap
  },
  {
    id: 'reason',
    stage: 'NODE 02 / AI AGENT',
    nodeType: 'Neural Reasoner',
    title: 'Multi-Agent Policy Match',
    meta: 'Vector embeddings verified against 140k guidelines',
    code: 'confidence: 0.994 // zero-hallucination guardrail active',
    badge: 'Neural Reasoner',
    color: '#ff6d42',
    iconComponent: Bot
  },
  {
    id: 'action',
    stage: 'NODE 03 / ACTION',
    nodeType: 'Governed Dispatch',
    title: 'Executed with Full Audit Trail',
    meta: 'API write committed • Human checkpoint cleared',
    code: 'HTTP 200 OK • Dispatched to Epic EHR & Slack channel',
    badge: 'API Dispatch',
    color: '#10b981',
    iconComponent: CheckCircle2
  }
]

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [activeStep, setActiveStep] = useState(0)
  const [isSimulating, setIsSimulating] = useState(true)

  // Cycle kinetic words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % KINETIC_WORDS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  // Auto-cycle simulation steps
  useEffect(() => {
    if (!isSimulating) return
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % PIPELINE_STEPS.length)
    }, 3200)
    return () => clearInterval(timer)
  }, [isSimulating])

  return (
    <section id="top" className="hero-section">
      <div className="hero-ambient-glow hero-glow-coral" />
      <div className="hero-ambient-glow hero-glow-purple" />

      <div className="tl-shell hero-container">
        {/* Left Column: Value Proposition */}
        <div className="hero-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-badge-wrap"
          >
            <div className="eyebrow">
              <span className="pulse-dot dot-coral" />
              <span>AI WORKFLOW AUTOMATION // TENSORLOOM AI</span>
            </div>
          </motion.div>

          <motion.h1 
            className="hero-headline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Weave intelligence into <br />
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

          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            TensorLoom AI builds autonomous agents, visual node pipelines, and enterprise infrastructure to connect any model to any tool.
          </motion.p>

          <motion.div 
            className="hero-cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="#demo" className="tl-btn tl-btn-primary">
              <span>Try Interactive Workflow</span>
              <ArrowRight size={16} />
            </a>
            <a href="#capabilities" className="tl-btn tl-btn-ghost">
              <span>Explore Node Ecosystem</span>
            </a>
          </motion.div>

          {/* Telemetry Stat Strip */}
          <motion.div 
            className="hero-stats-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="hero-stat-pill">
              <span className="pulse-dot dot-emerald" />
              <span className="hero-stat-val">14ms</span>
              <span className="hero-stat-desc">Latency</span>
            </div>
            <div className="hero-stat-pill">
              <Shield size={13} color="var(--coral)" />
              <span className="hero-stat-val">100%</span>
              <span className="hero-stat-desc">Guardrails</span>
            </div>
            <div className="hero-stat-pill">
              <Zap size={13} color="#7c3aed" />
              <span className="hero-stat-val">99.98%</span>
              <span className="hero-stat-desc">Deterministic</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: n8n-Style Interactive Workflow Studio */}
        <motion.div 
          className="hero-right"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <div className="hero-cockpit tl-glass">
            {/* Top Workflow Canvas Bar */}
            <div className="cockpit-bar">
              <div className="cockpit-dots">
                <span className="c-dot red" />
                <span className="c-dot yellow" />
                <span className="c-dot green" />
              </div>
              <div className="cockpit-title">
                <Workflow size={13} color="var(--coral)" />
                <span>tensorloom_ai_workflow.canvas</span>
              </div>
              <button 
                className="cockpit-sim-toggle"
                onClick={() => setIsSimulating((prev) => !prev)}
                title={isSimulating ? 'Pause Live Stream' : 'Play Live Stream'}
              >
                <RefreshCw size={12} className={isSimulating ? 'spin-slow' : ''} />
                <span>{isSimulating ? 'STREAMING' : 'PAUSED'}</span>
              </button>
            </div>

            {/* n8n-Style Workflow Node Graph View */}
            <div className="hero-workflow-canvas">
              <div className="workflow-nodes-row">
                {PIPELINE_STEPS.map((step, idx) => {
                  const isActive = idx === activeStep
                  const isDone = idx < activeStep
                  const IconComp = step.iconComponent
                  return (
                    <div 
                      key={step.id}
                      className={`workflow-node-card ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                      onClick={() => {
                        setActiveStep(idx)
                        setIsSimulating(false)
                      }}
                    >
                      <div className="node-handle-in" />
                      <div className="node-icon-header">
                        <div className="node-icon-pill" style={{ background: `${step.color}15`, color: step.color }}>
                          <IconComp size={13} />
                        </div>
                        <span className="node-type-label">{step.nodeType}</span>
                        {isActive && <span className="pulse-dot dot-coral" />}
                      </div>
                      <h4 className="node-name">{step.badge}</h4>
                      <div className="node-handle-out" />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Live Terminal & Node Visualizer */}
            <div className="cockpit-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="cockpit-content"
                >
                  <div className="cockpit-header-row">
                    <span className="cockpit-stage-eyebrow" style={{ color: PIPELINE_STEPS[activeStep].color }}>
                      {PIPELINE_STEPS[activeStep].stage}
                    </span>
                    <span className="cockpit-status-tag">
                      <span className="pulse-dot dot-emerald" />
                      NODE EXECUTED
                    </span>
                  </div>

                  <h3 className="cockpit-step-title">{PIPELINE_STEPS[activeStep].title}</h3>
                  <p className="cockpit-step-meta">{PIPELINE_STEPS[activeStep].meta}</p>

                  <div className="cockpit-code-block">
                    <div className="code-block-header">
                      <span className="code-tab">node_output.json</span>
                      <span className="code-status">SECURE VERIFIED</span>
                    </div>
                    <code>{PIPELINE_STEPS[activeStep].code}</code>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Telemetry Footer */}
            <div className="cockpit-footer">
              <div className="cockpit-telemetry-item">
                <span className="telemetry-label">Active Node Threads</span>
                <span className="telemetry-value">1,420 / sec</span>
              </div>
              <div className="cockpit-telemetry-item">
                <span className="telemetry-label">Guardrail Status</span>
                <span className="telemetry-value text-emerald">
                  <CheckCircle2 size={13} style={{ display: 'inline', marginRight: 4 }} />
                  Passed (0.994)
                </span>
              </div>
              <div className="cockpit-telemetry-item">
                <span className="telemetry-label">Cluster Health</span>
                <span className="telemetry-value">99.99%</span>
              </div>
            </div>
          </div>

          {/* Symmetrical Satellite Telemetry Badges */}
          <div className="hero-satellite-bar">
            <motion.div 
              className="hero-satellite-pill tl-glass"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="fp-icon"><Cpu size={15} color="var(--coral)" /></div>
              <div className="fp-copy">
                <strong>Autonomous Multi-Agent</strong>
                <span>Sub-second resolution</span>
              </div>
            </motion.div>

            <motion.div 
              className="hero-satellite-pill tl-glass"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="fp-icon"><Activity size={15} color="#7c3aed" /></div>
              <div className="fp-copy">
                <strong>3.8x Operational Velocity</strong>
                <span>Zero friction deployment</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
