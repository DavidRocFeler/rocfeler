'use client';
import MainTitle from '@/components/MainTitle';
import ProfileShadow from '@/components/ProfileShadow';
import React, { useState, useEffect } from 'react';
import { mainTitleHelpers } from '@/helpers/MainTitle.helpers';
import { aboutInfoHelpers } from '@/helpers/AboutInfo.helpers';
import AboutInfo from '@/components/AboutInfo';
import MissionVision from '@/components/MissionVision';
import { missionVissionHelpers } from '@/helpers/MissionVision.helpers';

const AboutView: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setActiveIndex((prev) => (prev === 0 ? 1 : 0));
        setSlideDirection((prev) => (prev === 'left' ? 'right' : 'left'));
        setIsAnimating(false);
      }, 500);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getTransform = (componentIndex: number) => {
    if (!isAnimating) {
      return activeIndex === componentIndex ? 'translateX(0)' : 
             slideDirection === 'left' ? 'translateX(100%)' : 'translateX(-100%)';
    }

    if (activeIndex === componentIndex) {
      return slideDirection === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
    } else {
      return 'translateX(0)';
    }
  };

  return (
    <div>
      <ProfileShadow />
      <div className="h-[9rem] mt-[10rem] mb-[4rem]">
        {mainTitleHelpers.find((item) => item.id === 2) && (
          <MainTitle title={mainTitleHelpers.find((item) => item.id === 2)!.title} />
        )}
      </div>

      <p className="w-[70%] m-auto text-center text-[#B2B2B2] mb-[5rem]">
        After studying International Business, I discovered my passion for design and creating innovative ideas that positively impact society by combining sustainability, economics, and technology.
      </p>

      <div className="grid grid-rows-4 grid-cols-1 mb-[5rem]">
        {aboutInfoHelpers.map((item) => (
          <AboutInfo key={item.id} image={item.image} info={item.info} flex={item.flex} />
        ))}
      </div>

      
      <div className="w-[100%] m-auto flex flex-col justify-center items-center">
        <div className="relative h-[21rem] w-full overflow-hidden">
          <div
            className="absolute w-full transition-all duration-500"
            style={{
              transform: getTransform(0),
              opacity: activeIndex === 0 || isAnimating ? 1 : 0,
            }}
          >
            <MissionVision {...missionVissionHelpers[0]} />
          </div>

          <div
            className="absolute w-full transition-all duration-500"
            style={{
              transform: getTransform(1),
              opacity: activeIndex === 1 || isAnimating ? 1 : 0,
            }}
          >
            <MissionVision {...missionVissionHelpers[1]} />
          </div>
        </div>

        <div className="flex flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" className="flex justify-center items-center">
            <circle cx="50" cy="50" r="10" fill={activeIndex === 0 ? "#B3B2B9" : "transparent"} stroke="#B3B2B9" strokeWidth="1" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" className="flex justify-center items-center">
            <circle cx="50" cy="50" r="10" fill={activeIndex === 1 ? "#B3B2B9" : "transparent"} stroke="#B3B2B9" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
