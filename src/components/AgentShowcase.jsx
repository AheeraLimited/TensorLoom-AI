import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Play, ShieldAlert, Cpu, CheckCircle2, ArrowRight, CornerDownRight, Terminal } from 'lucide-react'
import Reveal from './Reveal.jsx'
import './AgentShowcase.css'

const STAGES = [
  { id: 1, name: 'Signal Ingest', desc: 'Webhook, DB event, or message intake', icon: '01' },
  { id: 2, name: 'Context Extraction', desc: 'RAG retrieval & policy grounding', icon: '02' },
  { id: 3, name: 'Neural Decision', desc: 'Deterministic multi-step reasoning', icon: '03' },
  { id: 4, name: 'Tool Execution', desc: 'Sandboxed API & database write', icon: '04' },
  { id: 5, name: 'Human Checkpoint', desc: 'Audit verified & logged to telemetry', icon: '05' },
]

export default function AgentShowcase() {
  const [activeStage, setActiveStage] = useState(2)
  const [isFiring, setIsFiring] = useState(false)

  const triggerSimulation = () => {
    if (isFiring) return
    setIsFiring(true)
    let current = 0
    setActiveStage(0)
    
    const interval = setInterval(() => {
      current += 1
      if (current < STAGES.length) {
        setActiveStage(current)
      } else {
        clearInterval(interval)
        setIsFiring(false)
      }
    }, 600)
  }

  return (
    <section className="tl-section spotlight-section">
      <div className="tl-shell">
        <div className="spotlight-header">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>AGENT RUNTIME TOPOLOGY //</span>
          </div>
          <h2 className="spotlight-title">
            One job. <span className="text-gradient-n8n">Done deterministically.</span>
          </h2>
          <p className="spotlight-subtitle">
            We don't build frivolous chatbots. Every TensorLoom AI agent is locked to a single, high-stakes operational workflow,
            governed by mathematically verifiable guardrails and human review checkpoints.
          </p>
        </div>

        {/* Interactive Visual Pipeline Sandbox */}
        <div className="spotlight-sandbox tl-glass">
          <div className="sandbox-top-controls">
            <div className="sandbox-title">
              <Terminal size={14} color="var(--coral)" />
              <span>agent_deterministic_flow.sim</span>
            </div>

            <button 
              className={`dispatch-signal-btn ${isFiring ? 'firing' : ''}`}
              onClick={triggerSimulation}
              disabled={isFiring}
            >
              <Play size={13} fill="currentColor" />
              <span>{isFiring ? 'EXECUTING PIPELINE...' : 'DISPATCH TEST SIGNAL'}</span>
            </button>
          </div>

          {/* 5-Stage Visual Node Path */}
          <div className="sandbox-flow-rail">
            {STAGES.map((st, i) => {
              const isActive = i === activeStage
              const isPast = i < activeStage
              return (
                <div 
                  key={st.id} 
                  className={`stage-pill-box ${isActive ? 'active' : ''} ${isPast ? 'completed' : ''}`}
                  onClick={() => !isFiring && setActiveStage(i)}
                >
                  <div className="stage-top-meta">
                    <span className="stage-num-badge">{st.icon}</span>
                    {isPast && <CheckCircle2 size={13} color="var(--emerald)" />}
                  </div>
                  <h4 className="stage-name">{st.name}</h4>
                  <p className="stage-desc">{st.desc}</p>
                </div>
              )
            })}
          </div>

          {/* Live Dynamic Execution Terminal */}
          <div className="sandbox-log-terminal">
            <div className="log-terminal-header">
              <span className="pulse-dot dot-coral" />
              <span>EXECUTION TELEMETRY // STAGE 0{activeStage + 1}: {STAGES[activeStage].name.toUpperCase()}</span>
              <span className="log-latency">Δt: 12.4ms</span>
            </div>
            <div className="log-content">
              <p className="log-line text-cyan">
                [AGENT_CORE] Handshake validated. Payload hash: <code>0x8f29c01a4e...</code>
              </p>
              <p className="log-line">
                [POLICY_CHECK] Verifying deterministic schema against compliance standard... <span className="text-emerald">PASSED (0.998)</span>
              </p>
              <p className="log-line text-coral-highlight">
                [TOOL_INVOKE] Target endpoint locked: <code>POST /v1/orchestrator/dispatch</code>
              </p>
              <p className="log-line text-dim">
                [AUDIT] Immutable event logged to distributed telemetry ledger. Human intervention not requested.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
