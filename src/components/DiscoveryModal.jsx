import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Video, X, ShieldCheck, Sparkles, ExternalLink, Globe, CheckCircle2 } from 'lucide-react'
import './DiscoveryModal.css'

export default function DiscoveryModal({ isOpen, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const CALENDLY_URL = 'https://calendly.com/tensorloom/30min'
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'

  if (!isOpen) return null

  function handleOpenExternal() {
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      <div className="dm-overlay" onClick={onClose}>
        <motion.div 
          className="dm-container dm-calendly-mode tl-glass"
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button className="dm-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>

          {/* Left Column: Call Info & Value */}
          <div className="dm-left-pane">
            <div className="dm-eyebrow">
              <Sparkles size={12} color="var(--coral)" />
              <span>1-ON-1 ARCHITECTURE SESSION</span>
            </div>

            <h3 className="dm-title">30-Min Technical Discovery Call</h3>
            <p className="dm-sub">
              Schedule a direct consultation with TensorLoom's senior solutions architect to review your roadmap, platform architecture, and fixed pricing quote.
            </p>

            <div className="dm-perks-list">
              <div className="dm-perk-item">
                <Video size={16} color="var(--coral)" />
                <span>Google Meet / Zoom Video Link</span>
              </div>
              <div className="dm-perk-item">
                <Clock size={16} color="var(--sky)" />
                <span>30 Minutes Technical Deep-Dive</span>
              </div>
              <div className="dm-perk-item">
                <ShieldCheck size={16} color="var(--emerald)" />
                <span>100% Mutual NDA & IP Protection</span>
              </div>
              <div className="dm-perk-item">
                <Globe size={16} color="var(--purple)" />
                <span>Detected Timezone: <strong>{userTimeZone}</strong></span>
              </div>
            </div>

            <div className="dm-external-link-card">
              <p>Prefer opening Calendly directly in a new window?</p>
              <button 
                type="button" 
                className="tl-btn tl-btn-ghost dm-ext-btn"
                onClick={handleOpenExternal}
              >
                <span>Open in Calendly</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>

          {/* Right Column: Embedded Calendly Live Widget */}
          <div className="dm-right-pane dm-calendly-frame-wrap">
            <iframe
              src={`${CALENDLY_URL}?embed_domain=${window.location.hostname}&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1`}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Select a Date & Time - Calendly"
              className="dm-calendly-iframe"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
