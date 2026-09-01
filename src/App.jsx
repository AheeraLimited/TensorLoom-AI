import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { Toaster, toast } from 'sonner'

import NeuralLoomCanvas from './components/NeuralLoomCanvas.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import IndustryMarquee from './components/IndustryMarquee.jsx'
import ProjectsShowcase from './components/ProjectsShowcase.jsx'
import IndustryDemo from './components/IndustryDemo.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import AgentShowcase from './components/AgentShowcase.jsx'
import Process from './components/Process.jsx'
import Pricing from './components/Pricing.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import DiscoveryModal from './components/DiscoveryModal.jsx'
import LegalModal from './components/LegalModal.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import { PROJECTS } from './data/projectsData.js'

export default function App() {
  const [modalProject, setModalProject] = useState(null)
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false)
  const [legalTab, setLegalTab] = useState(null) // 'privacy' | 'terms' | 'nda' | null
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tensorloom-theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('tensorloom-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const lenisRef = useRef(null)

  useEffect(() => {
    // Ultra-high frame rate 120Hz+ Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.1,
      infinite: false,
    })
    lenisRef.current = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Eliminate iframe compositing jank during scroll
    let scrollTimeout
    lenis.on('scroll', () => {
      document.documentElement.classList.add('is-lenis-scrolling')
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('is-lenis-scrolling')
      }, 120)
    })

    // Smooth anchor navigation
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href.startsWith('#') && href.length > 1) {
          const target = document.querySelector(href)
          if (target) {
            e.preventDefault()
            lenis.scrollTo(target, { offset: -60, duration: 0.9 })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Freeze Lenis background scroll while any modal is open
  useEffect(() => {
    const isAnyModalOpen = Boolean(modalProject || isDiscoveryOpen || legalTab)
    if (lenisRef.current) {
      if (isAnyModalOpen) {
        lenisRef.current.stop()
      } else {
        lenisRef.current.start()
      }
    }
    document.body.style.overflow = isAnyModalOpen ? 'hidden' : 'unset'
  }, [modalProject, isDiscoveryOpen, legalTab])

  // Throttled spotlight effect with rAF to prevent lag and frame drops
  useEffect(() => {
    // Only run on desktop fine-pointer devices
    if (typeof window === 'undefined' || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    let ticking = false
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const spotlights = document.querySelectorAll('.tl-glass-spotlight')
          spotlights.forEach((el) => {
            const rect = el.getBoundingClientRect()
            if (
              e.clientX >= rect.left - 40 &&
              e.clientX <= rect.right + 40 &&
              e.clientY >= rect.top - 40 &&
              e.clientY <= rect.bottom + 40
            ) {
              const x = e.clientX - rect.left
              const y = e.clientY - rect.top
              el.style.setProperty('--mouse-x', `${x}px`)
              el.style.setProperty('--mouse-y', `${y}px`)
            }
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleOpenProjectModal = (projectIdOrIndustry) => {
    const found = PROJECTS.find(
      (p) => p.id === projectIdOrIndustry || 
             p.industry?.toLowerCase() === projectIdOrIndustry.toLowerCase() ||
             p.category?.toLowerCase() === projectIdOrIndustry.toLowerCase()
    )
    if (found) {
      setModalProject(found)
    } else {
      setModalProject(PROJECTS[0])
    }
  }

  const handleCloseModal = () => {
    setModalProject(null)
  }

  const handleOpenDiscovery = () => {
    setIsDiscoveryOpen(true)
  }

  const handleCloseDiscovery = () => {
    setIsDiscoveryOpen(false)
  }

  const handleOpenLegal = (tab = 'privacy') => {
    setLegalTab(tab)
  }

  const handleCloseLegal = () => {
    setLegalTab(null)
  }

  return (
    <>
      <NeuralLoomCanvas theme={theme} />
      <div className="tl-warp" aria-hidden="true" />
      <Navbar 
        onOpenProjectModal={handleOpenProjectModal} 
        onOpenDiscoveryModal={handleOpenDiscovery}
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />
      <main>
        <Hero onOpenDiscoveryModal={handleOpenDiscovery} />
        <IndustryMarquee />
        <ProjectsShowcase onOpenProjectModal={handleOpenProjectModal} />
        <div className="tl-shell"><div className="tl-weft" /></div>
        <IndustryDemo />
        <div className="tl-shell"><div className="tl-weft" /></div>
        <About />
        <div className="tl-shell"><div className="tl-weft" /></div>
        <Services />
        <div className="tl-shell"><div className="tl-weft" /></div>
        <AgentShowcase />
        <div className="tl-shell"><div className="tl-weft" /></div>
        <Process />
        <Pricing onOpenDiscoveryModal={handleOpenDiscovery} />
        <div className="tl-shell"><div className="tl-weft" /></div>
        <FAQ />
        <Contact />
      </main>
      <Footer 
        onOpenDiscoveryModal={handleOpenDiscovery} 
        onOpenLegalModal={handleOpenLegal}
      />

      {/* Floating Direct WhatsApp Hotline */}
      <WhatsAppButton />


      {/* 1-Click Discovery Call Scheduler Modal */}
      <DiscoveryModal 
        isOpen={isDiscoveryOpen} 
        onClose={handleCloseDiscovery} 
      />

      {/* Legal & Compliance Trust Modal */}
      <LegalModal 
        isOpen={Boolean(legalTab)} 
        initialTab={legalTab || 'privacy'} 
        onClose={handleCloseLegal} 
      />

      {/* Hyper-Realistic Glassmorphic Project Modal Popup */}
      <ProjectModal 
        project={modalProject} 
        onClose={handleCloseModal} 
      />

      {/* Luxury Frosted Glass Toast Notification System */}
      <Toaster 
        position="bottom-left" 
        theme={theme}
        toastOptions={{
          style: {
            background: theme === 'dark' ? 'rgba(18, 16, 28, 0.94)' : 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(20px)',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(226, 232, 240, 0.95)',
            color: theme === 'dark' ? '#ffffff' : '#0f172a',
            borderRadius: '14px',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.2)',
            fontFamily: 'var(--font-sans)',
            fontSize: '13px'
          }
        }}
      />
    </>
  )
}
