'use client';
import { ILazyFrameProps } from '@/interfaces/types';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';

const LazyIframeArray: React.FC<ILazyFrameProps> = ({src, h, w}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoaded(true);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div>
      {!isLoaded && <Loading width={w} height={h} />}
      <iframe
        className={`rounded-[10px] ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500 mr-[1.7rem] border-solid border-[1px] border-[#3D444D]`}
        src={src}
        height={h}
        width={w}
        allowFullScreen
        loading="lazy"
        allow="clipboard-write"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={handleIframeLoad}
      />
    </div>
  );
};

export default LazyIframeArray;


