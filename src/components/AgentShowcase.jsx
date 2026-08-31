import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Play, ShieldAlert, Cpu, CheckCircle2, Terminal, MessageSquare, Bot, Zap, Check } from 'lucide-react'
import Reveal from './Reveal.jsx'
import './AgentShowcase.css'

const STAGES = [
  { id: 1, name: 'Signal Ingest', desc: 'Webhook, DB event, or chat intake', icon: '01' },
  { id: 2, name: 'Context Extraction', desc: 'RAG retrieval & policy grounding', icon: '02' },
  { id: 3, name: 'Neural Decision', desc: 'Deterministic multi-step reasoning', icon: '03' },
  { id: 4, name: 'Tool Execution', desc: 'Sandboxed API & database write', icon: '04' },
  { id: 5, name: 'Human Checkpoint', desc: 'Audit verified & telemetry logged', icon: '05' },
]

const CHAT_EXCHANGES = [
  {
    sender: 'user',
    name: 'Customer (Alex)',
    text: 'Can you check my deployment status and apply the enterprise discount?',
    time: 'Just now'
  },
  {
    sender: 'bot',
    name: 'TensorLoom AI Agent',
    text: 'Instance #TL-9082 is healthy (99.99% uptime). 15% VIP enterprise tier applied and synced with billing ledger in 14ms.',
    time: '0.014s ago'
  }
]

export default function AgentShowcase() {
  const [activeStage, setActiveStage] = useState(2)
  const [isFiring, setIsFiring] = useState(false)
  const lottieContainerRef = useRef(null)
  const animInstanceRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    Promise.all([
      import('lottie-web'),
      import('../assets/chatbot-discuss.json')
    ]).then(([lottieModule, lottieData]) => {
      if (!isMounted || !lottieContainerRef.current) return
      const lottie = lottieModule.default || lottieModule
      lottieContainerRef.current.innerHTML = ''
      const anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: lottieData.default || lottieData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet'
        }
      })
      if (anim && typeof anim.setSubframe === 'function') {
        anim.setSubframe(true)
      }
      animInstanceRef.current = anim
    }).catch(err => {
      console.warn('Agent Lottie animation deferred load error:', err)
    })

    return () => {
      isMounted = false
      if (animInstanceRef.current) {
        animInstanceRef.current.destroy()
        animInstanceRef.current = null
      }
    }
  }, [])

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
    <section id="ai-agents" className="tl-section spotlight-section">
      <div className="tl-shell">
        <div className="spotlight-header">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>AUTONOMOUS AI AGENTS & SUPPORT RUNTIME //</span>
          </div>
          <h2 className="spotlight-title">
            Intelligent AI Chatbots. <br />
            <span className="text-gradient-n8n">Executed deterministically.</span>
          </h2>
          <p className="spotlight-subtitle">
            We build 24/7 autonomous AI assistants that resolve customer inquiries, trigger internal workflows, 
            and automate operations across web and mobile platforms with mathematically verifiable precision.
          </p>
        </div>

        {/* 2-Column Split: Interactive AI Chatbot Hub + Deterministic Pipeline */}
        <div className="agent-showcase-grid">
          {/* Left Column: Live AI Chatbot & Support Discussion Simulation */}
          <div className="chatbot-interactive-card tl-glass">
            <div className="chatbot-card-header">
              <div className="chatbot-header-badge">
                <span className="pulse-dot dot-emerald" />
                <span className="chatbot-status-text">AI SUPPORT AGENT ONLINE</span>
              </div>
              <div className="chatbot-latency-tag">
                <Zap size={11} color="var(--coral)" />
                <span>14ms Latency</span>
              </div>
            </div>

            {/* Lottie Interactive Animation Stage */}
            <div className="chatbot-lottie-stage">
              <div className="chatbot-lottie-halo" />
              <div 
                ref={lottieContainerRef} 
                className="chatbot-lottie-player"
              />
            </div>

            {/* Simulated Real-Time Conversational Stream */}
            <div className="chatbot-dialog-stream">
              {CHAT_EXCHANGES.map((msg, i) => (
                <motion.div 
                  key={i} 
                  className={`chat-bubble-row ${msg.sender === 'bot' ? 'bot-row' : 'user-row'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.15 }}
                >
                  <div className="chat-bubble-icon">
                    {msg.sender === 'bot' ? <Bot size={14} color="var(--coral)" /> : <MessageSquare size={14} color="#0284c7" />}
                  </div>
                  <div className="chat-bubble-content">
                    <div className="chat-bubble-meta">
                      <span className="chat-speaker">{msg.name}</span>
                      <span className="chat-timestamp">{msg.time}</span>
                    </div>
                    <p className="chat-bubble-text">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Meta Pills */}
            <div className="chatbot-pills-footer">
              <span className="chat-feature-pill">
                <Check size={11} color="var(--emerald)" /> Multi-Device Sync
              </span>
              <span className="chat-feature-pill">
                <Check size={11} color="var(--emerald)" /> Automatic DB Writes
              </span>
              <span className="chat-feature-pill">
                <Check size={11} color="var(--emerald)" /> 24/7 Omnichannel
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Visual Pipeline Sandbox */}
          <div className="spotlight-sandbox tl-glass">
            <div className="sandbox-top-controls">
              <div className="sandbox-title">
                <Terminal size={14} color="var(--coral)" />
                <span>agent_deterministic_flow.sim</span>
              </div>

              <button 
                type="button"
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
                  [CHATBOT_AGENT] Active connection verified. Payload hash: <code>0x8f29c01a4e...</code>
                </p>
                <p className="log-line">
                  [POLICY_CHECK] Verifying deterministic schema & guardrails... <span className="text-emerald">PASSED (0.998)</span>
                </p>
                <p className="log-line text-coral-highlight">
                  [TOOL_INVOKE] Target API endpoint dispatched: <code>POST /v1/support/sync</code>
                </p>
                <p className="log-line text-dim">
                  [AUDIT] Immutable event logged to distributed telemetry ledger. Human audit verified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
