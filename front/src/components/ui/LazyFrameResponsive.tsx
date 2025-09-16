'use client'
import React, { useEffect, useState } from 'react';

const LazyIframeResponsive: React.FC = () => {
  const [isDomLoaded, setIsDomLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setIsDomLoaded(true);
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

  return (
    <div>
      {isDomLoaded && (
        <iframe
          className="rounded-[20px] w-[320px] h-[516px]"
          src="https://www.behance.net/embed/project/216112801?ilo0=1"
          allowFullScreen
          loading="lazy"
          allow="clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
    </div>
  );
};

export default LazyIframeResponsive;
