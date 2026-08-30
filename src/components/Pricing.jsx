import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap, Layers, Calendar, Globe } from 'lucide-react'
import { toast } from 'sonner'
import './Pricing.css'

const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD ($)', rate: 1 },
  { code: 'EUR', symbol: '€', label: 'EUR (€)', rate: 0.92 },
  { code: 'GBP', symbol: '£', label: 'GBP (£)', rate: 0.79 },
  { code: 'INR', symbol: '₹', label: 'INR (₹)', rate: 86.5 }
]

const TIERS = [
  {
    id: 'sprint',
    name: 'Project Sprint',
    timeline: '2 — 4 Weeks',
    tag: 'FAST LAUNCH',
    pricing: {
      USD: '$1,500',
      EUR: '€1,400',
      GBP: '£1,200',
      INR: '₹99,000'
    },
    pricingSub: 'fixed milestone',
    desc: 'Best for launching a specific website, mobile app, or automated AI bot with a fixed timeline and clear budget.',
    features: [
      'Complete custom website, app, or online store',
      'Mobile-friendly, responsive & fast-loading (<1.2s)',
      'Weekly live staging demos and client reviews',
      'Full source code ownership & Git handover',
      'Post-launch warranty & stability support'
    ],
    highlight: false,
    cta: 'Start a Project'
  },
  {
    id: 'partner',
    name: 'Growth Partnership',
    timeline: 'Monthly Dedicated',
    tag: 'MOST POPULAR',
    pricing: {
      USD: '$2,800',
      EUR: '€2,600',
      GBP: '£2,200',
      INR: '₹1,85,000'
    },
    pricingSub: '/ month retainer',
    desc: 'A dedicated development team to continuously build new features, maintain your software, and add smart automations.',
    features: [
      'Dedicated fullstack & AI engineers for your roadmap',
      'Direct WhatsApp & private Slack communication',
      'Continuous feature sprints, bug fixes & CI/CD',
      'High-priority 24/7 uptime monitoring & SLA',
      'Automated database backups & cloud scaling'
    ],
    highlight: true,
    cta: 'Partner With Us'
  },
  {
    id: 'enterprise',
    name: 'Custom Enterprise',
    timeline: 'Tailored Scope',
    tag: 'CUSTOM SCALE',
    pricing: {
      USD: 'Custom',
      EUR: 'Custom',
      GBP: 'Custom',
      INR: 'Custom'
    },
    pricingSub: 'tailored roadmap',
    desc: 'For multi-location companies, large product ecosystems, or complex custom requirements.',
    features: [
      'Multi-branch and high-volume enterprise operations',
      'Custom database, ERP, CRM & payment gateway integrations',
      'Custom staff permissions, RBAC and admin dispatch hubs',
      'Dedicated solution architect & executive SLA',
      'Full bilateral NDA & custom compliance agreements'
    ],
    highlight: false,
    cta: 'Book Discovery Call',
    isDiscovery: true
  }
]

export default function Pricing({ onOpenDiscoveryModal }) {
  const [currency, setCurrency] = useState('USD')

  function handleCurrencyChange(c) {
    setCurrency(c)
    toast.info(`Currency switched to ${c}`)
  }

  return (
    <section id="pricing" className="tl-section pricing-section">
      <div className="tl-shell">
        <div className="pricing-header">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>TRANSPARENT ESTIMATES</span>
          </div>
          <h2 className="pricing-title">
            Simple, transparent plans <br />
            <span className="text-gradient-n8n">for projects of any size.</span>
          </h2>
          <p className="pricing-subtitle">
            No hidden fees, recurring lock-in, or royalties. Choose the engagement model that fits your business.
          </p>

          {/* Dynamic Currency Switcher */}
          <div className="pricing-currency-bar">
            <div className="currency-label">
              <Globe size={13} color="var(--coral)" />
              <span>Select Currency:</span>
            </div>
            <div className="currency-pills-group">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className={`currency-pill-btn ${currency === c.code ? 'active' : ''}`}
                  onClick={() => handleCurrencyChange(c.code)}
                >
                  <span>{c.code}</span>
                  <span className="currency-sym">({c.symbol})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-cards-grid">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={tier.id}
              className={`pricing-card tl-glass tl-glass-spotlight ${tier.highlight ? 'highlighted' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              {tier.highlight && (
                <div className="tier-top-highlight-badge">
                  <Sparkles size={12} />
                  <span>RECOMMENDED FOR GROWING BUSINESSES</span>
                </div>
              )}

              <div className="tier-head">
                <div className="tier-badge-row">
                  <span className="tier-tag-pill">{tier.tag}</span>
                  <span className="tier-timeline">{tier.timeline}</span>
                </div>

                <h3 className="tier-name">{tier.name}</h3>

                {/* Price Display */}
                <div className="tier-price-row">
                  <span className="tier-price-val">{tier.pricing[currency]}</span>
                  <span className="tier-price-sub">{tier.pricingSub}</span>
                </div>

                <p className="tier-desc">{tier.desc}</p>
              </div>

              <div className="tier-features-wrap">
                <span className="features-subhead">WHAT'S INCLUDED:</span>
                <ul className="tier-features-list">
                  {tier.features.map((feat) => (
                    <li key={feat} className="tier-feature-item">
                      <span className="tier-check-icon">
                        <Check size={14} color="var(--emerald)" />
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="tier-cta-box">
                {tier.isDiscovery ? (
                  <button 
                    type="button"
                    onClick={onOpenDiscoveryModal} 
                    className="tl-btn tl-btn-secondary tier-action-btn"
                  >
                    <Calendar size={14} color="var(--coral)" />
                    <span>{tier.cta}</span>
                  </button>
                ) : (
                  <a 
                    href="#contact" 
                    className={`tl-btn ${tier.highlight ? 'tl-btn-primary' : 'tl-btn-secondary'} tier-action-btn`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
