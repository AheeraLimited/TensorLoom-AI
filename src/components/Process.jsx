import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, GitBranch, Terminal, ShieldCheck, Rocket, ArrowRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
import './Process.css'

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Thread Audit',
    phase: 'Days 1 — 3',
    icon: <GitBranch size={20} color="#0284c7" />,
    summary: 'We map raw data sources, internal APIs, and permission layers before writing a single line of code.',
    deliverables: ['Data Topology Map', 'Security Boundary Scope', 'Baseline Metrics']
  },
  {
    n: '02',
    title: 'Pattern Blueprint',
    phase: 'Week 1',
    icon: <Terminal size={20} color="var(--coral)" />,
    summary: 'We specify model choices, deterministic eval suites, and state machine transitions tailored to your timeline.',
    deliverables: ['Architecture Spec', 'Eval Benchmark Suite', 'API Contracts']
  },
  {
    n: '03',
    title: 'Sprint Weave',
    phase: 'Weeks 2 — 4',
    icon: <Sparkles size={20} color="#7c3aed" />,
    summary: 'We build in tight, visible 5-day sprints with live staging URLs so your team tests working software weekly.',
    deliverables: ['Live Staging Environments', 'Weekly Demos', 'Interactive Checkpoints']
  },
  {
    n: '04',
    title: 'Tension-Test & Deploy',
    phase: 'Production Launch',
    icon: <Rocket size={20} color="var(--emerald)" />,
    summary: 'We stress-test edge cases, harden guardrails under high concurrency, deploy, and monitor telemetry 24/7.',
    deliverables: ['Chaos & Load Testing', 'Zero-Downtime Rollout', 'Live Pager Telemetry']
  },
]

export default function Process() {
  const [selectedStep, setSelectedStep] = useState(0)

  return (
    <section id="process" className="tl-section process-section">
      <div className="tl-shell">
        <div className="process-header">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>DELIVERY METHODOLOGY //</span>
          </div>
          <h2 className="process-title">
            How we weave <span className="text-gradient-n8n">from day one to scale</span>
          </h2>
          <p className="process-subtitle">
            No endless discovery workshops. No offshore handoffs. A high-velocity, disciplined engineering lifecycle.
          </p>
        </div>

        {/* 4-Stage Modern Timeline Grid */}
        <div className="process-timeline-rail">
          {PROCESS_STEPS.map((st, i) => {
            const isSelected = i === selectedStep
            return (
              <motion.div
                key={st.n}
                className={`process-step-card tl-glass ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedStep(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div className="step-card-top">
                  <span className="step-number">{st.n}</span>
                  <div className="step-icon-badge">{st.icon}</div>
                </div>

                <div className="step-card-middle">
                  <span className="step-phase-pill">{st.phase}</span>
                  <h3 className="step-title">{st.title}</h3>
                  <p className="step-summary">{st.summary}</p>
                </div>

                <div className="step-deliverables-list">
                  <span className="deliv-header">KEY DELIVERABLES:</span>
                  {st.deliverables.map((d) => (
                    <div key={d} className="deliv-item">
                      <span className="deliv-dot" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
