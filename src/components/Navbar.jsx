import { useEffect, useState } from 'react'
import { 
  ChevronDown, ShoppingBag, Car, UtensilsCrossed, Milk, MessageSquare, 
  Layers, Cpu, Zap, Activity, Compass, Layout, Code2, Rocket, Shield, HelpCircle, 
  Sparkles, DollarSign, CheckCircle2, ArrowRight, Sun, Moon
} from 'lucide-react'
import LoomMark from './LoomMark.jsx'
import './Navbar.css'

const NAV_ITEMS = [
  {
    href: '#projects',
    label: 'Projects',
    dropdown: [
      { href: '#projects', projectId: 'zynara', title: 'E-Commerce', desc: 'Online shopping, dynamic carts & instant checkout', icon: ShoppingBag, color: '#ff6d42' },
      { href: '#projects', projectId: 'shubh-safar', title: 'Automobile', desc: 'Live GPS fleet tracking, rentals & auto detailing', icon: Car, color: '#38bdf8' },
      { href: '#projects', projectId: 'cheat-meals', title: 'Food Delivery', desc: 'Live kitchen orders, chime alerts & rider tracking', icon: UtensilsCrossed, color: '#fb7185' },
      { href: '#projects', projectId: 'aheera-milk', title: 'FMCG & Subscriptions', desc: 'Daily delivery routes, vacation pause & billing', icon: Milk, color: '#34d399' },
      { href: '#projects', projectId: 'whatsapp-crm', title: 'WhatsApp Bots & CRM', desc: '24/7 automated support, lead capture & shared inbox', icon: MessageSquare, color: '#fbbf24' }
    ]
  },
  {
    href: '#about',
    label: 'About Us',
    dropdown: [
      { href: '#about', title: 'Why TensorLoom', desc: 'Rapid 2–4 week delivery & luxury design', icon: Shield, color: '#ff6d42' },
      { href: '#about', title: 'Our Core Pillars', desc: 'Velocity, security & 100% code ownership', icon: CheckCircle2, color: '#34d399' }
    ]
  },
  {
    href: '#demo',
    label: 'Demo',
    dropdown: [
      { href: '#demo', title: 'Interactive Command Sandbox', desc: 'Test live workflow nodes & triggers', icon: Sparkles, color: '#ff6d42' },
      { href: '#demo', title: 'Live Telemetry Feed', desc: 'Real-time JSON payload & audit logs', icon: Activity, color: '#38bdf8' }
    ]
  },
  {
    href: '#capabilities',
    label: 'Services',
    dropdown: [
      { href: '#capabilities', title: 'Custom Web Apps', desc: 'High-performance web platforms & PWAs', icon: Layers, color: '#ff6d42' },
      { href: '#capabilities', title: 'Workflow Automation', desc: 'Automate orders, invoices & routing', icon: Zap, color: '#38bdf8' },
      { href: '#capabilities', title: 'AI Autonomous Agents', desc: 'Smart customer service & WhatsApp bots', icon: Cpu, color: '#c084fc' },
      { href: '#capabilities', title: 'Cloud Dashboards', desc: 'Real-time telemetry & business ledgers', icon: Activity, color: '#34d399' }
    ]
  },
  {
    href: '#process',
    label: 'How It Works',
    dropdown: [
      { href: '#process', title: '01 Discover & Plan', desc: 'Business mapping & fixed roadmap', icon: Compass, color: '#38bdf8' },
      { href: '#process', title: '02 Design & Prototype', desc: 'Interactive screens & client review', icon: Layout, color: '#ff6d42' },
      { href: '#process', title: '03 Build & Weekly Demos', desc: 'Live testing links & weekly demos', icon: Code2, color: '#c084fc' },
      { href: '#process', title: '04 Launch & Support', desc: 'Production deployment & ongoing care', icon: Rocket, color: '#34d399' }
    ]
  },
  {
    href: '#pricing',
    label: 'Pricing',
    dropdown: [
      { href: '#pricing', title: 'Fixed-Price Packages', desc: 'Transparent pricing with zero hidden fees', icon: DollarSign, color: '#ff6d42' },
      { href: '#pricing', title: 'Custom Enterprise', desc: 'Tailored enterprise architectures & SLA', icon: Layers, color: '#38bdf8' }
    ]
  },
  {
    href: '#faq',
    label: 'FAQ',
    dropdown: [
      { href: '#faq', title: 'Timeline & Speed', desc: 'Production-ready software in 2–4 weeks', icon: HelpCircle, color: '#ff6d42' },
      { href: '#faq', title: 'Full Ownership', desc: 'You own 100% of your source code', icon: Shield, color: '#34d399' }
    ]
  }
]

