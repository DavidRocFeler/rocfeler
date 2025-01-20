'use client'
import React from 'react'
import Infinity from '@/components/Infinitiy';
import styles from '../style/Home.module.css'
import ButtonContactMe from '@/components/ButtonContactMe';
import DeployContent from '@/components/DeployContent';
import { deployContentHelpers } from '@/helpers/Deploy.helpers'
import { techIconHelpers } from '@/helpers/TechIcon.helpers';
import TechIcon from '@/components/TechIcon';
import { useEffect, useState, useRef } from 'react';
import BrandingIcon from '@/components/BrandingIcon';
import { brandingHelpers } from '@/helpers/Branding.helpers';
import LazyIframe from '@/components/LazyIframe';
import { mainTitleHelpers } from '@/helpers/MainTitle.helpers';
import MainTitle from '@/components/MainTitle';
import { useRouter } from 'next/navigation';

const HomeView: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(0);
  const containerRefRight = useRef<HTMLDivElement | null>(null);
  const [positionRight, setPositionRight] = useState(0);
  const router = useRouter();
  
  const handleNavigationRepo = () => {
    router.push('/repositories')
  }

  const handleNavigationUX = () => {
    router.push('/uxui')
  }

  const handleBRedirectMyGithub = () => {
    window.open('https://github.com/DavidRocFeler', '_blank')
  }

  useEffect(() => {
    const container = containerRefRight.current;
    if (!container) return;
  
    const speed = 2; // Ajusta la velocidad
    let animationFrameId: number;
  
    const animateRight = () => {
      setPositionRight((prev) => {
        const resetPosition = -container.scrollWidth / 2; // Cambia el punto de reinicio
        return prev >= 0 ? resetPosition : prev + speed; // Incrementa para moverse hacia la derecha
      });
      animationFrameId = requestAnimationFrame(animateRight);
    };
  
    animateRight();
  
    return () => cancelAnimationFrame(animationFrameId); // Limpia el loop al desmontar
  }, []);  

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const speed = 2;
    let animationFrameId: number;

    const animate = () => {
      setPosition((prev) => {
        const resetPosition = -container.scrollWidth / 2; 
        return prev <= resetPosition ? 0 : prev - speed;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId); // Limpia el loop al desmontar
  }, []);

  const mainTitle1 = mainTitleHelpers.find((item) => item.id === 1)

  return (
    <div>
        <div className='flex flex-col leading-[1rem] h-[9rem] mt-[10rem] mb-[4rem]'>
          <h1 className={styles.rocTitle2}>Empower your Future with </h1>
          {mainTitle1 && <MainTitle title={mainTitle1.title } />}
        </div>

        <p className='w-[70%] m-auto text-center text-[#B2B2B2]'>Visionary passionate about innovation, focused on AI, Blockchain, front-end design, and user experience. Committed 
          to inclusion, sustainability, and change, dedicated to building a better world through technology and design.
        </p>

        <div className='mt-[3rem] mb-[5rem]'>
          <ButtonContactMe/>
        </div>

        <div className="grid grid-cols-3 gap-x-[2rem] w-[90%] m-auto">
          {deployContentHelpers.map((item) => (
            <DeployContent 
              key={item.id} 
              image={item.image} 
              link={item.link} 
              imageSize={item.imageSize} 
            />
          ))}
        </div>
        
        <div className="overflow-hidden mt-[3rem]">
          <div
            className="flex fles-row w-[200%] justify-around items-center"
            ref={containerRef}
            style={{ transform: `translateX(${position}px)` }}
          >
            {techIconHelpers.map((item) => (
              <TechIcon
                key={item.id}
                image={item.image}
                imageSize={item.imageSize}
              />
            ))}
            {techIconHelpers.map((item) => (
              <TechIcon
                key={`${item.id}-duplicate`}
                image={item.image}
                imageSize={item.imageSize}
              />
            ))}
          </div>
        </div>
   
        <div className='w-[90%] m-auto mt-[10rem] flex flex-row justify-around items-center'>
          <button onClick={handleBRedirectMyGithub} className={styles.rocButtonRepositories}>
            <img className='w-[25rem] h-auto border-solid border-[1px] border-[#3D444D] rounded-[20px]' src="https://gist.githubusercontent.com/DavidRocFeler/bff416156bd7ff1c8ec68b4634d1dfde/raw/65649adf05fe272d033ffc28d8499629c2b87ef0/Respositories.svg" alt="" />
          </button>
          <aside className='w-[30%] h-fit'>
            <h2 className={styles.rocTitle3}>
                Active Github
                contributor
            </h2>
            <p className='text-[#B2B2B2] text-[1.5rem] mt-[4rem] mb-[4rem]'>
                I actively participate in the GitHub community, contributing 
                solutions and improving projects. I master version control with 
                efficient practices, such as branch management and conflict 
                resolution, ensuring organized and collaborative workflows.
            </p>
            <button 
            onClick={handleNavigationRepo}
            className={styles.rocButton}>
                See more 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 16"
                  fill="currentColor"
                  className="mt-[0.75rem] ml-[0.46rem] w-[1.5rem] h-auto"
                  >
                  <path d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM4 4.5H15V3.5H4V4.5Z" />
                </svg>
            </button>
          </aside>
        </div>

        <div className='w-[90%] m-auto mt-[10rem] h-auto flex flex-col'>
          <div className='flex flex-row justify-around w-[90%] m-auto items-center'>
            <aside className='w-[40%] h-fit relative'>
              <h2 className={styles.rocTitle3}>
                Creating experiences
              </h2>
              <p className='text-[#B2B2B2] text-[1.5rem] mt-[4rem]'>
                I&#39;m deeply passionate about design, I master advanced tools to create innovative solutions. Understanding customer needs drives my focus and commitment to delivering quality user experiences. I have transformed my passion into a satisfying profession that I truly enjoy.
              </p>
              <button onClick={handleNavigationUX} className='text-[#2dbd2d] text-[1.5rem] absolute left-[4.5rem] bottom-0'> See more </button>
            </aside>
            <LazyIframe/>
          </div>
        </div>

        <div className="overflow-hidden mt-[3rem]">
            <div
              className="flex flex-row w-[200%] justify-around items-center"
              ref={containerRefRight}
              style={{ transform: `translateX(${positionRight}px)` }}
            >
              {brandingHelpers.map((item) => (
                <BrandingIcon
                  key={item.id}
                  image={item.image}
                  imageSize={item.imageSize}
                />
              ))}
              {brandingHelpers.map((item) => (
                <BrandingIcon
                  key={`${item.id}-duplicate`}
                  image={item.image}
                  imageSize={item.imageSize}
                />
              ))}
            </div>
        </div>    
    
    </div>
  )
}

export default HomeView;