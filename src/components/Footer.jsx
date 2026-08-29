import LoomMark from './LoomMark.jsx'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="tl-shell footer-inner">
        <div className="footer-top">
          <a href="#top" className="footer-brand">
            <LoomMark size={24} />
            <span>TensorLoom <strong className="brand-ai">AI</strong></span>
          </a>
          <p className="footer-tagline">AI systems, woven into every industry.</p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>Navigate</h4>
            <a href="#projects">Systems</a>
            <a href="#about">Studio</a>
            <a href="#capabilities">Capabilities</a>
            <a href="#process">Process</a>
            <a href="#pricing">Engagements</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="mailto:hello@tensorloom.ai">hello@tensorloom.ai</a>
            <a href="#contact">Start a project</a>
          </div>
          <div className="footer-col">
            <h4>Social</h4>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter / X</a>
            <a href="#">GitHub</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} TensorLoom AI. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