export default function Navbar({ onOpenProjectModal, theme = 'dark', onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState('Projects')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleDropdownItemClick = (e, sub) => {
    if (sub.projectId && onOpenProjectModal) {
      e.preventDefault()
      onOpenProjectModal(sub.projectId)
    }
    setActiveDropdown(null)
    setOpen(false)
  }

  return (
    <header className={`nav-bar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="tl-shell nav-shell">
        <div className="nav-inner">
          {/* Left: Brand Logo */}
          <a href="#top" className="nav-brand" onClick={() => setOpen(false)}>
            <LoomMark size={24} />
            <span>TensorLoom <strong className="brand-ai">AI</strong></span>
          </a>

          {/* Right Group: Nav Links with Rich Dropdowns + Theme Switcher + CTA */}
          <div className="nav-right-group">
            <nav className="nav-links" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <div 
                  key={item.label} 
                  className="nav-item-wrap"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a href={item.href} className="nav-link-btn">
                    <span>{item.label}</span>
                    <ChevronDown size={12} className="nav-chevron" />
                  </a>

                  {/* Frosted Glass Dropdown Menu */}
                  {item.dropdown && (
                    <div className="nav-dropdown-menu">
                      {item.dropdown.map((sub) => {
                        const SubIcon = sub.icon
                        return (
                          <a 
                            key={sub.title} 
                            href={sub.href} 
                            className="nav-dropdown-item"
                            onClick={(e) => handleDropdownItemClick(e, sub)}
                          >
                            <div 
                              className="nav-drop-icon"
                              style={{ 
                                background: `${sub.color}15`, 
                                borderColor: `${sub.color}35`,
                                color: sub.color 
                              }}
                            >
                              <SubIcon size={16} />
                            </div>
                            <div className="nav-drop-info">
                              <span className="nav-drop-title">{sub.title}</span>
                              <span className="nav-drop-desc">{sub.desc}</span>
                            </div>
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Theme Toggle Button */}
            <button
              className="nav-theme-toggle"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a href="#contact" className="tl-btn tl-btn-primary nav-cta">Start a Project</a>

            <button
              className="nav-toggle"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with Accordion & Frosted Chips */}
        {open && (
          <div className="nav-mobile">
            <div className="nav-mobile-scroll">
              {NAV_ITEMS.map((l) => {
                const isExpanded = mobileExpanded === l.label
                return (
                  <div key={l.label} className={`nav-mobile-section ${isExpanded ? 'expanded' : ''}`}>
                    <div 
                      className="nav-mobile-row"
                      onClick={() => {
                        if (l.dropdown) {
                          setMobileExpanded(isExpanded ? null : l.label)
                        } else {
                          setOpen(false)
                        }
                      }}
                    >
                      <a 
                        href={l.href} 
                        onClick={(e) => {
                          if (l.dropdown) {
                            e.preventDefault()
                            setMobileExpanded(isExpanded ? null : l.label)
                          } else {
                            setOpen(false)
                          }
                        }} 
                        className="nav-mobile-title"
                      >
                        {l.label}
                      </a>
                      {l.dropdown && (
                        <button 
                          className="nav-mobile-chevron-btn"
                          aria-label={`Toggle ${l.label}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setMobileExpanded(isExpanded ? null : l.label)
                          }}
                        >
                          <ChevronDown size={14} className={`mobile-chevron ${isExpanded ? 'open' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Expandable Sub-items Grid */}
                    {l.dropdown && isExpanded && (
                      <div className="nav-mobile-chips-grid">
                        {l.dropdown.map((sub) => {
                          const SubIcon = sub.icon
                          return (
                            <a
                              key={sub.title}
                              href={sub.href}
                              className="nav-mobile-chip-btn"
                              onClick={(e) => handleDropdownItemClick(e, sub)}
                            >
                              <div 
                                className="nav-mobile-chip-icon"
                                style={{ 
                                  background: `${sub.color}18`, 
                                  borderColor: `${sub.color}40`,
                                  color: sub.color 
                                }}
                              >
                                <SubIcon size={12} />
                              </div>
                              <span className="nav-mobile-chip-text">{sub.title}</span>
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="nav-mobile-footer">
              <div className="nav-mobile-footer-row">
                <span className="nav-mobile-theme-label">Theme Appearance</span>
                <button 
                  className="nav-mobile-theme-pill"
                  onClick={onToggleTheme}
                >
                  {theme === 'dark' ? <><Sun size={13} /> <span>Switch to Light</span></> : <><Moon size={13} /> <span>Switch to Dark</span></>}
                </button>
              </div>
              <a 
                href="#contact" 
                className="tl-btn tl-btn-primary nav-mobile-cta" 
                onClick={() => setOpen(false)}
              >
                <span>Start a Project</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
