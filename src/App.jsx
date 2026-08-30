import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

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
import { PROJECTS } from './data/projectsData.js'

export default function App() {
  const [modalProject, setModalProject] = useState(null)
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
    }
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

  return (
    <>
      <NeuralLoomCanvas theme={theme} />
      <div className="tl-warp" aria-hidden="true" />
      <Navbar 
        onOpenProjectModal={handleOpenProjectModal} 
        theme={theme} 
        onToggleTheme={toggleTheme} 
      />
      <main>
        <Hero />
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
        <Pricing />
        <div className="tl-shell"><div className="tl-weft" /></div>
        <FAQ />
        <Contact />
      </main>
      <Footer />

      {/* Hyper-Realistic Glassmorphic Project Modal Popup */}
      <ProjectModal 
        project={modalProject} 
        onClose={handleCloseModal} 
      />
    </>
  )
}
