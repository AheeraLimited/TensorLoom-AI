import { useEffect, useState } from 'react'
import LoomMark from './LoomMark.jsx'
import './Navbar.css'

const LINKS = [
  { href: '#projects', label: 'Systems' },
  { href: '#about', label: 'Studio' },
  { href: '#demo', label: 'Demo' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Engagements' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav-bar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="tl-shell nav-inner">
        <a href="#top" className="nav-brand" onClick={() => setOpen(false)}>
          <LoomMark size={26} />
          <span>TensorLoom <strong className="brand-ai">AI</strong></span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <a href="#contact" className="tl-btn tl-btn-primary nav-cta">Start a project</a>

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

      {open && (
        <div className="nav-mobile">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" className="tl-btn tl-btn-thread" onClick={() => setOpen(false)}>
            Start a project
          </a>
        </div>
      )}
    </header>
  )
}
