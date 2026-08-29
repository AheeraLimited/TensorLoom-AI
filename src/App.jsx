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

export default function App() {
  return (
    <>
      <NeuralLoomCanvas />
      <div className="tl-warp" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <IndustryMarquee />
        <ProjectsShowcase />
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
    </>
  )
}
