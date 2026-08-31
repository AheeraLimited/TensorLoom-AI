import { useState, useEffect, useRef, startTransition } from 'react'
import { motion, useMotionValue, useAnimationFrame, animate } from 'framer-motion'
import { 
  Sparkles, ChevronLeft, ChevronRight, CheckCircle, 
  ArrowUpRight, Eye, Wifi, Battery, Signal, Lock, RotateCw, ExternalLink,
  MessageSquare, ShoppingBag, Car, UtensilsCrossed, Droplets, Milk
} from 'lucide-react'
import { PROJECTS } from '../data/projectsData.js'
import './InstaProjectsGallery.css'

export default function InstaProjectsGallery({ onOpenProjectModal }) {
  const [dimensions, setDimensions] = useState({ width: 1100, height: 660 })
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  
  const containerRef = useRef(null)
  const progress = useMotionValue(0)
  const dragStartProgress = useRef(0)
  const dragStartX = useRef(0)
  const isDragging = useRef(false)

  // Mobile View Frame Proportions (Phone Aspect Ratio)
  const cardWidth = 296
  const cardHeight = 600
  const borderRadius = 34
  const cardSpacing = 28 // Spacing between phone frames
  const autoPlayInterval = 4.5

  const totalCards = PROJECTS.length
  const bufferMultiplier = 3
  const bufferOffsetMultiplier = Math.floor(bufferMultiplier / 2)
  const extendedProjects = Array(bufferMultiplier).fill(PROJECTS).flat()

  // Track visibility with IntersectionObserver
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, { threshold: 0.12 })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Responsive dimensions
  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return
    const updateDimensions = () => {
      if (containerRef.current) {
        startTransition(() => {
          setDimensions({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight || 660
          })
        })
      }
    }
    updateDimensions()
    const resizeObserver = new ResizeObserver(updateDimensions)
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  // Step slide transition with spring physics
  const stepSlide = (deltaIndex) => {
    if (totalCards <= 1) return
    const currentPos = progress.get()
    const baseIndex = deltaIndex > 0 ? Math.floor(currentPos) : Math.ceil(currentPos)
    const target = baseIndex + deltaIndex
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

  // Jump directly to any card by clicking it (works from any position)
  const stepToCard = (targetCardIndex) => {
    if (totalCards <= 1) return
    const currentPos = progress.get()
    const currentNorm = ((Math.round(currentPos) % totalCards) + totalCards) % totalCards
    let diff = targetCardIndex - currentNorm
    if (diff > totalCards / 2) diff -= totalCards
    if (diff < -totalCards / 2) diff += totalCards
    if (diff === 0) return
    const target = Math.round(currentPos) + diff
    animate(progress, target, {
      type: 'spring',
      stiffness: 260,
      damping: 28,
      onUpdate: (latest) => {
        const normalized = ((Math.round(latest) % totalCards) + totalCards) % totalCards
        setActiveIndex(normalized)
      }
    })
  }

  // Smooth Autoplay (only when not interacting)
  useEffect(() => {
    if (totalCards <= 1 || !isVisible || isHovered) return
    const interval = setInterval(() => {
      stepSlide(1)
    }, autoPlayInterval * 1000)
    return () => clearInterval(interval)
  }, [isVisible, isHovered, totalCards])

  // Continuous loop wrapping
  useAnimationFrame(() => {
    if (totalCards === 0) return
    let currentProgress = progress.get()
    if (currentProgress >= totalCards) {
      progress.set(currentProgress - totalCards)
    } else if (currentProgress < 0) {
      progress.set(currentProgress + totalCards)
    }
  })

  // Responsive mobile frame scaling
  let responsiveCardWidth = cardWidth
  let responsiveCardHeight = cardHeight
  const maxWidthScale = dimensions.width * 0.84
  const maxHeightScale = (dimensions.height || 660) * 0.94
  if (responsiveCardWidth > maxWidthScale || responsiveCardHeight > maxHeightScale) {
    const scale = Math.min(maxWidthScale / responsiveCardWidth, maxHeightScale / responsiveCardHeight)
    responsiveCardWidth *= scale
    responsiveCardHeight *= scale
  }

  const stride = responsiveCardWidth + cardSpacing

  // Pointer drag gestures on stage background
  const handlePointerDown = (e) => {
    // If clicking directly inside an iframe or interactive button, don't drag
    if (e.target.tagName === 'IFRAME' || e.target.closest('.mobile-app-footer') || e.target.closest('.phone-url-bar')) {
      return
    }
    isDragging.current = true
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0
    dragStartProgress.current = progress.get()
  }

  const handlePointerMove = (e) => {
    if (!isDragging.current) return
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const deltaX = dragStartX.current - currentX
    const deltaProgress = deltaX / stride
    progress.set(dragStartProgress.current + deltaProgress)
  }

  const handlePointerUp = () => {
    if (!isDragging.current) return
    isDragging.current = false
    const currentPos = progress.get()
    const target = Math.round(currentPos)
    animate(progress, target, {
      type: 'spring',
      stiffness: 260,
      damping: 30,
      onUpdate: (latest) => {
        const normalized = ((Math.round(latest) % totalCards) + totalCards) % totalCards
        setActiveIndex(normalized)
      }
    })
  }

  return (
    <section id="projects" className="tl-section insta-gallery-section">
      <div className="tl-shell">
        {/* Minimal Section Header */}
        <div className="insta-gallery-header">
          <div className="eyebrow minimal-eyebrow">
            <Sparkles size={13} color="var(--coral)" />
            <span>LIVE INTERACTIVE PHONE BUILDS</span>
          </div>
          <h2 className="insta-gallery-title">
            Browse our <span className="text-gradient-n8n">live applications.</span>
          </h2>
          <p className="insta-gallery-subtitle">
            Scroll, tap, and interact with live production web apps directly inside each phone frame below.
          </p>
        </div>

        {/* Clean Mobile Phone Gallery Viewport */}
        <div 
          ref={containerRef}
          className="insta-gallery-viewport"
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
        >
          {/* Subtle Ambient Glow */}
          <div className="insta-gallery-sheen" aria-hidden="true" />

          {/* Cards Stage */}
          <div className="insta-gallery-stage">
            {extendedProjects.map((project, index) => (
              <LiveMobilePhoneCardItem
                key={`${project.id}-${index}`}
                project={project}
                index={index}
                totalCards={totalCards}
                bufferOffsetMultiplier={bufferOffsetMultiplier}
                progress={progress}
                stride={stride}
                cardWidth={responsiveCardWidth}
                cardHeight={responsiveCardHeight}
                borderRadius={borderRadius}
                isActive={activeIndex === (((index % totalCards) + totalCards) % totalCards)}
                onOpenProjectModal={onOpenProjectModal}
                onCardClick={stepToCard}
              />
            ))}
          </div>

          {/* Minimal Navigation Arrows */}
          <button 
            type="button" 
            className="insta-nav-btn prev-btn"
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
            className="insta-nav-btn next-btn"
            onClick={(e) => {
              e.stopPropagation()
              stepSlide(1)
            }}
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Minimal Pagination Dots */}
        <div className="insta-pagination-dots">
          {PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              type="button"
              className={`insta-dot ${activeIndex === idx ? 'active' : ''}`}
              onClick={() => {
                const currentPos = progress.get()
                const currentNorm = ((Math.round(currentPos) % totalCards) + totalCards) % totalCards
                let diff = idx - currentNorm
                if (diff > totalCards / 2) diff -= totalCards
                if (diff < -totalCards / 2) diff += totalCards
                const target = Math.round(currentPos) + diff
                animate(progress, target, {
                  type: 'spring',
                  stiffness: 240,
                  damping: 28,
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

function LiveMobilePhoneCardItem({
  project,
  index,
  totalCards,
  bufferOffsetMultiplier,
  progress,
  stride,
  cardWidth,
  cardHeight,
  borderRadius,
  isActive,
  onOpenProjectModal,
  onCardClick
}) {
  const cardRef = useRef(null)
  const overlayRef = useRef(null)
  const iframeContainerRef = useRef(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isIframeMounted, setIsIframeMounted] = useState(false)
  const isMountedRef = useRef(false)
  const IconComp = project.icon
  // The card's own normalized index (0 to totalCards-1)
  const cardNormalIndex = ((index % totalCards) + totalCards) % totalCards

  useAnimationFrame(() => {
    if (!cardRef.current) return
    const currentProgress = progress.get()
    const offset = index - (currentProgress + totalCards * bufferOffsetMultiplier)
    const absOffset = Math.abs(offset)
    const isCenter = absOffset < 0.4

    // Lazy load iframe only when card is in or near visible spread (absOffset <= 2.2)
    if (!isMountedRef.current && absOffset <= 2.2) {
      isMountedRef.current = true
      setIsIframeMounted(true)
    }

    // Direct DOM styling without React state updates for buttery 120fps performance
    if (overlayRef.current) {
      overlayRef.current.style.display = isCenter ? 'none' : 'block'
    }
    if (iframeContainerRef.current) {
      iframeContainerRef.current.style.pointerEvents = isCenter ? 'auto' : 'none'
    }

    // ── Fan 3D Carousel ─────────────────────────────────────────────
    const rotateY = Math.max(-55, Math.min(55, offset * -30))
    const translateZ = Math.max(-200, 60 - absOffset * 110)
    const scale = Math.max(0.62, 1.0 - absOffset * 0.13)
    const translateX = offset * (stride * 0.62)
    const translateY = absOffset < 0.5 ? 0 : absOffset * 4

    // Show up to ±2 cards; beyond 2 fade out quickly
    const opacity = absOffset <= 2.0 ? 1 : Math.max(0, 1 - (absOffset - 2.0) * 4)
    const zIndex = Math.round(1000 - absOffset * 30)

    cardRef.current.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`
    cardRef.current.style.opacity = `${opacity}`
    cardRef.current.style.zIndex = `${zIndex}`
    cardRef.current.style.visibility = opacity <= 0 ? 'hidden' : 'visible'
    cardRef.current.style.boxShadow = isCenter
      ? '0 50px 110px rgba(0,0,0,0.70), 0 20px 48px rgba(0,0,0,0.50)'
      : `0 ${Math.round(28 - absOffset * 6)}px ${Math.round(60 - absOffset * 12)}px rgba(0,0,0,0.38)`
    cardRef.current.style.cursor = isCenter ? 'default' : 'pointer'
  })

  const hasLiveUrl = project.targetUrl && project.targetUrl.startsWith('http')

  return (
    <div
      ref={cardRef}
      className="mobile-phone-card-wrapper"
      style={{
        width: cardWidth,
        height: cardHeight,
        borderRadius: borderRadius
      }}
    >
      {/* Clickable overlay for side cards — clicking brings them to front */}
      <div
        ref={overlayRef}
        className="card-focus-overlay"
        onClick={(e) => {
          e.stopPropagation()
          onCardClick(cardNormalIndex)
        }}
        aria-label={`View ${project.name}`}
        role="button"
      />

      {/* Outer Phone Bezel Chassis */}
      <div 
        className="mobile-phone-chassis"
        style={{
          borderRadius: borderRadius
        }}
      >
        {/* Dynamic Island / Speaker Notch */}
        <div className="mobile-dynamic-island">
          <span className="island-camera" />
        </div>

        {/* Inner Phone Screen */}
        <div className="mobile-screen-content">
          
          {/* 1. Mobile Status Bar (9:41, Signal, Wifi, Battery) */}
          <div className="mobile-status-bar">
            <span className="status-time">9:41</span>
            <div className="status-indicators">
              <Signal size={10} />
              <Wifi size={10} />
              <Battery size={12} />
            </div>
          </div>

          {/* 2. Mini Mobile Browser Address Bar */}
          <div className="phone-url-bar">
            <div className="phone-url-chip">
              <Lock size={9} color="#10b981" />
              <span className="phone-url-domain">{project.name.toLowerCase().replace(/\s+/g, '')}.app</span>
            </div>

            <button 
              type="button" 
              className="phone-url-refresh-btn"
              onClick={(e) => {
                e.stopPropagation()
                setRefreshKey(prev => prev + 1)
              }}
              title="Reload live page"
            >
              <RotateCw size={10} />
            </button>
          </div>

          {/* 3. Live Interactive iFrame Stage (Lazy-mounted on proximity) */}
          <div className="phone-live-iframe-stage">
            {hasLiveUrl ? (
              <div 
                ref={iframeContainerRef}
                className="phone-iframe-scaler"
                style={{ pointerEvents: 'none' }}
              >
                {isIframeMounted ? (
                  <iframe
                    key={`${project.id}-${refreshKey}`}
                    src={project.targetUrl}
                    title={`${project.name} Live Web Feed`}
                    className="phone-live-iframe"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                ) : (
                  <div 
                    className="phone-fallback-view"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${project.color}25 0%, #0d0c15 88%)`
                    }}
                  >
                    <div 
                      className="phone-fallback-icon-box"
                      style={{
                        color: project.color,
                        background: `${project.color}15`,
                        borderColor: `${project.color}35`
                      }}
                    >
                      <IconComp size={32} />
                    </div>
                    <h4 className="phone-fallback-title">{project.name}</h4>
                    <span className="phone-fallback-badge" style={{ color: project.color }}>
                      {project.badge}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div 
                className="phone-fallback-view"
                style={{
                  background: `radial-gradient(circle at 50% 30%, ${project.color}25 0%, #0d0c15 88%)`
                }}
              >
                <div 
                  className="phone-fallback-icon-box"
                  style={{
                    color: project.color,
                    background: `${project.color}15`,
                    borderColor: `${project.color}35`
                  }}
                >
                  <IconComp size={32} />
                </div>
                <h4 className="phone-fallback-title">{project.name}</h4>
                <span className="phone-fallback-badge" style={{ color: project.color }}>
                  {project.badge}
                </span>
                <p className="phone-fallback-desc">{project.tagline}</p>
              </div>
            )}
          </div>

          {/* 4. Mobile App Footer & Actions */}
          <div className="mobile-app-footer">
            <div className="mobile-footer-meta">
              <span className="mobile-footer-name">{project.industry || project.category}</span>
              <span className="mobile-footer-tag" style={{ color: project.color }}>{project.badge}</span>
            </div>

            <div className="mobile-action-buttons">
              <button
                type="button"
                className="mobile-details-action"
                onClick={(e) => {
                  e.stopPropagation()
                  if (onOpenProjectModal) onOpenProjectModal(project.id)
                }}
              >
                <Eye size={12} />
                <span>Details</span>
              </button>

              <a
                href={project.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-live-action"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Full App</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* 5. Mobile Home Indicator Bar */}
          <div className="mobile-home-indicator-wrap">
            <span className="mobile-home-bar" />
          </div>

        </div>
      </div>
    </div>
  )
}
