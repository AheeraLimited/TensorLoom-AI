import { useState } from 'react'
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
      <NeuralLoomCanvas />
      <div className="tl-warp" aria-hidden="true" />
      <Navbar onOpenProjectModal={handleOpenProjectModal} />
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
