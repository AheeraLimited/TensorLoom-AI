import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle2, Mail, Clock, ShieldCheck, Terminal, Copy, Send } from 'lucide-react'
import Reveal from './Reveal.jsx'
import './Contact.css'

const PROJECT_TYPES = [
  'Autonomous AI Agent',
  'Fullstack Platform',
  'Cloud / IT Infrastructure',
  'Native Android App'
]

const TIMELINES = [
  'Immediate (Sprint)',
  'This Quarter',
  'Long-Term Retainer'
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    projectType: 'Autonomous AI Agent',
    timeline: 'Immediate (Sprint)',
    message: ''
  })

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function handleCopyEmail() {
    navigator.clipboard.writeText('tensoorloom@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="tl-section contact-section">
      <div className="tl-shell">
        <div className="contact-grid">
          {/* Left Column: Direct Info & Quick SLA */}
          <div className="contact-left">
            <div className="eyebrow">
              <Sparkles size={12} />
              <span>GET IN TOUCH</span>
            </div>

            <h2 className="contact-headline">
              Let's build your next <br />
              <span className="text-gradient-n8n">great project.</span>
            </h2>

            <p className="contact-subtext">
              Share your idea, website requirements, or business goals. We'll reply within 24 hours with a clear plan, timeline, and pricing.
            </p>

            <div className="contact-quick-pills">
              <div className="quick-pill">
                <Clock size={14} color="var(--coral)" />
                <span>Fast Reply: Within 24 hours</span>
              </div>
              <div className="quick-pill">
                <ShieldCheck size={14} color="var(--emerald)" />
                <span>100% Confidential & Secure</span>
              </div>
            </div>

            {/* Email Copy Card */}
            <div className="contact-direct-box tl-glass">
              <span className="direct-label">DIRECT EMAIL</span>
              <div className="direct-email-row">
                <span className="direct-email">tensoorloom@gmail.com</span>
                <button 
                  className="copy-btn" 
                  onClick={handleCopyEmail} 
                  title="Copy email to clipboard"
                >
                  {copied ? <CheckCircle2 size={15} color="var(--emerald)" /> : <Copy size={15} />}
                  <span>{copied ? 'COPIED' : 'COPY'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Intake Form */}
          <div className="contact-right">
            <div className="contact-form-card tl-glass">
              {sent ? (
                <motion.div 
                  className="contact-success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon-badge">
                    <CheckCircle2 size={36} color="var(--coral)" />
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p>
                    Thank you, {form.name || 'there'}. We have received your project details for{' '}
                    <strong>{form.projectType}</strong>. Our team will review everything and get back to you shortly.
                  </p>
                  <button 
                    className="tl-btn tl-btn-ghost" 
                    onClick={() => setSent(false)}
                    style={{ marginTop: 20 }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* Project Type Selector Pills */}
                  <div className="form-group">
                    <label className="form-label">WHAT ARE YOU LOOKING TO BUILD?</label>
                    <div className="form-pill-selector">
                      {PROJECT_TYPES.map((pt) => (
                        <button
                          type="button"
                          key={pt}
                          className={`pill-btn ${form.projectType === pt ? 'active' : ''}`}
                          onClick={() => setForm({ ...form, projectType: pt })}
                        >
                          {pt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">YOUR NAME</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={form.name} 
                        onChange={handleChange}
                        placeholder="Alex Morgan"
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">EMAIL ADDRESS</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Timeline Selector */}
                  <div className="form-group">
                    <label className="form-label">DESIRED TIMELINE</label>
                    <div className="form-pill-selector">
                      {TIMELINES.map((tl) => (
                        <button
                          type="button"
                          key={tl}
                          className={`pill-btn ${form.timeline === tl ? 'active' : ''}`}
                          onClick={() => setForm({ ...form, timeline: tl })}
                        >
                          {tl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="form-group">
                    <label className="form-label">PROJECT DETAILS & REQUIREMENTS</label>
                    <textarea 
                      name="message" 
                      value={form.message} 
                      onChange={handleChange}
                      placeholder="Tell us what you want to build (e.g. an online shopping store, a delivery app, GPS tracking system, or WhatsApp bot)..."
                      required
                      rows={4}
                      className="form-textarea"
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="tl-btn tl-btn-primary form-submit-btn">
                    <span>Send Project Inquiry</span>
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
