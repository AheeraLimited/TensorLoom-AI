import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, Car, UtensilsCrossed, Droplets, Sparkles, MessageSquare, 
  ArrowRight, CheckCircle2, Cpu, ExternalLink, Activity, Shield, Zap, Layers,
  ChevronRight, ArrowUpRight, Workflow, Lock, Play, Eye, Compass, Store, RefreshCw
} from 'lucide-react'
import './ProjectsShowcase.css'

const CATEGORIES = [
  'All Systems',
  'E-Commerce',
  'Mobility & Logistics',
  'Food Tech',
  'Agritech & Delivery',
  'Automotive Services',
  'Conversational AI'
]

const PROJECTS = [
  {
    id: 'zynara',
    name: 'Zynara',
    category: 'E-Commerce',
    badge: 'LUXURY E-COMMERCE & RETAIL',
    icon: ShoppingBag,
    color: '#ff6d42',
    demoDomain: 'https://zynara.netlify.app',
    targetUrl: 'https://zynara.netlify.app',
    tagline: 'High-end contemporary e-commerce storefront & retail intelligence platform.',
    metrics: [
      { label: 'Checkout Speed', val: '< 1.2s' },
      { label: 'Variant Matrix', val: '100% Dynamic' },
      { label: 'Conversion Lift', val: '+42%' }
    ],
    tech: ['Next.js 14', 'Framer Motion', 'Dynamic Variant Engine', 'Express Checkout', 'Tailwind'],
    nodes: [
      { name: 'Storefront Client', type: 'UI / UX', desc: 'Curated Lookbooks' },
      { name: 'Variant Matrix', type: 'Logic Engine', desc: 'Realtime Stock' },
      { name: 'Stripe / UPI', type: 'Payment Gate', desc: 'Sub-second Auth' },
      { name: 'Order Dispatch', type: 'Fulfillment', desc: 'Instant Confirmation' }
    ],
    highlights: [
      'Frictionless floating cart drawer with real-time promo coupon calculations',
      'High-resolution multi-angle product gallery with smooth responsive zoom',
      'Curated seasonal lookbooks with instant one-click add-to-bag',
      'Sub-second page transitions and mobile-first luxury typography'
    ]
  },
  {
    id: 'shubh-safar',
    name: 'Shubh Safar',
    category: 'Mobility & Logistics',
    badge: 'MOBILITY & FLEET LOGISTICS',
    icon: Car,
    color: '#0284c7',
    demoDomain: 'https://shubhsafar.netlify.app/#browse',
    targetUrl: 'https://shubhsafar.netlify.app/#browse',
    tagline: 'Self-drive car rental ecosystem with live OSRM GPS road tracking & multi-role operations.',
    metrics: [
      { label: 'Routing Engine', val: 'OSRM GIS' },
      { label: 'KYC Verification', val: '100% Automated' },
      { label: 'Dispatch Latency', val: 'Real-time' }
    ],
    tech: ['Leaflet GIS', 'OSRM Driving Engine', 'Aadhaar / DL KYC', 'Multi-Role PIN Hub', 'PDF Invoice Engine'],
    nodes: [
      { name: 'Fleet Browser', type: 'Booking UI', desc: 'Live Availability' },
      { name: 'KYC Gate', type: 'Verification', desc: 'Aadhaar & License' },
      { name: 'OSRM Routing', type: 'GIS Engine', desc: 'ETA Radar Polylines' },
      { name: 'Driver Hub', type: 'Operations', desc: 'Return OTP & Invoicing' }
    ],
    highlights: [
      'Live road geometry routing with floating ETA radar across city landmarks',
      'Automated KYC verification gate for Aadhaar and Driving Licenses',
      'Dedicated PIN-authenticated operations portal for drivers, owners & admins',
      'Trip completion return OTP verification with instant PDF rental invoices'
    ]
  },
  {
    id: 'cheat-meals',
    name: 'Cheat Meals',
    category: 'Food Tech',
    badge: 'HYPERLOCAL FOOD & LOGISTICS',
    icon: UtensilsCrossed,
    color: '#ea4b71',
    demoDomain: 'https://cheatmeals.netlify.app',
    targetUrl: 'https://cheatmeals.netlify.app',
    tagline: 'Live kitchen queue synchronization, real-time food delivery tracker & fleet ecosystem.',
    metrics: [
      { label: 'Live Sync', val: '0ms Firestore' },
      { label: 'Kitchen KDS', val: 'Automated' },
      { label: 'OTP Handoff', val: '100% Secure' }
    ],
    tech: ['Next.js 14 App Router', 'Firebase Firestore', 'Web Push Alerts', 'Audio Chimes', 'Rider Portal'],
    nodes: [
      { name: 'Storefront Intake', type: 'Customer Cart', desc: 'Custom Add-ons' },
      { name: 'Firestore Feed', type: 'Live Stream', desc: 'Realtime Sync' },
      { name: 'Kitchen KDS', type: 'Prep Queue', desc: 'Audio Chime Alerts' },
      { name: 'Rider Dispatch', type: 'Handoff', desc: 'Secure OTP Handover' }
    ],
    highlights: [
      'Real-time Firestore order stream with audio sound chime alerts',
      'Animated delivery lifecycle tracker with live simulated rider coordinates',
      'Multi-branch kitchen management with instant OTP delivery verification',
      'Rich flash broadcast ribbons and browser push notifications'
    ]
  },
  {
    id: 'autoshine',
    name: 'AutoShine',
    category: 'Automotive Services',
    badge: 'ON-DEMAND VEHICLE CARE',
    icon: Sparkles,
    color: '#7c3aed',
    demoDomain: 'https://autoshinewash.netlify.app',
    targetUrl: 'https://autoshinewash.netlify.app',
    tagline: 'Doorstep vehicle detailing, ceramic coating & on-demand service dispatch engine.',
    metrics: [
      { label: 'Segment Pricing', val: 'Dynamic Matrix' },
      { label: 'Slot Booking', val: 'Real-time' },
      { label: 'Service Quality', val: '5.0 ★ Rated' }
    ],
    tech: ['Vehicle Segment Matrix', 'Time-Slot Scheduler', 'Doorstep Field Dispatch', 'Payment Gateway'],
    nodes: [
      { name: 'Vehicle Match', type: 'Segment Selector', desc: 'Sedan / SUV / Luxury' },
      { name: 'Package Config', type: 'Add-on Engine', desc: 'Ceramic & Deep Clean' },
      { name: 'Slot Scheduler', type: 'Calendar', desc: 'Realtime Availability' },
      { name: 'Field Dispatch', type: 'Technician Hub', desc: 'Live Status Tracker' }
    ],
    highlights: [
      'Interactive vehicle segment pricing matrix (Hatchback, Sedan, SUV, Luxury)',
      'Comprehensive detailing package builder (Ceramic, Interior Sanitization, Paint Correction)',
      'Real-time scheduling with doorstep technician assignment',
      'Transparent digital inspection reports and service milestone tracking'
    ]
  },
  {
    id: 'aheera-milk',
    name: 'Aheera Milk',
    category: 'Agritech & Delivery',
    badge: 'AGRITECH & BILLING LOGISTICS',
    icon: Droplets,
    color: '#10b981',
    demoDomain: 'https://aheeramilk.netlify.app',
    targetUrl: 'https://aheeramilk.netlify.app/',
    tagline: 'Farm-fresh dairy subscription PWA with route optimizer & automated WhatsApp billing.',
    metrics: [
      { label: 'Route Efficiency', val: '+38%' },
      { label: 'Billing Engine', val: 'WhatsApp API' },
      { label: 'PWA Uptime', val: '99.99%' }
    ],
    tech: ['Progressive Web App (PWA)', 'Calendar Subscription', 'Route Optimization', 'WhatsApp Business API', 'UPI Links'],
    nodes: [
      { name: 'Subscription PWA', type: 'Schedule UI', desc: 'Vacation Pause' },
      { name: 'Route Optimizer', type: 'Delivery Math', desc: 'Morning Route Sheet' },
      { name: 'Delivery Log', type: 'Bottle Ledger', desc: 'Volume Tallying' },
      { name: 'WhatsApp Invoicing', type: 'Billing Bot', desc: 'Direct UPI Links' }
    ],
    highlights: [
      'Flexible daily and alternate-day milk subscription manager with vacation pause',
      'Automated morning delivery route sheets optimized per delivery agent',
      'Instant automated WhatsApp bill generation with embedded UPI payment links',
      'Customer bottle return ledger and monthly volume tallying'
    ]
  },
  {
    id: 'aheera-store',
    name: 'Aheera Store',
    category: 'Agritech & Delivery',
    badge: 'STORE ADMIN & BILLING HUB',
    icon: Store,
    color: '#059669',
    demoDomain: 'https://aheerastore.netlify.app',
    targetUrl: 'https://aheerastore.netlify.app/',
    tagline: 'Centralized dairy store operations, customer balance ledgers & WhatsApp UPI invoicing.',
    metrics: [
      { label: 'Billing Engine', val: 'Automated WA' },
      { label: 'Ledger Audit', val: 'Zero-Leak' },
      { label: 'Sync Speed', val: 'Realtime' }
    ],
    tech: ['Storefront Console', 'Customer Balance Ledger', 'WhatsApp Cloud API', 'UPI QR Generator', 'Route Sheets'],
    nodes: [
      { name: 'Customer Registry', type: 'Ledger UI', desc: 'Wallet Balances' },
      { name: 'Route Sheet Engine', type: 'Logistics', desc: 'Agent Allocations' },
      { name: 'WhatsApp Gateway', type: 'API Bot', desc: 'Automated PDF/UPI' },
      { name: 'Payment Reconcile', type: 'Audit Feed', desc: 'Instant Clearance' }
    ],
    highlights: [
      'Automated WhatsApp bill generation with embedded UPI instant payment links',
      'Early morning route allocation matrix and driver bottle tally logs',
      'Multi-customer balance ledger with historical transaction audit',
      'Instant cloud synchronization between customer PWA and store admin hub'
    ]
  },
  {
    id: 'whatsapp-crm',
    name: 'WhatsApp CRM Bot',
    category: 'Conversational AI',
    badge: 'CONVERSATIONAL COMMERCE',
    icon: MessageSquare,
    color: '#f59e0b',
    demoDomain: 'https://crm.tensorloom.ai/inbox',
    targetUrl: '#contact',
    tagline: 'Enterprise WhatsApp business automation, decision tree chatbot & team CRM inbox.',
    metrics: [
      { label: 'Response Time', val: '< 500ms' },
      { label: 'Lead Capture', val: '24/7 Auto' },
      { label: 'Broadcast Scale', val: '10k+ / day' }
    ],
    tech: ['WhatsApp Business API', 'Node.js Microservices', 'Decision Tree Engine', 'Shared Team Inbox', 'Tagging'],
    nodes: [
      { name: 'Incoming Webhook', type: 'API Ingestion', desc: 'WhatsApp Cloud API' },
      { name: 'Intent Matcher', type: 'AI Router', desc: 'Decision Tree Logic' },
      { name: 'Team CRM Inbox', type: 'Multi-Agent', desc: 'Live Chat Handoff' },
      { name: 'Broadcast Engine', type: 'Campaigns', desc: 'Automated Outreach' }
    ],
    highlights: [
      'Automated multi-step customer qualification flows and instant auto-replies',
      'Unified shared team inbox with conversation handoff and agent assignment',
      'Customer segmentation with custom tags and targeted broadcast campaigns',
      'Webhook-driven live CRM event syncing and audit logging'
    ]
  }
]

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState('All Systems')
  const [selectedId, setSelectedId] = useState('zynara')
  const [zynaraRefreshCount, setZynaraRefreshCount] = useState(0)

  // 3.8-second auto-reload loop for Zynara
  useEffect(() => {
    if (selectedId === 'zynara') {
      const interval = setInterval(() => {
        setZynaraRefreshCount((count) => count + 1)
      }, 3800)
      return () => clearInterval(interval)
    }
  }, [selectedId])

  const filteredProjects = activeCategory === 'All Systems'
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
            <span>PROVEN SYSTEMS // LIVE PLATFORMS</span>
          </div>
          <h2 className="projects-title">
            Engineering real-world platforms <br />
            <span className="text-gradient-n8n">across high-stakes industries.</span>
          </h2>
          <p className="projects-subtitle">
            Interact with live deployed web apps and systems directly inside the browser simulator below.
          </p>

          {/* Category Filter Pills */}
          <div className="projects-category-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`proj-cat-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat)
                  const matches = cat === 'All Systems' ? PROJECTS : PROJECTS.filter((p) => p.category === cat)
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
                    <div 
                      className="proj-icon-box"
                      style={{ 
                        background: isSelected ? `${proj.color}15` : '#f4f3ee',
                        color: isSelected ? proj.color : 'var(--ink-secondary)',
                        borderColor: isSelected ? `${proj.color}40` : 'var(--line)'
                      }}
                    >
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
                      <span>PRODUCTION LIVE</span>
                    </div>
                    <a 
                      href={activeProject.targetUrl}
                      target={activeProject.targetUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="viewer-launch-btn tl-btn-primary"
                      title={`Launch ${activeProject.name} in full window`}
                    >
                      <span>Visit Full Website</span>
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
                        <h4>Enterprise WhatsApp CRM Platform</h4>
                        <p>Available on private airgapped deployment.</p>
                        <a href="#contact" className="tl-btn tl-btn-primary">Request Access</a>
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
                      <span>DEPLOYED ARCHITECTURE TOPOLOGY</span>
                    </div>
                    <span className="v-arch-sub">4-Node Pipeline</span>
                  </div>

                  <div className="v-arch-nodes-track">
                    {activeProject.nodes.map((node, i) => (
                      <div key={node.name} className="v-arch-node">
                        <div className="v-node-step-tag">0{i + 1}</div>
                        <h4 className="v-node-name">{node.name}</h4>
                        <span className="v-node-type">{node.type}</span>
                        <p className="v-node-desc">{node.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Capabilities Checklist */}
                <div className="viewer-highlights-wrap">
                  <h4 className="viewer-highlights-title">Core System Capabilities</h4>
                  <div className="viewer-highlights-grid">
                    {activeProject.highlights.map((hl) => (
                      <div key={hl} className="viewer-hl-item">
                        <CheckCircle2 size={15} color="var(--emerald)" className="hl-check-icon" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Pills */}
                <div className="viewer-tech-footer">
                  <span className="tech-footer-label">Engineering Stack:</span>
                  <div className="tech-pills-row">
                    {activeProject.tech.map((t) => (
                      <span key={t} className="tech-badge-pill">{t}</span>
                    ))}
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
