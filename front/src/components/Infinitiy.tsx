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
            src="https://gist.githubusercontent.com/DavidRocFeler/3233f6dfa587a743afcd5d8a1ad7ed3a/raw/56506e4e7f2feb84d15f6b2303eb4ae4e592e83f/infinityCover.svg"
            alt="Infinity"
            onLoad={handleImageLoad}
          />
    </div>
    
  )
}

export default Infinity;