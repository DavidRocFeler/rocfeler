'use client'
import { ICoverDeployCarouselProps } from '@/interfaces/types'
import React, { useEffect, useState, useRef } from 'react'
import styles from '../style/CoverDeploy.module.css'

const CoverDeploy: React.FC<ICoverDeployCarouselProps> = ({ items }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollDirection, setScrollDirection] = useState(1) // 1 = Derecha, -1 = Izquierda
  const scrollSpeedRef = useRef(0.1) // Velocidad constante del scroll
  const [showOverlay, setShowOverlay] = useState(false)

  const handleRedirectDeploy = (link?: string) => {
    if (link) {
      window.open(link, '_blank') // Abre el enlace en una nueva pestaña
    } else {
      console.warn('No link provided for this item.') // Advertencia si no hay enlace
    }
  }

   // Efecto para cambiar la opacidad cada 7 segundos
   useEffect(() => {
    const interval = setInterval(() => {
      setShowOverlay(prev => !prev)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  // Efecto mejorado para el auto-scroll suave bidireccional
  useEffect(() => {
    let animationFrameId: number
    let lastTimestamp = 0
    
    const smoothScroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const deltaTime = timestamp - lastTimestamp
      lastTimestamp = timestamp

      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        const maxScroll = scrollWidth - clientWidth

        // Cambiar dirección al llegar a los límites
        if (scrollLeft >= maxScroll) {
          setScrollDirection(-1)
        } else if (scrollLeft <= 0) {
          setScrollDirection(1)
        }

        // Aplicar el scroll con velocidad constante
        const scrollAmount = scrollSpeedRef.current * deltaTime * scrollDirection
        scrollContainerRef.current.scrollLeft += scrollAmount
      }

      animationFrameId = requestAnimationFrame(smoothScroll)
    }

    animationFrameId = requestAnimationFrame(smoothScroll)
    return () => cancelAnimationFrame(animationFrameId)
  }, [scrollDirection])

  return (
    <section className="relative w-full">
      <div
        ref={scrollContainerRef}
        className={`${styles.scrollContainer} w-full overflow-x-auto relative scroll-smooth`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth'
        }}
      >
        <div className="flex">
          {items.map((item) => (
            <img
              key={item.id}
              className={`cursor-pointer object-cover h-[300px] min-w-[800px] sm:min-w-full sm:h-auto transition-all duration-1500 ease-in-out ${
                showOverlay ? 'opacity-30' : 'opacity-60'
              }`}
              src={item.img}
              alt={`Project ${item.id}`}
              onClick={() => handleRedirectDeploy(item.link)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoverDeploy;

