import { useState, useEffect, useRef, startTransition, Children } from 'react'
import { motion, useMotionValue, useAnimationFrame, animate } from 'framer-motion'
import { ArrowRight, ExternalLink, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { PROJECTS } from '../data/projectsData.js'
import './CurvedProjectsGallery.css'

export default function CurvedProjectsGallery({ onOpenProjectModal }) {
  const [activeCategory, setActiveCategory] = useState('All Projects')
  const [dimensions, setDimensions] = useState({ width: 1100, height: 540 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const containerRef = useRef(null)
  const progress = useMotionValue(0)
  const dragStartProgress = useRef(0)
  const dragStartX = useRef(0)
  const isDragging = useRef(false)

  // Configuration matching Framer Curved-GalleryV1 parameters
  const cardWidth = 320
  const cardHeight = 440
  const borderRadius = 20
  const curveIntensity = 38
  const curveDirection = 'up'
  const translateYMultiplier = 1.15
  const rotationAngle = 12
  const spacing = 19
  const autoPlayInterval = 3.5

  const totalCards = PROJECTS.length
  const bufferMultiplier = totalCards <= 3 ? 3 : 5
  const bufferOffsetMultiplier = Math.floor(bufferMultiplier / 2)
  const extendedProjects = Array(bufferMultiplier).fill(PROJECTS).flat()

  // Track visibility with IntersectionObserver
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: 0.15 })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Responsive dimension tracking
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return
    const updateDimensions = () => {
      if (containerRef.current) {
        startTransition(() => {
          setDimensions({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight || 540
          })
        })
      }
    }
    updateDimensions()
    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  // Slide step transition with spring physics
  const stepSlide = (deltaIndex) => {
    if (totalCards <= 1) return
    const currentPos = progress.get()
    const baseIndex = deltaIndex > 0 ? Math.floor(currentPos) : Math.ceil(currentPos)
    const target = baseIndex + deltaIndex
    animate(progress, target, {
      type: 'spring',
      stiffness: 220,
      damping: 26,
      onUpdate: (latest) => {
        const normalized = ((Math.round(latest) % totalCards) + totalCards) % totalCards
        setActiveIndex(normalized)
      }
    })
  }

  // Smooth Autoplay
  useEffect(() => {
    if (totalCards <= 1 || !isVisible || isHovered) return
    const interval = setInterval(() => {
      stepSlide(1)
    }, autoPlayInterval * 1000)
    return () => clearInterval(interval)
  }, [isVisible, isHovered, totalCards])

  // Continuous Progress Loop wrapping
  useAnimationFrame(() => {
    if (totalCards === 0) return
    let currentProgress = progress.get()
    if (currentProgress >= totalCards) {
      progress.set(currentProgress - totalCards)
    } else if (currentProgress < 0) {
      progress.set(currentProgress + totalCards)
    }
  })

  // Responsive card scaling calculations
  let responsiveCardWidth = cardWidth
  let responsiveCardHeight = cardHeight
  const maxWidthScale = dimensions.width * 0.82
  const maxHeightScale = (dimensions.height || 540) * 0.88
  if (responsiveCardWidth > maxWidthScale || responsiveCardHeight > maxHeightScale) {
    const scale = Math.min(maxWidthScale / responsiveCardWidth, maxHeightScale / responsiveCardHeight)
    responsiveCardWidth *= scale
    responsiveCardHeight *= scale
  }

  const curveRadius = dimensions.width * (curveIntensity / 180)
  const horizontalPadding = responsiveCardWidth * 0.4
  const verticalPadding = responsiveCardHeight * 0.15

  // Drag Gesture Handling
  const handlePointerDown = (e) => {
    isDragging.current = true
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0
    dragStartProgress.current = progress.get()
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current) return
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const deltaX = dragStartX.current - currentX
    const deltaProgress = deltaX / (responsiveCardWidth * 0.85)
    progress.set(dragStartProgress.current + deltaProgress)
  }

  const handlePointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const currentPos = progress.get()
    const target = Math.round(currentPos)
    animate(progress, target, {
      type: 'spring',
      stiffness: 240,
      damping: 28,
      onUpdate: (latest) => {
        const normalized = ((Math.round(latest) % totalCards) + totalCards) % totalCards
        setActiveIndex(normalized)
      }
    })
  }

  return (
    <section id="projects" className="tl-section curved-gallery-section">
      <div className="tl-shell">
        {/* Minimal Section Header */}
        <div className="curved-gallery-header">
          <div className="eyebrow minimal-eyebrow">
            <Sparkles size={13} color="var(--coral)" />
            <span>LIVE PRODUCTION WORK</span>
          </div>
          <h2 className="curved-gallery-title">
            Explore our <span className="text-gradient-n8n">live applications.</span>
          </h2>
          <p className="curved-gallery-subtitle">
            Curved interactive showcase of production systems and custom online stores we've engineered.
          </p>
        </div>

        {/* Curved 3D Arc Gallery Viewport */}
        <div 
          ref={containerRef}
          className="curved-gallery-viewport"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            if (isDragging.current) handlePointerUp()
          }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          style={{
            padding: `${verticalPadding}px ${horizontalPadding}px`
          }}
        >
          {/* Subtle Atmospheric Light Sheen */}
          <div className="curved-gallery-ambient-sheen" aria-hidden="true" />

          {/* Cards Stage Container */}
          <div className="curved-gallery-stage">
            {extendedProjects.map((project, index) => (
              <CurvedCardItem
                key={`${project.id}-${index}`}
                project={project}
                index={index}
                totalCards={totalCards}
                bufferOffsetMultiplier={bufferOffsetMultiplier}
                progress={progress}
                spacing={spacing}
                curveRadius={curveRadius}
                curveDirection={curveDirection}
                translateYMultiplier={translateYMultiplier}
                rotationAngle={rotationAngle}
                cardWidth={responsiveCardWidth}
                cardHeight={responsiveCardHeight}
                borderRadius={borderRadius}
                onOpenProjectModal={onOpenProjectModal}
              />
            ))}
          </div>

          {/* Minimal Frosted Glass Navigation Arrows */}
          <button 
            type="button" 
            className="curved-nav-btn prev-btn"
            onClick={(e) => {
              e.stopPropagation()
              stepSlide(-1)
            }}
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </button>

          <button 
            type="button" 
            className="curved-nav-btn next-btn"
            onClick={(e) => {
              e.stopPropagation()
              stepSlide(1)
            }}
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Minimal Subtle Pagination Indicator */}
        <div className="curved-pagination-dots">
          {PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              type="button"
              className={`curved-dot ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => {
                const currentPos = progress.get()
                const currentNorm = ((Math.round(currentPos) % totalCards) + totalCards) % totalCards
                let diff = idx - currentNorm
                if (diff > totalCards / 2) diff -= totalCards
                if (diff < -totalCards / 2) diff += totalCards
                const target = Math.round(currentPos) + diff
                animate(progress, target, {
                  type: 'spring',
                  stiffness: 220,
                  damping: 26,
                  onUpdate: (latest) => {
                    const normalized = ((Math.round(latest) % totalCards) + totalCards) % totalCards
                    setActiveIndex(normalized)
                  }
                })
              }}
              aria-label={`Go to ${proj.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CurvedCardItem({
  project,
  index,
  totalCards,
  bufferOffsetMultiplier,
  progress,
  spacing,
  curveRadius,
  curveDirection,
  translateYMultiplier,
  rotationAngle,
  cardWidth,
  cardHeight,
  borderRadius,
  onOpenProjectModal
}) {
  const cardRef = useRef(null)
  const IconComp = project.icon

  useAnimationFrame(() => {
    if (!cardRef.current) return
    const currentProgress = progress.get()
    const offset = index - (currentProgress + totalCards * bufferOffsetMultiplier)
    const absOffset = Math.abs(offset)
    
    // Exact mathematical formula from Framer Curved-GalleryV1
    const angle = offset * spacing
    const radian = (angle * Math.PI) / 180
    const translateX = Math.sin(radian) * curveRadius
    const translateY = (curveDirection === 'down' ? 1 : -1) * (Math.cos(radian) - 1) * curveRadius * translateYMultiplier
    const rotation = offset * rotationAngle
    const scale = 1 - absOffset * 0.12
    const maxVisibleDistance = totalCards <= 3 ? 1.8 : 3.2
    const opacity = absOffset > maxVisibleDistance ? 0 : Math.max(0, 1 - absOffset * 0.32)
    const zIndex = Math.round(1000 - absOffset * 15)

    cardRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) rotate(${rotation}deg) scale(${scale})`
    cardRef.current.style.opacity = `${opacity}`
    cardRef.current.style.zIndex = `${zIndex}`
    cardRef.current.style.visibility = opacity <= 0 ? 'hidden' : 'visible'
  })

  return (
    <div
      ref={cardRef}
      className="curved-card-wrapper"
      style={{
        width: cardWidth,
        height: cardHeight,
        borderRadius: borderRadius
      }}
    >
      <div 
        className="curved-project-card"
        style={{
          borderRadius: borderRadius
        }}
      >
        {/* Card Header */}
        <div className="curved-card-header">
          <div className="curved-category-tag">
            <span className="curved-pulse-dot" style={{ background: project.color }} />
            <span>{project.category}</span>
          </div>

          <div 
            className="curved-icon-badge"
            style={{ 
              color: project.color,
              background: `${project.color}15`,
              borderColor: `${project.color}30`
            }}
          >
            <IconComp size={16} />
          </div>
        </div>

        {/* Card Interactive Visual Preview */}
        <div className="curved-card-media-preview">
          <div className="curved-browser-mockup">
            <div className="browser-mockup-bar">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
              <span className="browser-mockup-url">{project.name.toLowerCase()}.app</span>
            </div>
            
            {/* Project Cover Graphics */}
            <div 
              className="browser-mockup-body"
              style={{
                background: `radial-gradient(circle at 50% 30%, ${project.color}22 0%, #0d0c14 80%)`
              }}
            >
              <div className="mockup-centered-brand">
                <span className="mockup-brand-title" style={{ color: '#ffffff' }}>
                  {project.name}
                </span>
                <span className="mockup-brand-badge" style={{ color: project.color }}>
                  {project.badge}
                </span>
              </div>

              {/* Metric Pill */}
              <div className="mockup-metric-chip">
                <span className="chip-label">{project.metrics[0]?.label}:</span>
                <span className="chip-val" style={{ color: project.color }}>{project.metrics[0]?.val}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Content & Action Bar */}
        <div className="curved-card-footer">
          <div className="curved-footer-info">
            <h3 className="curved-project-title">{project.name}</h3>
            <p className="curved-project-desc">{project.tagline}</p>
          </div>

          <div className="curved-card-actions">
            <button
              type="button"
              className="curved-quick-view-btn"
              onClick={(e) => {
                e.stopPropagation()
                if (onOpenProjectModal) onOpenProjectModal(project)
              }}
            >
              <Eye size={14} />
              <span>Details</span>
            </button>

            <a
              href={project.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="curved-live-link-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Live App</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
