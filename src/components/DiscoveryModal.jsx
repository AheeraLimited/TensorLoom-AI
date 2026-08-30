import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Video, X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, User, Mail, Globe } from 'lucide-react'
import './DiscoveryModal.css'

const AVAILABLE_DAYS = [
  { day: 'Tomorrow', date: 'Tue, Sep 1' },
  { day: 'Wednesday', date: 'Wed, Sep 2' },
  { day: 'Thursday', date: 'Thu, Sep 3' },
  { day: 'Friday', date: 'Fri, Sep 4' }
]

const TIME_SLOTS = [
  '10:30 AM',
  '01:00 PM',
  '03:30 PM',
  '05:00 PM',
  '07:30 PM'
]

export default function DiscoveryModal({ isOpen, onClose }) {
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState('03:30 PM')
  const [step, setStep] = useState(1) // 1: Pick time, 2: Details, 3: Confirmed
  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    projectScope: 'Custom Web App / SaaS'
  })

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'

  if (!isOpen) return null

  function handleNextStep(e) {
    e.preventDefault()
    setStep(2)
  }

  function handleFinalBook(e) {
    e.preventDefault()
    setStep(3)
  }

  function handleResetAndClose() {
    setStep(1)
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="dm-overlay" onClick={handleResetAndClose}>
        <motion.div 
          className="dm-container tl-glass"
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button className="dm-close-btn" onClick={handleResetAndClose} aria-label="Close modal">
            <X size={18} />
          </button>

          {/* Left Column: Call Info & Value */}
          <div className="dm-left-pane">
            <div className="dm-eyebrow">
              <Sparkles size={12} color="var(--coral)" />
              <span>1-ON-1 DISCOVERY SESSION</span>
            </div>

            <h3 className="dm-title">15-Min Technical Discovery & Architecture Call</h3>
            <p className="dm-sub">
              Meet directly with our senior fullstack solutions architect to map out your project architecture, scope, timeline, and exact fixed quote.
            </p>

            <div className="dm-perks-list">
              <div className="dm-perk-item">
                <Video size={16} color="var(--coral)" />
                <span>Google Meet / Zoom HD Video</span>
              </div>
              <div className="dm-perk-item">
                <Clock size={16} color="var(--sky)" />
                <span>15 Minutes Focused Roadmap</span>
              </div>
              <div className="dm-perk-item">
                <ShieldCheck size={16} color="var(--emerald)" />
                <span>No Obligation & 100% NDA Protected</span>
              </div>
              <div className="dm-perk-item">
                <Globe size={16} color="var(--purple)" />
                <span>Timezone: <strong>{userTimeZone}</strong></span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Flow */}
          <div className="dm-right-pane">
            {step === 1 && (
              <div className="dm-step-view">
                <h4 className="dm-step-heading">1. Select a Date & Time</h4>
                
                {/* Day Selector */}
                <div className="dm-days-grid">
                  {AVAILABLE_DAYS.map((d, i) => (
                    <button
                      key={d.date}
                      type="button"
                      className={`dm-day-btn ${selectedDay === i ? 'active' : ''}`}
                      onClick={() => setSelectedDay(i)}
                    >
                      <span className="dm-day-name">{d.day}</span>
                      <span className="dm-day-date">{d.date}</span>
                    </button>
                  ))}
                </div>

                {/* Time Slots */}
                <p className="dm-slots-label">Available Slots ({userTimeZone}):</p>
                <div className="dm-slots-grid">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={`dm-slot-btn ${selectedSlot === slot ? 'active' : ''}`}
                      onClick={() => setSelectedSlot(slot)}
                    >
                      <Clock size={12} />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>

                <button 
                  type="button" 
                  className="tl-btn tl-btn-primary dm-continue-btn"
                  onClick={handleNextStep}
                >
                  <span>Continue with {AVAILABLE_DAYS[selectedDay].date} @ {selectedSlot}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === 2 && (
              <form className="dm-step-view" onSubmit={handleFinalBook}>
                <h4 className="dm-step-heading">2. Your Contact Information</h4>
                <p className="dm-selected-summary">
                  Booking for: <strong>{AVAILABLE_DAYS[selectedDay].date} at {selectedSlot}</strong>
                </p>

                <div className="dm-form-group">
                  <label className="dm-label">FULL NAME *</label>
                  <input 
                    type="text" 
                    required 
                    className="dm-input"
                    placeholder="Alex Morgan"
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  />
                </div>

                <div className="dm-form-group">
                  <label className="dm-label">WORK EMAIL ADDRESS *</label>
                  <input 
                    type="email" 
                    required 
                    className="dm-input"
                    placeholder="alex@company.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  />
                </div>

                <div className="dm-form-group">
                  <label className="dm-label">PROJECT SCOPE</label>
                  <select 
                    className="dm-select"
                    value={clientInfo.projectScope}
                    onChange={(e) => setClientInfo({ ...clientInfo, projectScope: e.target.value })}
                  >
                    <option value="Custom Web App / SaaS">Custom Web App / SaaS</option>
                    <option value="E-Commerce & Online Store">E-Commerce & Online Store</option>
                    <option value="AI Agents & Automations">AI Agents & Automations</option>
                    <option value="WhatsApp AI Bot & CRM">WhatsApp AI Bot & CRM</option>
                    <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
                  </select>
                </div>

                <div className="dm-actions-row">
                  <button 
                    type="button" 
                    className="tl-btn tl-btn-ghost"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button type="submit" className="tl-btn tl-btn-primary" style={{ flex: 1 }}>
                    <span>Confirm & Schedule Meeting</span>
                    <CheckCircle2 size={15} />
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="dm-step-view dm-confirmed-view">
                <div className="dm-success-badge">
                  <CheckCircle2 size={36} color="var(--emerald)" />
                </div>
                <h4 className="dm-confirmed-title">Discovery Session Confirmed!</h4>
                <p className="dm-confirmed-sub">
                  Calendar invitation and Google Meet link dispatched to <strong>{clientInfo.email || 'your email'}</strong>.
                </p>

                <div className="dm-invite-card">
                  <div className="dm-invite-row">
                    <span>Date:</span>
                    <strong>{AVAILABLE_DAYS[selectedDay].date}</strong>
                  </div>
                  <div className="dm-invite-row">
                    <span>Time:</span>
                    <strong>{selectedSlot} ({userTimeZone})</strong>
                  </div>
                  <div className="dm-invite-row">
                    <span>Topic:</span>
                    <strong>{clientInfo.projectScope} Architecture</strong>
                  </div>
                </div>

                <button 
                  type="button" 
                  className="tl-btn tl-btn-primary" 
                  onClick={handleResetAndClose}
                  style={{ width: '100%', marginTop: 8 }}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
