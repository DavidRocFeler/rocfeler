'use client'
import React, { useEffect, useState, useRef } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import LazyIframeArray from '@/components/LazyFramesArray'
import { IScrollListCardProps } from '@/interfaces/types'

const ScrollListCard: React.FC<IScrollListCardProps> = ({title, lazyFrames}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showRightNav, setShowRightNav] = useState(true)
  const [showLeftNav, setShowLeftNav] = useState(false)
  const [showRightShadow, setShowRightShadow] = useState(true)
  const [showLeftShadow, setShowLeftShadow] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  useEffect(() => {
    handleScroll()
  }, [isLoaded])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      
      const isAtStart = scrollLeft <= 10
      const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10

      setShowRightNav(!isAtEnd)
      setShowLeftNav(!isAtStart)
      setShowRightShadow(!isAtEnd)
      setShowLeftShadow(!isAtStart && scrollLeft > 0)
    }
  }

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.children[0] as HTMLElement
      const itemWidth = firstChild?.offsetWidth || 300 
      
      scrollContainerRef.current.scrollBy({
        left: itemWidth * 3, 
        behavior: 'smooth'
      })
    }
  }

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const firstChild = scrollContainerRef.current.children[0] as HTMLElement
      const itemWidth = firstChild?.offsetWidth || 300
      
      scrollContainerRef.current.scrollBy({
        left: -(itemWidth * 3), 
        behavior: 'smooth'
      })
    }
  }

  return (
    <div>
      {!isLoaded && <div className="h-[300px] w-full animate-pulse"></div>}
      <div
        className={`mt-[2rem] px-[2rem] flex flex-col ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-700`}
      >
        <h3 className="text-white font-bold mb-[1rem]">
          {title}
        </h3>
        <div 
        ref={containerRef}
        className="relative group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={(e) => {
          const relatedTarget = e.relatedTarget as Node | null;
          
          if (!relatedTarget || !containerRef.current) {
            setIsHovering(false);
            return;
          }
        
          try {
            if (containerRef.current.contains(relatedTarget)) {
              return;
            }
          } catch (error) {
            console.log('Error checking contains:', error);
          }
          
          setIsHovering(false);
        }}  
        >
          {showRightShadow && (
            <div 
              className="absolute right-0 top-0 bottom-0 w-[4rem] z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to left, rgba(0,0,0,0.8), rgba(0,0,0,0))'
              }}
            />
          )}
          {showLeftShadow && (
            <div 
              className="absolute left-0 top-0 bottom-0 w-[4rem] z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0))'
              }}
            />
          )}

          <div
            id="LazyFram"
            ref={scrollContainerRef}
            className="flex flex-row overflow-x-auto relative scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            onScroll={handleScroll}
          >
            <style jsx global>{`
              #LazyFram::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {lazyFrames.map((item) => (
              <LazyIframeArray key={item.id} {...item} />
            ))}
          </div>
          
          {(showRightNav && isHovering) && (
            <button
              onClick={handleScrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 
                       bg-black/50 hover:bg-black/80 
                       w-12 h-12 rounded-full 
                       flex items-center justify-center
                       transition-all duration-300
                       z-20"
              style={{
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
              }}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}

          {(showLeftNav && isHovering) && (
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 
                       bg-black/50 hover:bg-black/80 
                       w-12 h-12 rounded-full 
                       flex items-center justify-center
                       transition-all duration-300
                       z-20"
              style={{
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
              }}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScrollListCard;