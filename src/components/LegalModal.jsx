import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Lock, FileText, X, CheckCircle2, Sparkles, Scale, ExternalLink } from 'lucide-react'
import './LegalModal.css'

const TABS = [
  { id: 'privacy', label: 'Privacy Policy', icon: Lock },
  { id: 'terms', label: 'Terms of Service', icon: Scale },
  { id: 'nda', label: 'Confidentiality & NDA', icon: ShieldCheck }
]

export default function LegalModal({ isOpen, onClose, initialTab = 'privacy' }) {
  const [activeTab, setActiveTab] = useState(initialTab)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="legal-overlay" onClick={onClose}>
        <motion.div 
          className="legal-container tl-glass"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="legal-header">
            <div className="legal-header-left">
              <div className="legal-badge">
                <Sparkles size={12} color="var(--coral)" />
                <span>LEGAL & COMPLIANCE FRAMEWORK</span>
              </div>
              <h3 className="legal-title">TensorLoom AI Governance & Client Trust</h3>
            </div>
            <button className="legal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="legal-tabs-bar">
            {TABS.map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  className={`legal-tab-btn ${activeTab === t.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  <Icon size={14} />
                  <span>{t.label}</span>
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="legal-body-content">
            {activeTab === 'privacy' && (
              <div className="legal-tab-pane">
                <div className="legal-section">
                  <h4>1. Overview & Data Philosophy</h4>
                  <p>
                    At TensorLoom AI (accessible at https://tensorloom.ai), your privacy and intellectual property are our highest priority. We do not sell, monetize, or harvest client or visitor data. Any information provided through our project inquiry intake or discovery sessions is used strictly for scope evaluation and project delivery.
                  </p>
                </div>

                <div className="legal-section">
                  <h4>2. Information We Collect</h4>
                  <p>
                    We collect minimal information necessary to deliver software engineering services:
                  </p>
                  <ul>
                    <li>Contact Details: Name, business email, phone number (optional).</li>
                    <li>Project Specifications: Target timelines, budget brackets, architectural requirements.</li>
                    <li>Technical Telemetry: Standard aggregated browser telemetry for site performance.</li>
                  </ul>
                </div>

                <div className="legal-section">
                  <h4>3. GDPR & CCPA Compliance</h4>
                  <p>
                    All clients retain full rights to request immediate export, modification, or complete deletion of their inquiry records by contacting <strong>tensoorloom@gmail.com</strong>.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="legal-tab-pane">
                <div className="legal-section">
                  <h4>1. 100% Intellectual Property & Code Ownership</h4>
                  <p>
                    Upon milestone payment and project handover, <strong>you own 100% of all deliverables</strong>, including source code, design files, database schemas, API connectors, and automated AI agent configurations. No recurring vendor lock-in fees or hidden royalties.
                  </p>
                </div>

                <div className="legal-section">
                  <h4>2. Milestones & Fixed-Price Estimates</h4>
                  <p>
                    All custom builds are structured into transparent, phased milestone sprints. Live staging testing environments are provisioned from Week 1 for real-time verification before production deployment.
                  </p>
                </div>

                <div className="legal-section">
                  <h4>3. Warranty & Defect Support</h4>
                  <p>
                    Every production deployment includes complimentary post-launch stability monitoring and critical bug fixes to ensure flawless uptime and performance.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'nda' && (
              <div className="legal-tab-pane">
                <div className="legal-section">
                  <h4>1. Mutual Non-Disclosure Agreement (NDA)</h4>
                  <p>
                    Every project inquiry and consultation with TensorLoom AI is automatically governed by strict mutual non-disclosure principles. We will never share your business models, proprietary workflows, or database access with third parties.
                  </p>
                </div>

                <div className="legal-section">
                  <h4>2. Enterprise Security Architecture</h4>
                  <p>
                    All database connectors, AI model integrations, and API keys are deployed inside isolated client-owned VPC containers with end-to-end TLS encryption and least-privilege IAM policies.
                  </p>
                </div>

                <div className="legal-section">
                  <h4>3. Formal Custom NDA Execution</h4>
                  <p>
                    If your legal department requires a customized bilateral NDA signed prior to sharing proprietary data, simply request a formal NDA via <strong>tensoorloom@gmail.com</strong>.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="legal-footer">
            <span className="legal-footer-note">Official Desk: tensoorloom@gmail.com</span>
            <button className="tl-btn tl-btn-primary" onClick={onClose}>
              <span>Acknowledge & Close</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
