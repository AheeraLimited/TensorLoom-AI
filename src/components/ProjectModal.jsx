import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, ExternalLink, ArrowRight, CheckCircle2, Sparkles, Layers,
  Smartphone, Monitor, Shield, Zap, Copy
} from 'lucide-react'
import { toast } from 'sonner'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  const [deviceMode, setDeviceMode] = useState('desktop')

  useEffect(() => {
    if (!project) return
    setDeviceMode('desktop')

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [project, onClose])

  if (!project) return null

  const IconComp = project.icon

  return (
    <AnimatePresence>
      <motion.div 
        className="proj-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="proj-modal-container"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Chrome Window Bar */}
          <div className="proj-modal-bar">
            <div className="proj-modal-bar-left">
              <div className="modal-window-dots">
                <span className="m-dot red" onClick={onClose} title="Close" />
                <span className="m-dot yellow" />
                <span className="m-dot green" />
              </div>
              <div className="modal-brand-badge">
                <div 
                  className="modal-brand-icon"
                  style={{ 
                    background: `${project.color}18`, 
                    borderColor: `${project.color}40`,
                    color: project.color 
                  }}
                >
                  <IconComp size={16} />
                </div>
                <div className="modal-title-stack">
                  <div className="modal-title-row">
                    <span className="modal-proj-name">{project.name}</span>
                    <span className="modal-industry-tag" style={{ color: project.color }}>
                      {project.industry || project.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Device View Switcher */}
            <div className="proj-modal-switch">
              <button
                className={`modal-device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setDeviceMode('desktop')}
              >
                <Monitor size={13} />
                <span>Desktop</span>
              </button>
              <button
                className={`modal-device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setDeviceMode('mobile')}
              >
                <Smartphone size={13} />
                <span>Mobile</span>
              </button>
            </div>

            {/* Right: Direct Launch + Close */}
            <div className="proj-modal-bar-right">
              {project.targetUrl !== '#contact' ? (
                <a 
                  href={project.targetUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-launch-btn"
                  title="Open live website in new tab"
                >
                  <span>Open Live Site</span>
                  <ExternalLink size={13} />
                </a>
              ) : (
                <a href="#contact" onClick={onClose} className="modal-launch-btn">
                  <span>Contact Team</span>
                  <ArrowRight size={13} />
                </a>
              )}

              <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="proj-modal-body">
            {/* Live Interactive Preview Stage */}
            <div className={`modal-preview-stage mode-${deviceMode}`}>
              {project.targetUrl !== '#contact' ? (
                deviceMode === 'mobile' ? (
                  <div className="modal-mobile-chassis">
                    <div className="phone-island-notch" />
                    <iframe
                      src={project.targetUrl}
                      title={`${project.name} live mobile feed`}
                      className="modal-mobile-iframe"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                    />
                  </div>
                ) : (
                  <iframe
                    src={project.targetUrl}
                    title={`${project.name} live desktop feed`}
                    className="modal-desktop-iframe"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                  />
                )
              ) : (
                <div className="modal-whatsapp-fallback">
                  <div className="modal-wa-icon-box">
                    <IconComp size={36} color={project.color} />
                  </div>
                  <h3>Automated 24/7 AI System</h3>
                  <p>{project.tagline}</p>
                  <a href="#contact" onClick={onClose} className="tl-btn tl-btn-primary">
                    <span>Inquire About WhatsApp Automations</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              )}
            </div>

            {/* Performance Metrics Strip */}
            <div className="modal-metrics-strip">
              {project.metrics.map((m) => (
                <div key={m.label} className="modal-metric-box">
                  <span className="modal-metric-val" style={{ color: project.color }}>{m.val}</span>
                  <span className="modal-metric-label">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Highlights & Tech Stack 2-Column Grid */}
            <div className="modal-details-grid">
              <div className="modal-detail-card tl-glass tl-glass-spotlight">
                <h4 className="modal-detail-heading">
                  <Sparkles size={15} color="var(--coral)" />
                  <span>Key Features & Capabilities</span>
                </h4>
                <ul className="modal-checklist">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="modal-check-item">
                      <CheckCircle2 size={15} color="var(--emerald)" className="check-icon" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-detail-card tl-glass tl-glass-spotlight">
                <h4 className="modal-detail-heading">
                  <Layers size={15} color="var(--sky)" />
                  <span>Technologies & Architecture</span>
                </h4>
                <div className="modal-tech-pills">
                  {project.tech.map((t) => (
                    <span key={t} className="modal-tech-pill">{t}</span>
                  ))}
                </div>

                <p className="modal-tagline-text">{project.tagline}</p>
              </div>
            </div>

            {/* Bottom Glass Callout Action */}
            <div className="modal-bottom-cta">
              <div className="modal-cta-copy">
                <h5>Want a similar {project.industry || project.category} platform?</h5>
                <p>We build, customize, and launch this tailored to your brand in 2–3 weeks.</p>
              </div>
              <a 
                href="#contact" 
                onClick={onClose}
                className="tl-btn tl-btn-primary modal-cta-btn"
              >
                <span>Start a Project</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
