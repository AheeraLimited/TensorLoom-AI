import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Compass, Layout, Code2, Rocket, ArrowRight } from 'lucide-react'
import './Process.css'

const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Discover & Plan',
    phase: 'Days 1 — 3',
    icon: <Compass size={20} color="#0284c7" />,
    summary: 'We understand your business goals, target audience, and map out the exact features and budget needed.',
    deliverables: ['Clear Feature Roadmap', 'Project Plan', 'Fixed Timeline & Cost']
  },
  {
    n: '02',
    title: 'Design & Prototype',
    phase: 'Week 1',
    icon: <Layout size={20} color="var(--coral)" />,
    summary: 'We design clean, modern screens for mobile and desktop so you can see and approve the look before coding.',
    deliverables: ['Interactive Screen Mockups', 'Mobile & Desktop Views', 'User-Friendly Layouts']
  },
  {
    n: '03',
    title: 'Build & Weekly Demos',
    phase: 'Weeks 2 — 4',
    icon: <Code2 size={20} color="#7c3aed" />,
    summary: 'We code your application and share live testing links every week so you can test working software in real-time.',
    deliverables: ['Live Testing Links', 'Weekly Demos', 'Fast Progress Updates']
  },
  {
    n: '04',
    title: 'Launch & Support',
    phase: 'Launch & Beyond',
    icon: <Rocket size={20} color="var(--emerald)" />,
    summary: 'We launch your website live to the world, connect your domain and payments, and provide ongoing support.',
    deliverables: ['Live Production Launch', 'Team Walkthrough', 'Ongoing Support & Care']
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
            <span>HOW WE WORK</span>
          </div>
          <h2 className="process-title">
            From your idea to a live product in <br />
            <span className="text-gradient-n8n">4 simple steps.</span>
          </h2>
          <p className="process-subtitle">
            No endless meetings or confusing technical delays. A straightforward, transparent process from start to finish.
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
                  <span className="deliv-header">WHAT YOU GET:</span>
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
