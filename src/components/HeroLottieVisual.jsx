import { useEffect, useRef } from 'react'
import './HeroLottieVisual.css'

export default function HeroLottieVisual() {
  const containerRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    Promise.all([
      import('lottie-web'),
      import('../assets/hero-banner-lottie.json')
    ]).then(([lottieModule, lottieData]) => {
      if (!isMounted || !containerRef.current) return
      const lottie = lottieModule.default || lottieModule
      containerRef.current.innerHTML = ''
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: lottieData.default || lottieData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid meet'
        }
      })
      if (anim && typeof anim.setSubframe === 'function') {
        anim.setSubframe(true)
      }
      animRef.current = anim
    }).catch(err => {
      console.warn('Hero Lottie animation deferred load error:', err)
    })

    return () => {
      isMounted = false
      if (animRef.current) {
        animRef.current.destroy()
        animRef.current = null
      }
    }
  }, [])

  return (
    <div className="hero-lottie-stage">
      {/* Subtle Ambient Glow */}
      <div className="hero-lottie-ambient-glow" aria-hidden="true" />

      {/* Clean Floating Vector Animation */}
      <div ref={containerRef} className="hero-lottie-player" />
    </div>
  )
}
