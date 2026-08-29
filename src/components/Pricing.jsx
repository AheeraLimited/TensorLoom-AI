import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react'
import './Pricing.css'

const TIERS = [
  {
    id: 'sprint',
    name: 'Project Sprint',
    timeline: '2 — 4 Weeks',
    tag: 'FAST LAUNCH',
    desc: 'Best for launching a specific website, mobile app, or automated AI bot with a fixed timeline and clear budget.',
    features: [
      'Complete custom website, app, or online store',
      'Mobile-friendly, responsive & fast-loading',
      'Weekly live testing demos and feedback',
      'Full source code ownership & handover'
    ],
    highlight: false,
    cta: 'Start a Project'
  },
  {
    id: 'partner',
    name: 'Growth Partnership',
    timeline: 'Monthly Plan',
    tag: 'MOST POPULAR',
    desc: 'A dedicated development team to continuously build new features, maintain your software, and add smart automations.',
    features: [
      'Dedicated developers for your business roadmap',
      'Direct WhatsApp & Slack communication',
      'Continuous updates, bug fixes & improvements',
      'Fast priority support and monitoring'
    ],
    highlight: true,
    cta: 'Partner With Us'
  },
  {
    id: 'enterprise',
    name: 'Custom Enterprise',
    timeline: 'Tailored Scope',
    tag: 'CUSTOM SCALE',
    desc: 'For multi-location companies, large product ecosystems, or complex custom requirements.',
    features: [
      'Multi-branch and high-volume operations',
      'Custom database, CRM & payment integrations',
      'Custom staff permissions and driver hubs',
      'Dedicated account manager & 24/7 support'
    ],
    highlight: false,
    cta: 'Contact Us'
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="tl-section pricing-section">
      <div className="tl-shell">
        <div className="pricing-header">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>TRANSPARENT PLANS</span>
          </div>
          <h2 className="pricing-title">
            Simple, transparent plans <br />
            <span className="text-gradient-n8n">for projects of any size.</span>
          </h2>
          <p className="pricing-subtitle">
            No hidden fees or locked contracts. Choose the plan that fits your business needs.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-cards-grid">
          {TIERS.map((tier, idx) => (
            <motion.div
              key={tier.id}
              className={`pricing-card-v2 tl-glass ${tier.highlight ? 'highlight-coral' : ''}`}
              initial={{ opacity: 0, y: 25 }}
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
                <a 
                  href="#contact" 
                  className={`tl-btn ${tier.highlight ? 'tl-btn-primary' : 'tl-btn-secondary'} tier-action-btn`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
