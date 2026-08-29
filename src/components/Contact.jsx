import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle2, Mail, Clock, ShieldCheck, Terminal, Copy } from 'lucide-react'
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
    navigator.clipboard.writeText('hello@tensorloom.ai')
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
              <span>START A CONVERSATION //</span>
            </div>

            <h2 className="contact-headline">
              Tell us what <br />
              <span className="text-gradient-n8n">needs weaving.</span>
            </h2>

            <p className="contact-subtext">
              Reach out with a rough concept or an urgent production bottleneck.
              You will speak directly with a principal engineer within 24 hours.
            </p>

            <div className="contact-quick-pills">
              <div className="quick-pill">
                <Clock size={14} color="var(--coral)" />
                <span>Response SLA: &lt; 24 business hours</span>
              </div>
              <div className="quick-pill">
                <ShieldCheck size={14} color="var(--emerald)" />
                <span>Mutual NDA on request</span>
              </div>
            </div>

            {/* Email Copy Card */}
            <div className="contact-direct-box tl-glass">
              <span className="direct-label">DIRECT INQUIRIES</span>
              <div className="direct-email-row">
                <span className="direct-email">hello@tensorloom.ai</span>
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
                  <h3>Signal Dispatched</h3>
                  <p>
                    Thank you, {form.name || 'there'}. We have received your scope for{' '}
                    <strong>{form.projectType}</strong>. A principal engineer will review and respond shortly.
                  </p>
                  <button 
                    className="tl-btn tl-btn-ghost" 
                    onClick={() => setSent(false)}
                    style={{ marginTop: 20 }}
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* Project Type Selector Pills */}
                  <div className="form-group">
                    <label className="form-label">PROJECT SCOPE</label>
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
                        placeholder="Elena Vance"
                        required
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">WORK EMAIL</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={form.email} 
                        onChange={handleChange}
                        placeholder="elena@enterprise.com"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Timeline Selector */}
                  <div className="form-group">
                    <label className="form-label">TARGET TIMELINE</label>
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
                    <label className="form-label">WORKFLOW DETAILS OR BOTTLENECK</label>
                    <textarea 
                      name="message" 
                      value={form.message} 
                      onChange={handleChange}
                      placeholder="Tell us what you want to automate, build, or modernize..."
                      rows={4}
                      className="form-textarea"
                    />
                  </div>

                  <button type="submit" className="tl-btn tl-btn-primary form-submit-btn">
                    <span>Dispatch Project Scope</span>
                    <ArrowRight size={16} />
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
