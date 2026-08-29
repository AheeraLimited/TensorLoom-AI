import { motion } from 'framer-motion'
import { Database, Cpu, Layers, Sparkles, ArrowUpRight, ShieldCheck, Terminal, Workflow } from 'lucide-react'
import Reveal from './Reveal.jsx'
import './About.css'

const PILLARS = [
  {
    num: '01',
    title: 'Raw Data Ingestion',
    subtitle: 'THE INPUT',
    icon: <Database size={22} color="#0284c7" />,
    color: '#0284c7',
    desc: 'Normalize scattered logs, EHR feeds, and event streams with zero data leaks.',
    visual: ['JSON Streams', 'Vector Embeddings', 'FHIR / EDI Feeds', 'Event Buses']
  },
  {
    num: '02',
    title: 'The Loom Engine',
    subtitle: 'THE PLATFORM',
    icon: <Workflow size={22} color="var(--coral)" />,
    color: 'var(--coral)',
    desc: 'High-velocity cloud orchestration, sub-second databases, and native UIs.',
    visual: ['Multi-Cloud Mesh', 'Deterministic APIs', 'Native Kotlin / Web', '99.99% Uptime']
  },
  {
    num: '03',
    title: 'Woven Intelligence',
    subtitle: 'THE RUNTIME',
    icon: <Cpu size={22} color="#7c3aed" />,
    color: '#7c3aed',
    desc: 'Deterministic agents with rigid policy guardrails and verifiable execution logs.',
    visual: ['Deterministic Evals', 'Human Checkpoints', 'Tool Invocation', 'Auditable Log']
  }
]

export default function About() {
  return (
    <section id="about" className="tl-section about-section">
      <div className="tl-shell">
        <div className="about-header">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>THE TENSORLOOM AI PHILOSOPHY //</span>
          </div>
          <h2 className="about-title">
            From raw data threads <br />
            <span className="text-gradient-n8n">to autonomous, woven reality.</span>
          </h2>
          <p className="about-subtitle">
            We engineer the infrastructure that anchors your enterprise, and the intelligent agents that run through it.
          </p>
        </div>

        {/* 3-Pillar Architectural Visual Grid */}
        <div className="about-pillars-grid">
          {PILLARS.map((p, idx) => (
            <motion.div 
              key={p.num}
              className="about-pillar-card tl-glass"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className="pillar-top-row">
                <span className="pillar-num">{p.num}</span>
                <div className="pillar-icon-box" style={{ background: `${p.color}12`, borderColor: `${p.color}30` }}>
                  {p.icon}
                </div>
              </div>

              <span className="pillar-subtitle" style={{ color: p.color }}>{p.subtitle}</span>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>

              <div className="pillar-chips">
                {p.visual.map((tag) => (
                  <span className="pillar-chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
