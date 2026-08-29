import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Check, ArrowRight, ShieldCheck, Zap, Layers } from 'lucide-react'
import Reveal from './Reveal.jsx'
import './Pricing.css'

const TIERS = [
  {
    id: 'sprint',
    name: 'Tactical Sprint',
    timeline: '2 — 4 Weeks',
    tag: 'FIXED SCOPE',
    desc: 'Rapid build to validate a high-impact agent or ship a mission-critical feature without fluff.',
    features: [
      'Single product surface (Web, Mobile, or AI Agent)',
      'Deterministic eval benchmarks included',
      'Weekly live code deployments',
      'Complete architecture docs & code handover'
    ],
    highlight: false,
    cta: 'Book a Sprint'
  },
  {
    id: 'partner',
    name: 'Dedicated Pod',
    timeline: 'Quarterly Retainer',
    tag: 'MOST POPULAR',
    desc: 'An embedded senior engineering pod that continuously scopes, builds, and maintains your AI & platform stack.',
    features: [
      'Fullstack + AI Engineers dedicated to your roadmap',
      'Direct Slack/Discord async access (no ticketing lag)',
      'Autonomous system monitoring & latency tuning',
      'Weekly architectural reviews & capacity planning'
    ],
    highlight: true,
    cta: 'Embed a Pod'
  },
  {
    id: 'enterprise',
    name: 'Enterprise Loom',
    timeline: 'Custom Multi-Team',
    tag: 'ENTERPRISE',
    desc: 'For organizations with multi-system integrations, strict HIPAA/SOC-2 compliance, or on-prem airgapped requirements.',
    features: [
      'Private cloud, VPC, or on-prem deployment',
      'Custom security & compliance signoffs',
      'Multi-squad parallel workstreams',
      'Dedicated 24/7 incident response SLA'
    ],
    highlight: false,
    cta: 'Contact Solutions'
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="tl-section pricing-section">
      <div className="tl-shell">
        <div className="pricing-header">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>ENGAGEMENT STRUCTURES //</span>
          </div>
          <h2 className="pricing-title">
            Pick the shape of the work, <br />
            <span className="text-gradient-n8n">sized to your mission</span>
          </h2>
          <p className="pricing-subtitle">
            We scope every project transparently before writing code. No locked-in black box contracts.
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
                  <span>RECOMMENDED FOR HIGH VELOCITY</span>
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
                <span className="features-label">WHAT'S INCLUDED:</span>
                <ul className="tier-features-list">
                  {tier.features.map((feat) => (
                    <li key={feat} className="tier-feature-item">
                      <span className="feature-check"><Check size={13} color="var(--coral)" /></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href="#contact" 
                className={`tl-btn ${tier.highlight ? 'tl-btn-primary' : 'tl-btn-ghost'} tier-action-btn`}
              >
                <span>{tier.cta}</span>
                <ArrowRight size={15} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
