import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, Car, UtensilsCrossed, Droplets, Sparkles, MessageSquare, 
  ArrowRight, CheckCircle2, Cpu, ExternalLink, Activity, Shield, Zap, Layers,
  ChevronRight, ArrowUpRight, Workflow, Lock, Store
} from 'lucide-react'
import './ProjectsShowcase.css'

const CATEGORIES = [
  'All Projects',
  'E-Commerce',
  'Car Rental & GPS',
  'Food Delivery',
  'Dairy & Subscription',
  'Auto Services',
  'WhatsApp Bots'
]

const PROJECTS = [
  {
    id: 'zynara',
    name: 'Zynara',
    category: 'E-Commerce',
    badge: 'LUXURY ONLINE SHOPPING',
    icon: ShoppingBag,
    color: '#ff6d42',
    demoDomain: 'https://zynara.netlify.app',
    targetUrl: 'https://zynara.netlify.app',
    tagline: 'Modern luxury fashion store with instant checkout, dynamic product variations, and interactive lookbooks.',
    metrics: [
      { label: 'Page Speed', val: '< 1.2s' },
      { label: 'Product Options', val: '100% Dynamic' },
      { label: 'Sales Increase', val: '+42%' }
    ],
    tech: ['Next.js 14', 'Smooth Animations', 'Live Cart Drawer', 'Instant Checkout', 'Mobile First Design'],
    nodes: [
      { step: '01', name: 'Browse Store', desc: 'Curated seasonal lookbooks & zoom' },
      { step: '02', name: 'Select Options', desc: 'Real-time stock & price update' },
      { step: '03', name: 'Instant Pay', desc: 'One-click secure UPI & cards' },
      { step: '04', name: 'Order Dispatch', desc: 'Instant WhatsApp confirmation' }
    ],
    highlights: [
      'Smooth floating shopping bag with instant coupon discount calculations',
      'High-resolution multi-photo product galleries with pinch-to-zoom on mobile',
      'Curated seasonal collections with quick one-click add to cart',
      'Fast page loading under 1.2 seconds designed specifically for mobile shoppers'
    ]
  },
  {
    id: 'shubh-safar',
    name: 'Shubh Safar',
    category: 'Car Rental & GPS',
    badge: 'CAR RENTAL & LIVE GPS FLEET',
    icon: Car,
    color: '#0284c7',
    demoDomain: 'https://shubhsafar.netlify.app/#browse',
    targetUrl: 'https://shubhsafar.netlify.app/#browse',
    tagline: 'Self-drive car booking platform with live GPS road route tracking and driver dashboards.',
    metrics: [
      { label: 'GPS Tracking', val: 'Live Maps' },
      { label: 'ID Verification', val: 'Instant KYC' },
      { label: 'Booking Time', val: '< 2 Mins' }
    ],
    tech: ['Interactive Road Maps', 'Live GPS Routes', 'Online ID Verification', 'Driver Login PIN', 'Automatic PDF Invoices'],
    nodes: [
      { step: '01', name: 'Browse Cars', desc: 'Filter by sedan, SUV & availability' },
      { step: '02', name: 'Verify ID', desc: 'Instant Aadhaar & license check' },
      { step: '03', name: 'GPS Route Map', desc: 'Real-time road ETA & distance' },
      { step: '04', name: 'Return OTP', desc: 'Trip complete & automatic bill' }
    ],
    highlights: [
      'Live road route maps with accurate arrival times across city landmarks',
      'Instant online ID verification for Aadhaar and Driving Licenses',
      'Easy PIN-login portals for drivers, car owners, and store managers',
      'Secure return OTP verification with instant PDF rental bills'
    ]
  },
  {
    id: 'cheat-meals',
    name: 'Cheat Meals',
    category: 'Food Delivery',
    badge: 'FOOD DELIVERY & KITCHEN ORDERS',
    icon: UtensilsCrossed,
    color: '#ea4b71',
    demoDomain: 'https://cheatmeals.netlify.app',
    targetUrl: 'https://cheatmeals.netlify.app',
    tagline: 'Live restaurant order system with kitchen screen alerts and real-time delivery tracking.',
    metrics: [
      { label: 'Order Sync', val: 'Real-Time' },
      { label: 'Kitchen Screen', val: 'Auto Chimes' },
      { label: 'Delivery OTP', val: '100% Secure' }
    ],
    tech: ['Instant Cloud Sync', 'Live Kitchen Screen', 'Sound Chime Alerts', 'Live Delivery Tracker', 'Delivery Rider App'],
    nodes: [
      { step: '01', name: 'Customer Cart', desc: 'Custom meal add-ons & instructions' },
      { step: '02', name: 'Kitchen Screen', desc: 'Sound chime rings in the kitchen' },
      { step: '03', name: 'Live Rider Map', desc: 'Rider picks up & heads to address' },
      { step: '04', name: 'Doorstep OTP', desc: 'Secure handoff & order complete' }
    ],
    highlights: [
      'Instant order stream with sound chime alerts for kitchen staff',
      'Live delivery progress screen showing your delivery rider in motion',
      'Multi-branch restaurant support with secret OTP verification upon delivery',
      'Special food customization options and instant discounts'
    ]
  },
  {
    id: 'autoshine',
    name: 'AutoShine',
    category: 'Auto Services',
    badge: 'DOORSTEP VEHICLE DETAILING',
    icon: Sparkles,
    color: '#7c3aed',
    demoDomain: 'https://autoshinewash.netlify.app',
    targetUrl: 'https://autoshinewash.netlify.app',
    tagline: 'Doorstep car wash and ceramic coating booking with instant time-slot scheduling.',
    metrics: [
      { label: 'Car Pricing', val: 'Clear Rates' },
      { label: 'Slot Booking', val: 'Instant' },
      { label: 'Customer Rating', val: '5.0 ★ Stars' }
    ],
    tech: ['Car Model Pricing Matrix', 'Calendar Time Slots', 'Doorstep Field Dispatch', 'Online & Cash Payments'],
    nodes: [
      { step: '01', name: 'Select Vehicle', desc: 'Hatchback, sedan, SUV or luxury' },
      { step: '02', name: 'Choose Service', desc: 'Deep foam wash, polish, ceramic' },
      { step: '03', name: 'Book Time Slot', desc: 'Pick preferred date and hour' },
      { step: '04', name: 'Technician Visit', desc: 'Doorstep arrival & digital report' }
    ],
    highlights: [
      'Clear, transparent pricing based on vehicle type (Hatchback, Sedan, SUV, Luxury)',
      'Custom service package builder (Foam Wash, Interior Sanitization, Ceramic Coating)',
      'Real-time date and time-slot booking with doorstep technician assignment',
      'Digital inspection report and clear progress updates'
    ]
  },
  {
    id: 'aheera-milk',
    name: 'Aheera Milk',
    category: 'Dairy & Subscription',
    badge: 'DAILY DAIRY SUBSCRIPTION',
    icon: Droplets,
    color: '#10b981',
    demoDomain: 'https://aheeramilk.netlify.app',
    targetUrl: 'https://aheeramilk.netlify.app/',
    tagline: 'Daily farm-fresh milk subscription app with morning delivery route sheets and WhatsApp bills.',
    metrics: [
      { label: 'Delivery Speed', val: 'Morning 6 AM' },
      { label: 'Auto Billing', val: 'WhatsApp UPI' },
      { label: 'App Reliability', val: '99.99%' }
    ],
    tech: ['Mobile Web App (PWA)', 'Calendar Subscriptions', 'Delivery Route Organizer', 'WhatsApp Billing Bot', 'UPI QR Codes'],
    nodes: [
      { step: '01', name: 'Daily Plan', desc: 'Set milk quantity & delivery days' },
      { step: '02', name: 'Route Sheet', desc: 'Driver gets morning map sheet' },
      { step: '03', name: 'Bottle Tally', desc: 'Log deliveries & empty bottle return' },
      { step: '04', name: 'WhatsApp Bill', desc: 'Monthly bill with one-tap UPI link' }
    ],
    highlights: [
      'Flexible daily or alternate-day milk schedule with one-tap vacation pause',
      'Automated morning delivery route sheets organized per delivery agent',
      'Automatic monthly WhatsApp bill generation with one-click UPI payment links',
      'Bottle return tracking and complete delivery history'
    ]
  },
  {
    id: 'aheera-store',
    name: 'Aheera Store',
    category: 'Dairy & Subscription',
    badge: 'STORE MANAGER & INVOICING',
    icon: Store,
    color: '#059669',
    demoDomain: 'https://aheerastore.netlify.app',
    targetUrl: 'https://aheerastore.netlify.app/',
    tagline: 'Centralized dairy store management, customer balance ledgers, and WhatsApp billing.',
    metrics: [
      { label: 'Billing Bot', val: 'Auto WhatsApp' },
      { label: 'Balance Audit', val: '100% Accurate' },
      { label: 'Sync Speed', val: 'Instant' }
    ],
    tech: ['Store Dashboard', 'Customer Balance Ledger', 'WhatsApp Business Bot', 'UPI QR Generator', 'Route Allocation'],
    nodes: [
      { step: '01', name: 'Customer List', desc: 'Live account balances & history' },
      { step: '02', name: 'Assign Routes', desc: 'Driver allocation & bottle crates' },
      { step: '03', name: 'Send Invoices', desc: 'Auto WhatsApp PDF & UPI payment' },
      { step: '04', name: 'Reconcile', desc: 'Instant balance ledger updates' }
    ],
    highlights: [
      'One-click automated WhatsApp billing with embedded instant UPI payment links',
      'Early morning route allocation matrix and driver bottle tally logs',
      'Multi-customer balance ledger with historical transaction audit',
      'Instant cloud synchronization between customer app and store admin hub'
    ]
  },
  {
    id: 'whatsapp-crm',
    name: 'WhatsApp CRM Bot',
    category: 'WhatsApp Bots',
    badge: 'AUTOMATED WHATSAPP BOT',
    icon: MessageSquare,
    color: '#f59e0b',
    demoDomain: 'https://crm.tensorloom.ai/inbox',
    targetUrl: '#contact',
    tagline: 'Automated WhatsApp assistant that answers customer questions, captures leads, and shares bills 24/7.',
    metrics: [
      { label: 'Reply Speed', val: '< 1 Second' },
      { label: 'Lead Capture', val: '24/7 Auto' },
      { label: 'Daily Capacity', val: '10k+ Chats' }
    ],
    tech: ['Official WhatsApp API', '24/7 Auto Replies', 'Shared Team Inbox', 'Lead Management', 'Customer Tags'],
    nodes: [
      { step: '01', name: 'New Message', desc: 'Customer reaches out on WhatsApp' },
      { step: '02', name: 'Smart Reply', desc: 'AI answers catalog, price & hours' },
      { step: '03', name: 'Staff Handoff', desc: 'Alerts team for complex inquiries' },
      { step: '04', name: 'Auto Updates', desc: 'Order alerts & follow-up messages' }
    ],
    highlights: [
      '24/7 automatic answers for common customer questions, pricing, and orders',
      'Unified shared team inbox so your whole staff can reply from one number',
      'Automatic customer contact saving and organized tag segmentation',
      'Instant order status updates and automated payment reminder messages'
    ]
  }
]

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [selectedId, setSelectedId] = useState(PROJECTS[0].id)
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
          {/* Left Column: Project Selector Cards */}
          <div className="projects-selector-list">
            {filteredProjects.map((proj) => {
              const isSelected = proj.id === activeProject.id
              const IconComp = proj.icon
              return (
                <motion.div
                  key={proj.id}
                  className={`proj-card-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedId(proj.id)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Top Row: Icon + Name & Category + Status */}
                  <div className="proj-card-header-row">
                    <div 
                      className="proj-icon-box" 
                      style={{ 
                        background: `${proj.color}15`, 
                        borderColor: `${proj.color}35`,
                        color: proj.color 
                      }}
                    >
                      <IconComp size={18} />
                    </div>

                    <div className="proj-title-stack">
                      <div className="proj-name-cat-line">
                        <span className="proj-name">{proj.name}</span>
                        <span className="proj-category-pill" style={{ color: isSelected ? proj.color : 'inherit' }}>
                          {proj.category}
                        </span>
                      </div>
                    </div>

                    <div className="proj-status-box">
                      {isSelected ? (
                        <div className="proj-active-pill" style={{ background: `${proj.color}15`, color: proj.color, borderColor: `${proj.color}30` }}>
                          <span className="pulse-dot" style={{ background: proj.color }} />
                          <span>Active</span>
                        </div>
                      ) : (
                        <ChevronRight size={15} className="proj-chevron-dim" />
                      )}
                    </div>
                  </div>

                  {/* Middle: Clear 1-Line Value Tagline */}
                  <p className="proj-tagline-text">{proj.tagline}</p>

                  {/* Bottom Row: 2 Performance Metric Chips */}
                  <div className="proj-card-footer-tags">
                    {proj.metrics.slice(0, 2).map((m) => (
                      <span key={m.label} className="proj-metric-chip">
                        <strong style={{ color: isSelected ? proj.color : 'var(--ink-primary)' }}>{m.val}</strong>
                        <span>{m.label}</span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right Column: Live Interactive System Cockpit with Live App Window */}
          <div className="projects-cockpit-viewer">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="cockpit-viewer-card tl-glass"
              >
                {/* Cockpit Top Bar */}
                <div className="viewer-header-bar">
                  <div className="viewer-brand-badge">
                    <div className="viewer-icon-pill" style={{ background: `${activeProject.color}15`, color: activeProject.color }}>
                      <ActiveIcon size={20} />
                    </div>
                    <div>
                      <span className="viewer-badge-text" style={{ color: activeProject.color }}>
                        {activeProject.badge}
                      </span>
                      <h3 className="viewer-project-title">{activeProject.name}</h3>
                    </div>
                  </div>

                  <div className="viewer-actions-row">
                    <div className="viewer-status-pill">
                      <span className="pulse-dot dot-emerald" />
                      <span>LIVE SYSTEM ACTIVE</span>
                    </div>

                    <a 
                      href={activeProject.targetUrl} 
                      target={activeProject.targetUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="viewer-visit-btn tl-btn"
                    >
                      <span>Visit Site</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>

                {/* Tagline */}
                <p className="viewer-tagline">{activeProject.tagline}</p>

                {/* Live App / Website iFrame Window */}
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
                      title="Click to visit live URL in new tab"
                    >
                      <Lock size={11} color="#10b981" />
                      <span className="preview-url-text">{activeProject.demoDomain}</span>
                    </a>

                    <div className="preview-bar-actions">
                      <span className="preview-live-badge">
                        <span className="pulse-dot dot-emerald" />
                        <span>LIVE FEED</span>
                      </span>
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
                  </div>

                  {/* Live Interactive iFrame Feed Container */}
                  <div className="preview-iframe-container">
                    {activeProject.targetUrl.startsWith('http') ? (
                      <iframe
                        key={activeProject.id === 'zynara' ? `zynara-feed-${zynaraRefreshCount}` : activeProject.targetUrl}
                        src={activeProject.targetUrl}
                        title={`${activeProject.name} Live Web Feed`}
                        className="live-app-iframe"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      />
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

                {/* Key Verified Metrics Strip */}
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

                  {/* Right Box: Tech Stack & Launch Callout */}
                  <div className="viewer-detail-card">
                    <h4 className="v-detail-heading">
                      <Layers size={15} color="var(--sky)" />
                      <span>Technologies Used</span>
                    </h4>
                    <div className="v-tech-pills-wrap">
                      {activeProject.tech.map((t) => (
                        <span key={t} className="v-tech-pill">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="v-launch-callout">
                      <h5 className="launch-callout-title">Want a similar platform for your business?</h5>
                      <p className="launch-callout-text">We can customize and launch this tailored to your brand in 2-3 weeks.</p>
                      <a href="#contact" className="tl-btn tl-btn-primary launch-cta-btn">
                        <span>Start a Project</span>
                        <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
