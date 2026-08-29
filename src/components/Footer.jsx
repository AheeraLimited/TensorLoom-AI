import { Mail, Sparkles, ExternalLink, ShieldCheck, Activity, ChevronUp, Globe } from 'lucide-react'
import LoomMark from './LoomMark.jsx'
import './Footer.css'

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function TwitterIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="tl-shell footer-inner">
        {/* Pre-Footer Floating CTA Card */}
        <div className="footer-cta-card tl-glass">
          <div className="cta-card-content">
            <div className="eyebrow footer-eyebrow">
              <Sparkles size={12} />
              <span>START AN ENGAGEMENT</span>
            </div>
            <h3 className="footer-cta-title">
              Ready to weave autonomous AI into your <br />
              <span className="text-gradient-n8n">production operations?</span>
            </h3>
            <p className="footer-cta-sub">
              From dynamic retail engines to live fleet GIS and multi-agent workflow pipelines—let's build your next system.
            </p>
          </div>
          <div className="footer-cta-actions">
            <a href="#contact" className="tl-btn tl-btn-primary">
              <span>Start a Project</span>
              <Sparkles size={14} />
            </a>
            <a href="#projects" className="tl-btn tl-btn-secondary">
              <span>Explore Systems</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="footer-main-grid">
          {/* Col 1: Brand & Operational Status */}
          <div className="footer-brand-col">
            <a href="#top" className="footer-brand">
              <LoomMark size={28} />
              <span className="footer-brand-name">
                TensorLoom <strong className="brand-ai">AI</strong>
              </span>
            </a>
            <p className="footer-brand-desc">
              Autonomous agentic architectures and bespoke enterprise software systems engineered for high-stakes industries.
            </p>
            <div className="footer-status-badge">
              <span className="pulse-dot dot-emerald" />
              <span className="status-badge-text">GLOBAL OPS: ALL NODES ACTIVE</span>
            </div>
          </div>

          {/* Col 2: Shipped Deployments */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Shipped Systems</h4>
            <ul className="footer-links-list">
              <li>
                <a href="https://zynara.netlify.app" target="_blank" rel="noopener noreferrer" className="footer-link-item">
                  <span>Zynara E-Commerce</span>
                  <ExternalLink size={12} className="ext-icon" />
                </a>
              </li>
              <li>
                <a href="https://shubhsafar.netlify.app/#browse" target="_blank" rel="noopener noreferrer" className="footer-link-item">
                  <span>Shubh Safar Mobility</span>
                  <ExternalLink size={12} className="ext-icon" />
                </a>
              </li>
              <li>
                <a href="https://cheatmeals.netlify.app" target="_blank" rel="noopener noreferrer" className="footer-link-item">
                  <span>Cheat Meals Food Tech</span>
                  <ExternalLink size={12} className="ext-icon" />
                </a>
              </li>
              <li>
                <a href="https://autoshinewash.netlify.app" target="_blank" rel="noopener noreferrer" className="footer-link-item">
                  <span>AutoShine Detailing</span>
                  <ExternalLink size={12} className="ext-icon" />
                </a>
              </li>
              <li>
                <a href="https://aheeramilk.netlify.app/" target="_blank" rel="noopener noreferrer" className="footer-link-item">
                  <span>Aheera Milk Agritech</span>
                  <ExternalLink size={12} className="ext-icon" />
                </a>
              </li>
              <li>
                <a href="https://aheerastore.netlify.app/" target="_blank" rel="noopener noreferrer" className="footer-link-item">
                  <span>Aheera Store Admin</span>
                  <ExternalLink size={12} className="ext-icon" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Capabilities & Studio */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Platform & Studio</h4>
            <ul className="footer-links-list">
              <li><a href="#about" className="footer-link-item">Studio Philosophy</a></li>
              <li><a href="#capabilities" className="footer-link-item">Agentic Capabilities</a></li>
              <li><a href="#demo" className="footer-link-item">Industry Command Center</a></li>
              <li><a href="#process" className="footer-link-item">4-Stage Deployment</a></li>
              <li><a href="#pricing" className="footer-link-item">Engagement Tiers</a></li>
              <li><a href="#faq" className="footer-link-item">Technical FAQ</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="footer-col">
            <h4 className="footer-col-heading">Connect & Security</h4>
            <div className="footer-contact-info">
              <a href="mailto:hello@tensorloom.ai" className="footer-email-link">
                <Mail size={14} color="var(--coral)" />
                <span>hello@tensorloom.ai</span>
              </a>
              <div className="footer-security-pill">
                <ShieldCheck size={14} color="var(--emerald)" />
                <span>SOC-2 & GDPR COMPLIANT</span>
              </div>
            </div>

            <div className="footer-social-row">
              <a 
                href="https://github.com/AheeraLimited/TensorLoom-AI" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-btn"
                title="GitHub"
              >
                <GithubIcon size={16} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-btn"
                title="LinkedIn"
              >
                <LinkedinIcon size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-social-btn"
                title="Twitter / X"
              >
                <TwitterIcon size={16} />
              </a>
              <a 
                href="mailto:hello@tensorloom.ai" 
                className="footer-social-btn"
                title="Email Studio"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Telemetry & Back to Top */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <span>© {year} TensorLoom AI Inc. All rights reserved.</span>
            <span className="footer-bullet">•</span>
            <span className="footer-sub-tag">Woven with precision on light neural canvas</span>
          </div>

          <div className="footer-bottom-right">
            <div className="footer-telemetry-chip">
              <Globe size={12} color="var(--sky)" />
              <span>EDGE LATENCY: 14MS</span>
            </div>

            <button onClick={scrollToTop} className="footer-back-to-top" title="Back to top">
              <span>Top</span>
              <ChevronUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
