import React, { useState, useEffect, useRef } from 'react';
import styles from '../style/ProfileShadow.module.css';

const ProfileShadow: React.FC = () => {
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
        className={`${styles.rocProfileShadow} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        src="https://gist.githubusercontent.com/DavidRocFeler/fe3b1887e8c3b0bd252a24708b8db0a2/raw/78f450ae1215202f84ebb77c30ee36afd4f9120b/ProfileShadow.svg"
        alt="ProfileShadow"
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ProfileShadow;
