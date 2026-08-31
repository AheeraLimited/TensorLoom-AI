import { useRef, useState } from 'react'
import { Lottie } from 'lottie-react'
import navTabAnimation from '../assets/nav-tab.json'
import './AnimatedTabBar.css'

const TABS = [
  { id: 'power', label: 'Power', icon: '⚡' },
  { id: 'winners', label: 'Winners', icon: '⭐' },
  { id: 'security', label: 'Security', icon: '🛡️' },
  { id: 'awards', label: 'Awards', icon: '🎖️' },
  { id: 'profile', label: 'Profile', icon: '👤' }
]

export default function AnimatedTabBar({ activeTab, onTabChange }) {
  const lottieRef = useRef(null)
  const [currentTab, setCurrentTab] = useState(activeTab || 'power')

  const handleTabClick = (tabId, index) => {
    setCurrentTab(tabId)
    if (onTabChange) onTabChange(tabId)
    if (lottieRef.current) {
      // Jump/play frame corresponding to tab
      const frameMap = {
        power: [10, 43],
        winners: [60, 93],
        security: [120, 153],
        awards: [180, 213],
        profile: [240, 273]
      }
      const range = frameMap[tabId] || [0, 60]
      lottieRef.current.playSegments(range, true)
    }
  }

  return (
    <div className="animated-tab-wrapper tl-glass">
      <div className="animated-lottie-holder">
        <Lottie 
          lottieRef={lottieRef}
          animationData={navTabAnimation} 
          loop={true} 
          autoplay={true}
          className="lottie-tab-player"
        />
      </div>
      
      {/* Clickable Overlay Targets */}
      <div className="tab-click-overlay">
        {TABS.map((tab, idx) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-click-zone ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id, idx)}
            aria-label={tab.label}
          />
        ))}
      </div>
    </div>
  )
}
