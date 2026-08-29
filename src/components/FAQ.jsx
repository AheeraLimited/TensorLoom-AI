import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ChevronDown, HelpCircle } from 'lucide-react'
import Reveal from './Reveal.jsx'
import './FAQ.css'

const CATEGORIES = ['All', 'AI Agents', 'Architecture', 'Engagements']

const FAQS = [
  {
    cat: 'AI Agents',
    q: 'What prevents your AI agents from hallucinating in production?',
    a: 'We enforce deterministic state machines and strict policy thresholds. If confidence falls below 98%, execution pauses for human confirmation instead of guessing.',
  },
  {
    cat: 'Architecture',
    q: 'Can you integrate with existing databases, EHRs, or ERPs?',
    a: 'Yes. We connect directly with your existing infrastructure via secure APIs, webhooks, or database links across AWS, Azure, GCP, or on-prem clusters.',
  },
  {
    cat: 'Engagements',
    q: 'How quickly do we see working software?',
    a: 'For our Tactical Sprint, you test working interactive builds within the first 10 days with continuous live staging environments.',
  },
  {
    cat: 'AI Agents',
    q: 'Do you train models from scratch or fine-tune existing foundation models?',
    a: 'We combine state-of-the-art foundation models (Claude, OpenAI, Llama 3) with targeted fine-tuning and deterministic tool-calling.',
  },
  {
    cat: 'Architecture',
    q: 'Who owns the intellectual property and code produced?',
    a: 'You own 100% of all custom code, prompts, fine-tuned weights, and pipeline configurations upon delivery.',
  },
]

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [openIndex, setOpenIndex] = useState(0)

  const filteredFaqs = activeCategory === 'All' 
    ? FAQS 
    : FAQS.filter((f) => f.cat === activeCategory)

  return (
    <section id="faq" className="tl-section faq-section">
      <div className="tl-shell">
        <div className="faq-header">
          <div className="eyebrow">
            <Sparkles size={12} />
            <span>CLARITY & ASSURANCE //</span>
          </div>
          <h2 className="faq-title">
            Answers for <span className="text-gradient-n8n">technical leaders</span>
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about engineering standards, IP ownership, and delivery guarantees.
          </p>
        </div>

        {/* Category Pills */}
        <div className="faq-category-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`faq-cat-btn ${cat === activeCategory ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat)
                setOpenIndex(0)
              }}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="faq-accordion-list">
          {filteredFaqs.map((faq, i) => {
            const isOpen = i === openIndex
            return (
              <div 
                key={faq.q} 
                className={`faq-item-card tl-glass ${isOpen ? 'open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <div className={`faq-chevron-box ${isOpen ? 'rotated' : ''}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="faq-answer-collapse"
                    >
                      <p className="faq-answer-text">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
