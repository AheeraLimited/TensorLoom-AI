import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, Layout, Server, Database, Smartphone, ShieldCheck, 
  Terminal, Sparkles, Check, ArrowUpRight, Cpu, Radio, Zap, Workflow
} from 'lucide-react'
import Reveal from './Reveal.jsx'
import './Services.css'

export default function Services() {
  // Mini interactive state for Terminal card
  const [typedIndex, setTypedIndex] = useState(0)
  const tokenSnippets = [
    'agent.perceive(context)',
    'agent.eval_guardrails({ strict: true })',
    'agent.dispatch_tool("postgres_write")',
    'status: 200 OK • latency 14ms'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedIndex((prev) => (prev + 1) % tokenSnippets.length)
    }, 2400)
    return () => clearInterval(timer)
  }, [tokenSnippets.length])

  // Mini interactive toggle for Fullstack card
  const [toggleState, setToggleState] = useState(true)

  // Mini interactive slider for Governance card
  const [threshold, setThreshold] = useState(98)

  return (
    <section id="capabilities" className="tl-section services-section">
      <div className="tl-shell">
        <div className="services-header">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>FULLSTACK ENGINEERING & AI ARCHITECTURE //</span>
          </div>
          <h2 className="services-title">
            Warp holds the structure. <br />
            <span className="text-gradient-n8n">Weft weaves the intelligence.</span>
          </h2>
          <p className="services-subtitle">
            We don't ship standalone bots into a void. We build both layers: the resilient enterprise platforms
            that anchor your business, and the intelligent node pipelines that run through them.
          </p>
        </div>

        {/* World-Class Visual Bento Grid */}
        <div className="bento-grid">
          {/* Card 1: Autonomous AI Agents (Span 2) */}
          <div className="bento-card bento-span-2 tl-glass">
            <div className="bento-card-header">
              <div className="bento-icon-title">
                <span className="bento-badge-icon" style={{ background: 'rgba(255, 109, 66, 0.08)' }}>
                  <Bot size={18} color="var(--coral)" />
                </span>
                <div>
                  <h3>Autonomous AI Agents</h3>
                  <p className="bento-sub">Scoped to mission-critical jobs with audit trails</p>
                </div>
              </div>
              <span className="bento-tag">AI // NODE ENGINE</span>
            </div>

            {/* Interactive Terminal Widget */}
            <div className="bento-terminal-widget">
              <div className="terminal-bar">
                <span className="t-dot red" />
                <span className="t-dot yellow" />
                <span className="t-dot green" />
                <span className="t-title">agent_executor.ts</span>
              </div>
              <div className="terminal-stream">
                <span className="prompt-sign">$</span>
                <span className="terminal-typing">{tokenSnippets[typedIndex]}</span>
                <span className="typing-cursor" />
              </div>
              <div className="terminal-pills-row">
                <span className="t-pill"><Check size={11} color="var(--emerald)" /> Tool Binding Active</span>
                <span className="t-pill"><Zap size={11} color="var(--coral)" /> Sub-second Eval</span>
                <span className="t-pill"><ShieldCheck size={11} color="#0284c7" /> Hallucination-free</span>
              </div>
            </div>
          </div>

          {/* Card 2: Fullstack Enterprise Platforms */}
          <div className="bento-card tl-glass">
            <div className="bento-card-header">
              <div className="bento-icon-title">
                <span className="bento-badge-icon" style={{ background: 'rgba(2, 132, 199, 0.08)' }}>
                  <Layout size={18} color="#0284c7" />
                </span>
                <div>
                  <h3>Fullstack Platforms</h3>
                  <p className="bento-sub">High-velocity web apps & control panels</p>
                </div>
              </div>
              <span className="bento-tag">PLATFORM</span>
            </div>

            {/* Mini Interactive UI Mockup */}
            <div className="bento-ui-mockup">
              <div className="mockup-row">
                <span className="mockup-label">Realtime Streaming</span>
                <button 
                  className={`mockup-toggle ${toggleState ? 'on' : 'off'}`}
                  onClick={() => setToggleState(!toggleState)}
                  aria-label="Toggle streaming"
                >
                  <span className="toggle-thumb" />
                </button>
              </div>
              <div className="mockup-bars">
                <div className="m-bar" style={{ height: '45%' }} />
                <div className="m-bar" style={{ height: '70%' }} />
                <div className="m-bar" style={{ height: '100%', background: 'var(--coral)' }} />
                <div className="m-bar" style={{ height: '60%' }} />
                <div className="m-bar" style={{ height: '85%' }} />
              </div>
              <span className="mockup-caption">Sub-50ms React + Node data layer</span>
            </div>
          </div>

          {/* Card 3: Cloud & DevOps Infrastructure */}
          <div className="bento-card tl-glass">
            <div className="bento-card-header">
              <div className="bento-icon-title">
                <span className="bento-badge-icon" style={{ background: 'rgba(16, 185, 129, 0.08)' }}>
                  <Server size={18} color="var(--emerald)" />
                </span>
                <div>
                  <h3>Cloud & IT Infra</h3>
                  <p className="bento-sub">High availability & automated CI/CD</p>
                </div>
              </div>
              <span className="bento-tag">CLOUD</span>
            </div>

            {/* Visual Node Cluster Ping */}
            <div className="bento-infra-widget">
              <div className="infra-node-row">
                <span className="infra-region">US-EAST (N. Virginia)</span>
                <span className="infra-status"><span className="pulse-dot dot-emerald" /> 11ms</span>
              </div>
              <div className="infra-node-row">
                <span className="infra-region">EU-CENTRAL (Frankfurt)</span>
                <span className="infra-status"><span className="pulse-dot dot-emerald" /> 18ms</span>
              </div>
              <div className="infra-node-row">
                <span className="infra-region">AP-SOUTH (Tokyo)</span>
                <span className="infra-status"><span className="pulse-dot dot-emerald" /> 24ms</span>
              </div>
              <div className="infra-uptime-badge">
                <strong>99.99%</strong> SLA Uptime Guaranteed
              </div>
            </div>
          </div>

          {/* Card 4: Realtime Data & Vector Pipelines */}
          <div className="bento-card tl-glass">
            <div className="bento-card-header">
              <div className="bento-icon-title">
                <span className="bento-badge-icon" style={{ background: 'rgba(124, 58, 237, 0.08)' }}>
                  <Database size={18} color="#7c3aed" />
                </span>
                <div>
                  <h3>Data & Vectors</h3>
                  <p className="bento-sub">ETL, embeddings & clean telemetry</p>
                </div>
              </div>
              <span className="bento-tag">PIPELINE</span>
            </div>

            {/* Visual Flow diagram */}
            <div className="bento-data-widget">
              <div className="flow-step">
                <span className="flow-badge">Ingest</span>
                <span className="flow-arrow">→</span>
                <span className="flow-badge">Embed</span>
                <span className="flow-arrow">→</span>
                <span className="flow-badge highlight">Index</span>
              </div>
              <div className="data-meta-line">
                <span>Vector Dimension: 1536</span>
                <span>Latency: &lt;5ms</span>
              </div>
            </div>
          </div>

          {/* Card 5: Native Android Applications (Edge AI) */}
          <div className="bento-card tl-glass">
            <div className="bento-card-header">
              <div className="bento-icon-title">
                <span className="bento-badge-icon" style={{ background: 'rgba(245, 158, 11, 0.08)' }}>
                  <Smartphone size={18} color="#f59e0b" />
                </span>
                <div>
                  <h3>Native Android</h3>
                  <p className="bento-sub">Kotlin & on-device edge intelligence</p>
                </div>
              </div>
              <span className="bento-tag">EDGE</span>
            </div>

            {/* Visual Phone Silhouette */}
            <div className="bento-phone-widget">
              <div className="mini-phone-screen">
                <div className="phone-notch" />
                <div className="phone-app-content">
                  <div className="phone-card-skeleton" />
                  <div className="phone-action-btn">
                    <span>On-Device Inference</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6: Human-in-the-Loop Governance */}
          <div className="bento-card tl-glass">
            <div className="bento-card-header">
              <div className="bento-icon-title">
                <span className="bento-badge-icon" style={{ background: 'rgba(16, 185, 129, 0.08)' }}>
                  <ShieldCheck size={18} color="var(--emerald)" />
                </span>
                <div>
                  <h3>Governance & HITL</h3>
                  <p className="bento-sub">Strict checkpoints & safety guardrails</p>
                </div>
              </div>
              <span className="bento-tag">GOVERNANCE</span>
            </div>

            {/* Interactive Threshold Slider */}
            <div className="bento-gov-widget">
              <div className="gov-slider-header">
                <span>Certainty Threshold</span>
                <span className="gov-val">{threshold}%</span>
              </div>
              <input 
                type="range" 
                min="90" 
                max="100" 
                value={threshold} 
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="gov-range-slider"
                aria-label="Certainty threshold slider"
              />
              <p className="gov-note">Any prediction below {threshold}% automatically pauses for human review.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
