import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, Clock, CheckCircle2, ChevronRight } from 'lucide-react'
import './WhatsAppButton.css'

const PRESET_TOPICS = [
  {
    icon: '📅',
    label: 'Book 30-Min Discovery Call',
    msg: 'Hi TensorLoom AI! I would like to schedule a 30-minute technical discovery call regarding our project requirements.'
  },
  {
    icon: '🛒',
    label: 'E-Commerce / Online Store',
    msg: 'Hi TensorLoom AI team! I am interested in building a high-performance E-Commerce platform with payment gateways and order management. Can we discuss pricing and timeline?'
  },
  {
    icon: '⚡',
    label: 'Custom Web App / SaaS',
    msg: 'Hi TensorLoom AI! I have a requirement for a custom web application / SaaS platform. Could we set up a discovery call?'
  },
  {
    icon: '🤖',
    label: 'WhatsApp AI Bot & CRM',
    msg: 'Hello TensorLoom! I want to automate our customer inquiries and lead capture using an automated WhatsApp AI bot. How does this work?'
  }
]

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [customMsg, setCustomMsg] = useState('')

  const WHATSAPP_NUMBER = '919096761335' // TensorLoom Official Hotline: +91 9096761335

  function openWhatsAppWithText(text) {
    const encoded = encodeURIComponent(text || 'Hi TensorLoom AI! I would like to discuss a project with your team.')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer')
    setIsOpen(false)
  }

  function handleCustomSubmit(e) {
    e.preventDefault()
    if (!customMsg.trim()) return
    openWhatsAppWithText(customMsg)
  }

  return (
    <div className="wa-float-container" aria-label="WhatsApp Quick Contact">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="wa-card-glass tl-glass"
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="wa-header">
              <div className="wa-header-avatar">
                <div className="wa-avatar-icon">
                  <MessageCircle size={20} color="#ffffff" />
                </div>
                <div className="wa-online-pulse" title="Online" />
              </div>
              <div className="wa-header-info">
                <h4 className="wa-header-title">TensorLoom AI Direct</h4>
                <p className="wa-header-sub">
                  <Clock size={11} />
                  <span>Typically replies in &lt; 15 mins</span>
                </p>
              </div>
              <button 
                className="wa-close-btn" 
                onClick={() => setIsOpen(false)}
                aria-label="Close WhatsApp card"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content & Quick Prompts */}
            <div className="wa-body">
              <p className="wa-prompt-heading">Tap a topic for an instant pre-filled inquiry:</p>

              <div className="wa-presets-list">
                {PRESET_TOPICS.map((topic) => (
                  <button
                    key={topic.label}
                    className="wa-preset-item"
                    onClick={() => openWhatsAppWithText(topic.msg)}
                  >
                    <span className="wa-preset-emoji">{topic.icon}</span>
                    <span className="wa-preset-label">{topic.label}</span>
                    <ChevronRight size={14} className="wa-preset-arrow" />
                  </button>
                ))}
              </div>

              {/* Custom message input */}
              <form className="wa-custom-form" onSubmit={handleCustomSubmit}>
                <input 
                  type="text" 
                  className="wa-custom-input"
                  placeholder="Or type your message here..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="wa-send-btn"
                  aria-label="Send via WhatsApp"
                  title="Send via WhatsApp"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>

            <div className="wa-footer">
              <span>🔒 100% Confidential Client Chat</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button 
        className="wa-floating-btn"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Chat on WhatsApp with TensorLoom AI"
      >
        <span className="wa-btn-glow" />
        {isOpen ? (
          <X size={24} color="#ffffff" />
        ) : (
          <>
            <MessageCircle size={26} color="#ffffff" />
            <span className="wa-live-badge" />
          </>
        )}
      </motion.button>
    </div>
  )
}
