import { ICoverDeployCarouselProps } from '@/interfaces/types'
import React, { useEffect, useState, useRef } from 'react'
import styles from '../style/CoverDeploy.module.css'

const CoverDeploy: React.FC<ICoverDeployCarouselProps> = ({ items }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollDirection, setScrollDirection] = useState(1)
  const [isScrolling, setIsScrolling] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const lastScrollTimeRef = useRef<number>(0)
  
  // Configuration
  const SCROLL_SPEED = 1.5 // Increased for better visibility
  const SCROLL_INTERVAL = 7000 // Overlay toggle interval in ms
  const FRAME_RATE = 1000 / 60 // 60 FPS

  useEffect(() => {
    setIsTouch('ontouchstart' in window)
  }, [])

  const handleMouseEnter = () => {
    setIsScrolling(false)
  }

  const handleMouseLeave = () => {
    setIsScrolling(true)
  }

  const handleRedirectDeploy = (link?: string) => {
    if (link) {
      window.open(link, '_blank')
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setShowOverlay(prev => !prev)
    }, SCROLL_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  // Improved smooth scroll effect
  useEffect(() => {
    if (isTouch || !isScrolling) return

    let animationFrameId: number

    const animate = (timestamp: number) => {
      const elapsed = timestamp - lastScrollTimeRef.current

      if (elapsed > FRAME_RATE) { // Limit to 60 FPS
        lastScrollTimeRef.current = timestamp

        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current
          const { scrollLeft, scrollWidth, clientWidth } = container
          const maxScroll = scrollWidth - clientWidth

          // Change direction at boundaries with a small buffer
          if (scrollLeft >= maxScroll - 2) {
            setScrollDirection(-1)
          } else if (scrollLeft <= 2) {
            setScrollDirection(1)
          }

          // Calculate new scroll position with delta time
          const delta = SCROLL_SPEED * (elapsed / FRAME_RATE)
          const newScrollLeft = scrollLeft + (delta * scrollDirection)

          // Apply scroll with requestAnimationFrame for smoother animation
          container.scrollLeft = newScrollLeft
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [scrollDirection, isTouch, isScrolling])

  const handleTouchStart = () => {
    setIsScrolling(false)
  }

  const handleTouchEnd = () => {
    // Add a small delay before resuming automatic scroll
    setTimeout(() => setIsScrolling(true), 1000)
  }

  return (
    <section className="relative w-full">
      <div
        ref={scrollContainerRef}
        className={`${styles.scrollContainer} w-full overflow-x-auto relative scroll-smooth`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex">
          {items.map((item) => (
            <img
              key={item.id}
              className={`cursor-pointer object-cover h-[300px] min-w-[800px] sm:min-w-full sm:h-auto transition-all duration-1500 ease-in-out ${
                showOverlay ? 'opacity-60' : 'opacity-60'
              }`}
              src={item.img}
              alt={`Project ${item.id}`}
              onClick={() => handleRedirectDeploy(item.link)}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoverDeploy