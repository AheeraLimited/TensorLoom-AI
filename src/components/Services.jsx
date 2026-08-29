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
            <span>WHAT WE BUILD & DELIVER</span>
          </div>
          <h2 className="services-title">
            Everything you need to run & grow <br />
            <span className="text-gradient-n8n">your business digitally.</span>
          </h2>
          <p className="services-subtitle">
            We build modern web applications, mobile apps, and automated workflows that save you time, serve customers faster, and increase your revenue.
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
                  <h3>Smart AI & Automation</h3>
                  <p className="bento-sub">Automate customer inquiries, order handling & status updates</p>
                </div>
              </div>
              <span className="bento-tag">AUTOMATION</span>
            </div>

            {/* Interactive Terminal Widget */}
            <div className="bento-terminal-widget">
              <div className="terminal-bar">
                <span className="t-dot red" />
                <span className="t-dot yellow" />
                <span className="t-dot green" />
                <span className="t-title">automation_bot.js</span>
              </div>
              <div className="terminal-stream">
                <span className="prompt-sign">$</span>
                <span className="terminal-typing">{tokenSnippets[typedIndex]}</span>
                <span className="typing-cursor" />
              </div>
              <div className="terminal-pills-row">
                <span className="t-pill"><Check size={11} color="var(--emerald)" /> Auto-Reply Active</span>
                <span className="t-pill"><Zap size={11} color="var(--coral)" /> Instant Fast Response</span>
                <span className="t-pill"><ShieldCheck size={11} color="#0284c7" /> 100% Accurate</span>
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
                  <h3>Custom Web Platforms</h3>
                  <p className="bento-sub">Fast, beautiful websites & easy admin dashboards</p>
                </div>
              </div>
              <span className="bento-tag">WEBSITES</span>
            </div>

            {/* Mini Interactive UI Mockup */}
            <div className="bento-ui-mockup">
              <div className="mockup-row">
                <span className="mockup-label">Live Data Sync</span>
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
              <span className="mockup-caption">Loads in under 1 second on all devices</span>
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
                  <h3>Fast & Secure Hosting</h3>
                  <p className="bento-sub">Always online with 99.99% guaranteed uptime</p>
                </div>
              </div>
              <span className="bento-tag">HOSTING</span>
            </div>

            {/* Visual Node Cluster Ping */}
            <div className="bento-infra-widget">
              <div className="infra-node-row">
                <span className="infra-region">Fast Global CDN Servers</span>
                <span className="infra-status"><span className="pulse-dot dot-emerald" /> 11ms</span>
              </div>
              <div className="infra-node-row">
                <span className="infra-region">SSL Encryption & Security</span>
                <span className="infra-status"><span className="pulse-dot dot-emerald" /> Active</span>
              </div>
              <div className="infra-node-row">
                <span className="infra-region">Automatic Daily Backups</span>
                <span className="infra-status"><span className="pulse-dot dot-emerald" /> Secured</span>
              </div>
              <div className="infra-uptime-badge">
                <strong>99.99%</strong> Reliable Uptime Guaranteed
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
                  <h3>Live Data & Syncing</h3>
                  <p className="bento-sub">Instant inventory, orders & payment records</p>
                </div>
              </div>
              <span className="bento-tag">DATABASE</span>
            </div>

            {/* Visual Flow diagram */}
            <div className="bento-data-widget">
              <div className="flow-step">
                <span className="flow-badge">Customer Order</span>
                <span className="flow-arrow">→</span>
                <span className="flow-badge">Auto Verify</span>
                <span className="flow-arrow">→</span>
                <span className="flow-badge highlight">Dispatch</span>
              </div>
              <div className="data-meta-line">
                <span>Instant Cloud Sync</span>
                <span>Zero Data Loss</span>
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
                  <h3>Mobile Applications</h3>
                  <p className="bento-sub">Clean Android & iOS apps for customers and team</p>
                </div>
              </div>
              <span className="bento-tag">MOBILE APPS</span>
            </div>

            {/* Visual Phone Silhouette */}
            <div className="bento-phone-widget">
              <div className="mini-phone-screen">
                <div className="phone-notch" />
                <div className="phone-app-content">
                  <div className="phone-card-skeleton" />
                  <div className="phone-action-btn">
                    <span>One-Click Action</span>
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
                  <h3>Safety & Human Control</h3>
                  <p className="bento-sub">Built-in safeguards so you always stay in control</p>
                </div>
              </div>
              <span className="bento-tag">SECURITY</span>
            </div>

            {/* Interactive Threshold Slider */}
            <div className="bento-gov-widget">
              <div className="gov-slider-header">
                <span>Confidence Check</span>
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
              <p className="gov-note">Any high-value action pauses for your team's direct approval.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
