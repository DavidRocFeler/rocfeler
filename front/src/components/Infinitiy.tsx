'use client'
import React from 'react'
import { useEffect, useState, useRef } from 'react';
import styles from '../style/Infinity.module.css'

const Infinity: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div>
          {!isLoaded && <div className="h-[300px] w-[300px] animate-pulse"></div>}
          <img
            ref={imgRef}
            className={`${styles.RocInfinity} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
            src="https://gist.githubusercontent.com/DavidRocFeler/91cadb969668650c62e7be9d70d10a06/raw/a38e52da39c9177e02d0bed2f3b46d7291333536/InfinityCover.svg"
            alt="Infinity"
            onLoad={handleImageLoad}
          />
    </div>
    
  )
}

export default Infinity;