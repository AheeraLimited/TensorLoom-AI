import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, Car, UtensilsCrossed, Droplets, Sparkles, MessageSquare, 
  ArrowRight, CheckCircle2, Cpu, ExternalLink, Activity, Shield, Zap, Layers,
  ChevronRight, ArrowUpRight, Workflow, Lock, Play, Eye, Compass, Store, RefreshCw
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
    tagline: 'Modern luxury fashion store with instant checkout and dynamic product lookbooks.',
    metrics: [
      { label: 'Page Speed', val: '< 1.2s' },
      { label: 'Product Options', val: '100% Dynamic' },
      { label: 'Sales Increase', val: '+42%' }
    ],
    tech: ['Fast Next.js', 'Smooth Animations', 'Live Cart Drawer', 'Instant Checkout', 'Mobile First'],
    nodes: [
      { name: '1. Storefront', type: 'Browse', desc: 'Curated Lookbooks' },
      { name: '2. Select Item', type: 'Cart', desc: 'Live Stock Check' },
      { name: '3. Fast Pay', type: 'Checkout', desc: 'Secure UPI & Card' },
      { name: '4. Instant Order', type: 'Dispatch', desc: 'WhatsApp Confirmation' }
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
      { name: '1. Browse Cars', type: 'Selection', desc: 'Live Availability' },
      { name: '2. Verify ID', type: 'Security', desc: 'Instant Driving License' },
      { name: '3. GPS Route', type: 'Live Map', desc: 'Road ETA & Distance' },
      { name: '4. Return OTP', type: 'Completion', desc: 'Instant PDF Bill' }
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
      { name: '1. Customer Cart', type: 'Order', desc: 'Custom Add-ons & Notes' },
      { name: '2. Kitchen Ring', type: 'Kitchen', desc: 'Sound Alert on Screen' },
      { name: '3. Live Map', type: 'Delivery', desc: 'Rider Heading to You' },
      { name: '4. Doorstep OTP', type: 'Handoff', desc: 'Delivered & Confirmed' }
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
    tech: ['Car Model Pricing', 'Calendar Time Slots', 'Doorstep Technician Dispatch', 'Online & Cash Payments'],
    nodes: [
      { name: '1. Pick Vehicle', type: 'Model', desc: 'Hatchback, Sedan, SUV' },
      { name: '2. Choose Package', type: 'Service', desc: 'Wash, Deep Clean, Polish' },
      { name: '3. Select Time', type: 'Calendar', desc: 'Choose Date & Hour' },
      { name: '4. Technician Arrival', type: 'Doorstep', desc: 'Live Status Tracker' }
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
      { name: '1. Daily Plan', type: 'Schedule', desc: 'Set Quantity & Days' },
      { name: '2. Route Sheet', type: 'Delivery', desc: 'Optimized Route' },
      { name: '3. Bottle Count', type: 'Ledger', desc: 'Track Deliveries & Returns' },
      { name: '4. WhatsApp Bill', type: 'Payment', desc: 'Instant UPI Payment Link' }
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
      { name: '1. Customer List', type: 'Balances', desc: 'Live Account Ledger' },
      { name: '2. Assign Routes', type: 'Logistics', desc: 'Driver Route Sheets' },
      { name: '3. Send Bills', type: 'WhatsApp', desc: 'Auto PDF & UPI Link' },
      { name: '4. Match Payments', type: 'Clearance', desc: 'Instant Balance Update' }
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
      { name: '1. Message Received', type: 'Intake', desc: 'Instant Notification' },
      { name: '2. Smart Reply', type: 'AI Bot', desc: 'Answers Inquiries 24/7' },
      { name: '3. Team Inbox', type: 'Staff', desc: 'Human Staff Handoff' },
      { name: '4. Auto Follow-up', type: 'Updates', desc: 'Offers & Reminders' }
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
                  className={`proj-card-item tl-glass ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedId(proj.id)}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="proj-card-top">
                    <div className="proj-icon-box" style={{ background: `${proj.color}12`, color: proj.color }}>
                      <IconComp size={18} />
                    </div>
                    <span className="proj-category-tag">{proj.category}</span>
                    <ChevronRight 
                      size={15} 
                      className={`proj-arrow-indicator ${isSelected ? 'visible' : ''}`} 
                    />
                  </div>

                  <h3 className="proj-name">{proj.name}</h3>
                  <p className="proj-desc">{proj.tagline}</p>

                  <div className="proj-metric-preview">
                    {proj.metrics.slice(0, 2).map((m) => (
                      <span key={m.label} className="proj-micro-badge">
                        <strong>{m.val}</strong> {m.label}
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
                      <ActiveIcon size={18} />
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
                      <span>Visit Live Website</span>
                      <ArrowUpRight size={14} />
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
                      <Workflow size={13} color="var(--coral)" />
                      <span>HOW THIS SYSTEM WORKS</span>
                    </div>
                    <span className="v-arch-sub">4-Step Flow</span>
                  </div>

                  <div className="v-arch-nodes-track">
                    {activeProject.nodes.map((node, i) => (
                      <div key={node.name} className="v-arch-node-item">
                        <div className="v-arch-node-circle" style={{ borderColor: i === 0 ? activeProject.color : 'var(--line)' }}>
                          <span className="v-arch-node-num">0{i + 1}</span>
                        </div>
                        <div className="v-arch-node-text">
                          <span className="v-arch-node-name">{node.name}</span>
                          <span className="v-arch-node-desc">{node.desc}</span>
                        </div>
                        {i < activeProject.nodes.length - 1 && (
                          <div className="v-arch-connector-arrow">
                            <ChevronRight size={14} color="var(--ink-faint)" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highlights & Stack Grid */}
                <div className="viewer-details-grid">
                  {/* Highlights Card */}
                  <div className="viewer-detail-card">
                    <h4 className="v-detail-heading">
                      <Sparkles size={14} color="var(--coral)" />
                      <span>Key Features & Benefits</span>
                    </h4>
                    <ul className="v-detail-checklist">
                      {activeProject.highlights.map((h, i) => (
                        <li key={i} className="v-checklist-item">
                          <CheckCircle2 size={14} color="var(--emerald)" className="check-icon" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Card */}
                  <div className="viewer-detail-card">
                    <h4 className="v-detail-heading">
                      <Layers size={14} color="var(--sky)" />
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
                      <span className="launch-callout-title">Want a similar platform for your business?</span>
                      <p className="launch-callout-text">We can customize and launch this tailored to your brand in 2-3 weeks.</p>
                      <a href="#contact" className="tl-btn tl-btn-primary launch-cta-btn">
                        <span>Get Started</span>
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
