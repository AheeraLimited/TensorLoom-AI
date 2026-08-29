import { motion } from 'framer-motion'
import { Zap, Smartphone, Sparkles, Workflow, Bot, ShieldCheck } from 'lucide-react'
import './About.css'

const PILLARS = [
  {
    num: '01',
    title: 'Fast & Modern Technology',
    subtitle: 'CLEAN ARCHITECTURE',
    icon: <Zap size={22} color="#0284c7" />,
    color: '#0284c7',
    desc: 'We build high-speed websites and applications that load in under a second and work smoothly on any phone, tablet, or desktop.',
    visual: ['Lightning Fast Load', 'Mobile First Design', 'Secure Payments', 'Clean Reliable Code']
  },
  {
    num: '02',
    title: 'Tailored to Your Business',
    subtitle: 'CUSTOM BUILT',
    icon: <Workflow size={22} color="var(--coral)" />,
    color: 'var(--coral)',
    desc: 'Every business is unique. We craft custom platforms and tools designed specifically around how your business operates.',
    visual: ['Online Stores', 'Booking & Dispatch', 'Live GPS Tracking', 'Custom Admin Hubs']
  },
  {
    num: '03',
    title: 'Smart Automation & AI',
    subtitle: 'EFFORTLESS OPERATIONS',
    icon: <Bot size={22} color="#7c3aed" />,
    color: '#7c3aed',
    desc: 'Automate repetitive daily tasks like customer replies, order notifications, route planning, and WhatsApp UPI billing.',
    visual: ['24/7 Auto Replies', 'Instant WhatsApp Bills', 'Live Order Tracking', 'Less Manual Work']
  }
]

export default function About() {
  return (
    <section id="about" className="tl-section about-section">
      <div className="tl-shell">
        <div className="about-header">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>ABOUT TENSORLOOM AI</span>
          </div>
          <h2 className="about-title">
            We build software that actually solves <br />
            <span className="text-gradient-n8n">real business problems.</span>
          </h2>
          <p className="about-subtitle">
            No confusing tech jargon. We design, develop, and launch high-quality web applications and smart automated systems that help your business grow.
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
