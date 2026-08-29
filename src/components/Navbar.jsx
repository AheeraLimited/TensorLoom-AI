import { useEffect, useState } from 'react'
import { 
  ChevronDown, ShoppingBag, Car, UtensilsCrossed, Milk, MessageSquare, 
  Layers, Cpu, Zap, Activity, Compass, Layout, Code2, Rocket, Shield, HelpCircle, 
  Sparkles, DollarSign, CheckCircle2
} from 'lucide-react'
import LoomMark from './LoomMark.jsx'
import './Navbar.css'

const NAV_ITEMS = [
  {
    href: '#projects',
    label: 'Projects',
    dropdown: [
      { href: '#projects', title: 'Luxury E-Commerce', desc: 'Zynara instant checkout & dynamic cart', icon: ShoppingBag, color: '#ff6d42' },
      { href: '#projects', title: 'Car Rental & Live GPS', desc: 'Shubh Safar route maps & online KYC', icon: Car, color: '#38bdf8' },
      { href: '#projects', title: 'Food & Kitchen Stream', desc: 'Cheat Meals orders & kitchen chime alerts', icon: UtensilsCrossed, color: '#fb7185' },
      { href: '#projects', title: 'Dairy Subscriptions', desc: 'Aheera Milk routes & WhatsApp bills', icon: Milk, color: '#34d399' },
      { href: '#projects', title: 'Automated WhatsApp Bots', desc: '24/7 AI lead capture & instant replies', icon: MessageSquare, color: '#fbbf24' }
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav-bar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="tl-shell nav-shell">
        <div className="nav-inner">
          {/* Left: Brand Logo */}
          <a href="#top" className="nav-brand" onClick={() => setOpen(false)}>
            <LoomMark size={24} />
            <span>TensorLoom <strong className="brand-ai">AI</strong></span>
          </a>

          {/* Right Group: Nav Links with Rich Dropdowns + CTA Button */}
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
                            onClick={() => setActiveDropdown(null)}
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

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="nav-mobile">
            {NAV_ITEMS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <a href="#contact" className="tl-btn tl-btn-primary" onClick={() => setOpen(false)}>
              Start a Project
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
