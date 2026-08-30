import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, Car, UtensilsCrossed, Droplets, Milk, Sparkles, MessageSquare, 
  ArrowRight, CheckCircle2, ExternalLink, ArrowUpRight, Workflow, Lock, Store, Layers, ChevronRight,
  Smartphone, Monitor, Compass, Layout, Code2, Rocket
} from 'lucide-react'
import './ProjectsShowcase.css'

import { CATEGORIES, PROJECTS } from '../data/projectsData.js'

const STEP_ICONS = [Compass, Layout, Code2, Rocket]

export default function ProjectsShowcase({ onOpenProjectModal }) {
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [selectedId, setSelectedId] = useState(PROJECTS[0].id)
  const [userDeviceMode, setUserDeviceMode] = useState(null)
  const [zynaraRefreshCount, setZynaraRefreshCount] = useState(0)

  // 3.8s background auto-reload timer for Zynara
  useEffect(() => {
    if (selectedId !== 'zynara') return
    const timer = setInterval(() => {
      setZynaraRefreshCount((prev) => prev + 1)
    }, 3800)
    return () => clearInterval(timer)
  }, [selectedId])

  const filteredProjects = activeCategory === 'All Projects'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory)

  const activeProject = PROJECTS.find((p) => p.id === selectedId) || PROJECTS[0]
  const activeView = userDeviceMode || 'desktop'
  const ActiveIcon = activeProject.icon

  return (
    <section id="projects" className="tl-section projects-section">
      <div className="tl-shell">
        {/* Section Header */}
        <div className="projects-header">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>OUR LIVE PROJECTS</span>
          </div>
          <h2 className="projects-title">
            Real apps and websites <br />
            <span className="text-gradient-n8n">we've built and launched.</span>
          </h2>
          <p className="projects-subtitle">
            Click any project below to explore the live website directly inside the browser window or open it in a new tab.
          </p>

          {/* Category Filter Pills */}
          <div className="projects-category-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`proj-cat-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat)
                  const matches = cat === 'All Projects' ? PROJECTS : PROJECTS.filter((p) => p.category === cat)
                  if (matches.length > 0 && !matches.find((m) => m.id === selectedId)) {
                    setSelectedId(matches[0].id)
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dual-Panel Showcase Cockpit */}
        <div className="projects-showcase-split">
          {/* Left Column: Project Selector Cards (Styled like Process Cards) */}
          <div className="projects-selector-list">
            {filteredProjects.map((proj, idx) => {
              const isSelected = proj.id === activeProject.id
              const IconComp = proj.icon
              return (
                <motion.div
                  key={proj.id}
                  className={`proj-card-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedId(proj.id)}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.22 }}
                >
                  {/* Top Row: Icon Badge + Category & Active Status */}
                  <div className="proj-card-top">
                    <div 
                      className="proj-icon-badge" 
                      style={{ 
                        color: proj.color,
                        background: `${proj.color}15`,
                        borderColor: `${proj.color}35`
                      }}
                    >
                      <IconComp size={20} />
                    </div>

                    <div className="proj-phase-row">
                      <span className="proj-phase-pill" style={{ color: isSelected ? proj.color : 'var(--ink-faint)' }}>
                        {proj.category}
                      </span>
                      {isSelected && (
                        <span className="proj-active-status" style={{ color: proj.color }}>
                          <span className="pulse-dot" style={{ background: proj.color }} />
                          ACTIVE
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Middle Body: Bold Project Title & Tagline */}
                  <div className="proj-card-middle">
                    <h4 className="proj-title">{proj.name}</h4>
                    <p className="proj-summary">{proj.tagline}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right Column: Live Interactive System Cockpit with Minimal Glassmorphism */}
          <div className="projects-cockpit-viewer">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="cockpit-viewer-card"
              >
                {/* Dynamic Ambient Background Glow */}
                <div 
                  className="cockpit-glow-backdrop" 
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${activeProject.color}14 0%, transparent 68%)` }} 
                />

                {/* Cockpit Top Bar */}
                <div className="viewer-header-bar">
                  <div className="viewer-brand-badge">
                    <div 
                      className="viewer-icon-pill" 
                      style={{ 
                        background: `${activeProject.color}14`, 
                        borderColor: `${activeProject.color}30`,
                        color: activeProject.color 
                      }}
                    >
                      <ActiveIcon size={20} />
                    </div>
                    <div>
                      <span className="viewer-badge-text" style={{ color: activeProject.color }}>
                        {activeProject.badge}
                      </span>
                      <h3 className="viewer-project-title">{activeProject.name}</h3>
                    </div>
                  </div>

                  <div className="viewer-status-pill">
                    <span className="pulse-dot dot-emerald" />
                    <span>ALL SYSTEMS OPERATIONAL</span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="viewer-tagline">{activeProject.tagline}</p>

                {/* Live App / Website iFrame Window (Frosted Glass Chrome Bar) */}
                <div className="live-preview-window">
                  {/* Browser Window Chrome Bar */}
                  <div className="preview-window-bar">
                    <div className="preview-window-dots">
                      <span className="p-dot red" />
                      <span className="p-dot yellow" />
                      <span className="p-dot green" />
                    </div>

                    <a 
                      href={activeProject.targetUrl}
                      target={activeProject.targetUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="preview-url-box"
                      title="Click to open live URL in a new tab"
                    >
                      <Lock size={11} color="#10b981" />
                      <span className="preview-url-text">{activeProject.demoDomain}</span>
                    </a>

                    {/* Responsive Device View Switcher */}
                    <div className="preview-device-switch">
                      <button 
                        className={`device-btn ${activeView === 'desktop' ? 'active' : ''}`}
                        onClick={() => setUserDeviceMode('desktop')}
                        title="Desktop View"
                        aria-label="Desktop View"
                      >
                        <Monitor size={12} />
                        <span>Desktop</span>
                      </button>
                      <button 
                        className={`device-btn ${activeView === 'mobile' ? 'active' : ''}`}
                        onClick={() => setUserDeviceMode('mobile')}
                        title="Mobile App View"
                        aria-label="Mobile View"
                      >
                        <Smartphone size={12} />
                        <span>Mobile</span>
                      </button>
                    </div>

                    <a 
                      href={activeProject.targetUrl} 
                      target={activeProject.targetUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="preview-direct-launch-link"
                      title="Open Live Website in New Tab"
                    >
                      <span>Open Live Site</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  {/* Live Interactive iFrame Feed Stage */}
                  <div className={`preview-iframe-stage ${activeView === 'mobile' ? 'mode-mobile-stage' : 'mode-desktop-stage'}`}>
                    {activeProject.targetUrl.startsWith('http') ? (
                      activeView === 'mobile' ? (
                        <div className="mobile-device-chassis">
                          <div className="phone-island-notch" />
                          <iframe
                            key={activeProject.id === 'zynara' ? `zynara-mobile-${zynaraRefreshCount}` : `${activeProject.id}-mobile`}
                            src={activeProject.targetUrl}
                            title={`${activeProject.name} Live Web Feed`}
                            className="live-mobile-iframe"
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          />
                        </div>
                      ) : (
                        <div className="desktop-device-chassis">
                          <iframe
                            key={activeProject.id === 'zynara' ? `zynara-desktop-${zynaraRefreshCount}` : `${activeProject.id}-desktop`}
                            src={activeProject.targetUrl}
                            title={`${activeProject.name} Live Web Feed`}
                            className="live-desktop-iframe"
                            loading="lazy"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          />
                        </div>
                      )
                    ) : (
                      <div className="preview-fallback-box">
                        <MessageSquare size={32} color="var(--coral)" />
                        <h4>WhatsApp CRM & AI Bot</h4>
                        <p>Automate customer conversations, inquiries & bills 24/7.</p>
                        <a href="#contact" className="tl-btn tl-btn-primary">Talk to Us</a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Minimal Glassmorphic Metrics Strip */}
                <div className="viewer-metrics-grid">
                  {activeProject.metrics.map((m) => (
                    <div key={m.label} className="viewer-metric-item">
                      <span className="v-metric-val" style={{ color: activeProject.color }}>{m.val}</span>
                      <span className="v-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Workflow Node Graph */}
                <div className="viewer-architecture-box">
                  <div className="v-arch-header">
                    <div className="v-arch-title">
                      <Workflow size={14} color="var(--coral)" />
                      <span>HOW THIS SYSTEM WORKS</span>
                    </div>
                    <span className="v-arch-sub">4-Step Workflow</span>
                  </div>

                  <div className="v-arch-nodes-track">
                    {activeProject.nodes.map((node) => (
                      <div key={node.name} className="v-arch-node-item">
                        <div className="v-arch-node-top">
                          <span className="v-arch-node-num">{node.step}</span>
                        </div>
                        <h5 className="v-arch-node-name">{node.name}</h5>
                        <p className="v-arch-node-desc">{node.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights & Stack Split Grid */}
                <div className="viewer-details-grid">
                  {/* Left Box: Key Features & Benefits */}
                  <div className="viewer-detail-card">
                    <h4 className="v-detail-heading">
                      <Sparkles size={15} color="var(--coral)" />
                      <span>Key Features & Benefits</span>
                    </h4>
                    <ul className="v-detail-checklist">
                      {activeProject.highlights.map((h, i) => (
                        <li key={i} className="v-checklist-item">
                          <CheckCircle2 size={16} color="var(--emerald)" className="check-icon" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Box: Tech Stack */}
                  <div className="viewer-detail-card">
                    <h4 className="v-detail-heading">
                      <Layers size={15} color="var(--sky)" />
                      <span>Technologies & Tools</span>
                    </h4>
                    <div className="v-tech-pills-wrap">
                      {activeProject.tech.map((t) => (
                        <span key={t} className="v-tech-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Full-Width Luxury Frosted Glass Launch Callout */}
                <div className="v-launch-callout">
                  <div className="launch-callout-content">
                    <div className="launch-callout-icon-box">
                      <Sparkles size={18} color="var(--coral)" />
                    </div>
                    <div className="launch-callout-text-wrap">
                      <h5 className="launch-callout-title">Want a custom platform like this for your business?</h5>
                      <p className="launch-callout-text">
                        We can customize, build, and deploy this tailored to your exact workflows in 2–3 weeks.
                      </p>
                    </div>
                  </div>
                  <a href="#contact" className="tl-btn tl-btn-primary launch-cta-btn">
                    <span>Start a Project</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
