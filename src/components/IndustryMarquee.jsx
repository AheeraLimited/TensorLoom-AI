import { motion } from 'framer-motion'
import { ShoppingBag, Car, UtensilsCrossed, Droplets, Sparkles, MessageSquare, ShieldCheck, Zap, Cpu, CheckCircle2 } from 'lucide-react'
import './IndustryMarquee.css'

const STATS = [
  { value: '100+', label: 'Projects & Workflows Shipped', icon: <CheckCircle2 size={16} /> },
  { value: '99.99%', label: 'Uptime & System Reliability', icon: <ShieldCheck size={16} /> },
  { value: '< 1.2s', label: 'Average Page Load Speed', icon: <Zap size={16} /> },
  { value: '24/7', label: 'Continuous Automation Active', icon: <Cpu size={16} /> },
]

const INDUSTRIES = [
  { name: 'Online Stores & Retail', icon: <ShoppingBag size={14} />, tag: 'Fast Checkout' },
  { name: 'Car Rental & Mobility', icon: <Car size={14} />, tag: 'Live GPS Maps' },
  { name: 'Food & Restaurants', icon: <UtensilsCrossed size={14} />, tag: 'Kitchen Screen' },
  { name: 'Dairy & Farm Subscriptions', icon: <Droplets size={14} />, tag: 'Morning Route' },
  { name: 'Auto Detailing & Services', icon: <Sparkles size={14} />, tag: 'Slot Booking' },
  { name: 'WhatsApp Business Bots', icon: <MessageSquare size={14} />, tag: '24/7 Auto-Reply' },
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
