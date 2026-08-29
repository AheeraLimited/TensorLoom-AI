import { motion } from 'framer-motion'
import { Stethoscope, Landmark, Truck, Factory, Building2, ShoppingBag, ShieldCheck, Scale, Cpu } from 'lucide-react'
import './IndustryMarquee.css'

const STATS = [
  { value: '$48M+', label: 'Autonomous Ops Handled', icon: <Cpu size={16} /> },
  { value: '99.98%', label: 'Deterministic Guardrail Safety', icon: <ShieldCheck size={16} /> },
  { value: '14ms', label: 'Median Model Latency', icon: <Landmark size={16} /> },
  { value: '12+', label: 'Enterprise Verticals Deployed', icon: <Factory size={16} /> },
]

const INDUSTRIES = [
  { name: 'Clinical Healthcare', icon: <Stethoscope size={14} />, tag: 'FHIR Compliant' },
  { name: 'Fintech & Risk', icon: <Landmark size={14} />, tag: 'Sub-second Audit' },
  { name: 'Autonomous Logistics', icon: <Truck size={14} />, tag: 'Route Optimization' },
  { name: 'Industrial IoT', icon: <Factory size={14} />, tag: 'Predictive Edge' },
  { name: 'Commercial Real Estate', icon: <Building2 size={14} />, tag: 'Automated Underwriting' },
  { name: 'Omnichannel Commerce', icon: <ShoppingBag size={14} />, tag: 'Dynamic Fulfillment' },
  { name: 'Legal & Compliance', icon: <Scale size={14} />, tag: 'Contract Synthesis' },
]

export default function IndustryMarquee() {
  const track = [...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES]

  return (
    <section className="marquee-section" aria-label="Enterprise Impact & Sectors">
      {/* High-Impact Stat Strip */}
      <div className="tl-shell">
        <div className="marquee-stats-grid">
          {STATS.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              className="stat-card tl-glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="stat-card-top">
                <span className="stat-icon">{stat.icon}</span>
                <span className="stat-value text-gradient-gold">{stat.value}</span>
              </div>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infinite Glowing Marquee Strip */}
      <div className="marquee-track-container">
        <div className="marquee-fade-overlay left" />
        <div className="marquee-fade-overlay right" />
        
        <div className="marquee-infinite-track">
          {track.map((item, i) => (
            <div className="marquee-chip" key={i}>
              <span className="chip-icon">{item.icon}</span>
              <span className="chip-name">{item.name}</span>
              <span className="chip-tag">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
