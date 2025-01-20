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
        src="https://gist.githubusercontent.com/DavidRocFeler/fe8776e1826b2af2688f90e2abcbdb36/raw/ecb5c25aa99bc8609d3be058a251e2fe00a6f233/ProfileShadow.svg"
        alt="ProfileShadow"
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ProfileShadow;
