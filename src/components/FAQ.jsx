import { useState } from 'react'
import { Sparkles, ChevronDown } from 'lucide-react'
import './FAQ.css'

const CATEGORIES = ['All', 'Projects & Timelines', 'Ownership & Security', 'Features & Support']

const FAQS = [
  {
    cat: 'Projects & Timelines',
    q: 'How quickly can you build and launch my website or app?',
    a: 'Most custom web platforms, online stores, and apps launch within 2 to 4 weeks. You will receive live testing links from Week 1 so you can test everything in real time.',
  },
  {
    cat: 'Ownership & Security',
    q: 'Who owns the website, code, and design after launch?',
    a: 'You own 100% of everything we build. All source code, design assets, database access, and domain configs are completely handed over to you.',
  },
  {
    cat: 'Features & Support',
    q: 'Can you connect my existing payment methods and WhatsApp?',
    a: 'Yes, absolutely. We easily connect with UPI, Stripe, Razorpay, WhatsApp Business API, SMS alerts, Google Maps GIS, and your existing business software.',
  },
  {
    cat: 'Projects & Timelines',
    q: 'Will my website work fast and look great on all mobile phones?',
    a: 'Yes, 100%. We design with a mobile-first approach, ensuring fast loading speeds under 1.2 seconds, crisp typography, and touch-friendly controls on all iPhones, Androids, tablets, and desktops.',
  },
  {
    cat: 'Features & Support',
    q: 'Do you provide ongoing support and updates after we launch?',
    a: 'Yes! We provide complete post-launch support, reliable cloud hosting maintenance, security monitoring, and continuous new feature development as your business grows.',
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
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="faq-title">
            Simple answers to <br />
            <span className="text-gradient-n8n">common questions.</span>
          </h2>
          <p className="faq-subtitle">
            Everything you need to know about our project timelines, pricing, and full code ownership.
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

                <div className="faq-answer-accordion">
                  <div className="faq-answer-inner-overflow">
                    <div className="faq-answer-wrap">
                      <p className="faq-a-text">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
