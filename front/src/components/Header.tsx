'use client'
import React, { useState, useEffect, useRef } from 'react'
import styles from '../style/Header.module.css'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import ButtonContactMe from './ButtonContactMe'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState<number | undefined>(0);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Efecto para manejar el hover
  useEffect(() => {
    const dropdown = dropdownRef.current;
    const content = contentRef.current;

    if (!dropdown || !content) return;

    const handleMouseLeave = () => {
      if (!content.matches(':hover')) {
        setIsOpen(false);
      }
    };

    dropdown.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      dropdown.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Efecto para calcular la altura del contenido
  useEffect(() => {
    if (isOpen) {
      const content = dropdownRef.current;
      setHeight(content?.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  const handleLinkClick = (isContactButton: boolean) => {
    if (!isContactButton) {
      setIsOpen(false);
    }
  };
  
  return (
    <div>
      <div className='bg-black h-[0rem]'>
        <img 
          className={styles.rocStartWhaterMark} 
          src="https://gist.githubusercontent.com/DavidRocFeler/1e71d964e24ce4beef6d5c18e9ed7080/raw/59d678e018f505b325002b6af79c29d107a135d0/StartShadow.svg" 
          alt="StartWaterMark" 
        />
        <img 
          className={styles.rocStartWhaterMark2} 
          src="https://gist.githubusercontent.com/DavidRocFeler/e7b4aa63689c9fd651afd3e0f54b4478/raw/24e6e59e3c4afb178660853376aec5f687232818/StartXL.svg" 
          alt="StartWaterMark" 
        />
      </div>
      <header className={styles.rocHeader}>
        <Link href='/' className='absolute left-[1rem] md:left-[2rem] top-[0.1rem]'>
          <img 
            src="https://gist.githubusercontent.com/DavidRocFeler/b61259a123f78d3776ca317ac2286063/raw/fabc8bc7f3883347360532f60bbd5c37d555ab5c/rocfelerLogo.svg" 
            alt="rocfelerLogo" 
          />
        </Link>
        
        <nav className={`${styles.rocNav}`}>
          <div className='hidden xxl:flex flex-row justify-evenly p-0 w-[100%]'>
            <Link href="/deploy">Deploys</Link>
            <Link href="/repositories">Repositories</Link>
            <Link href="/uxui">UX/UI</Link>
            <Link href="https://davidrocfeler.blogspot.com">Blog</Link>
            <Link href="/about">About</Link>
            <a href="">Resources</a>         
          </div>
        </nav>

        <div className='flex flex-row absolute right-[1rem] xxl:right-[3rem] h-[2rem] xxl:h-[2.34rem]'>
          <ButtonContactMe/>
          <div className="block xxl:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <Menu size={32} color="white" />
            </button>
          </div>
        </div>

        {/* Dropdown menu con animación */}
        <ul 
          ref={dropdownRef}
          className={`absolute top-[5.4rem] bg-black text-white p-4 space-y-2 z-50 w-[100%] border-[#4E4E4E] border-[1px] border-solid overflow-hidden transition-[height] duration-300 ease-in-out opacity-0 ${isOpen ? 'opacity-100' : ''}`}
          style={{ 
            height: height ? `${height}px` : '0px',
            visibility: height === 0 ? 'hidden' : 'visible',
            position: height === 0 ? 'absolute' : 'fixed'
          }}
        >
          <div ref={contentRef}>
            <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2 text-center rounded-[10px]'>
              <Link href="/deploy" onClick={() => handleLinkClick(false)}>Deploys</Link>
            </li>
            <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2  text-center rounded-[10px]'>
              <Link href="/repositories" onClick={() => handleLinkClick(false)}>Repositories</Link>
            </li>
            <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2  text-center rounded-[10px]'>
              <Link href="/uxui" onClick={() => handleLinkClick(false)}>UX/UI</Link>
            </li>
            <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2  text-center rounded-[10px]'>
              <Link href="https://davidrocfeler.blogspot.com" onClick={() => handleLinkClick(false)}>Blog</Link>
            </li>
            <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2  text-center rounded-[10px]'>
              <Link href="/about" onClick={() => handleLinkClick(false)}>About</Link>
            </li>
            <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2  text-center rounded-[10px]'>
              <a href="" onClick={() => handleLinkClick(false)}>Resources</a>
            </li>
            <button 
              className={`${styles.rocButton}`}
              onClick={() => handleLinkClick(true)}
            >
              Contact me
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 16"
                fill="currentColor"
                className="mt-[0.75rem] ml-[0.46rem] w-[1.5rem] h-auto"
              >
                <path d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM4 4.5H15V3.5H4V4.5Z" />
              </svg>
            </button>
          </div>
        </ul>
      </header>
      
      <svg height="1" width="100%" className='xxl:mt-0 mt-[3rem]'>
        <line x1="0" y1="0" x2="100%" y2="0" className='stroke-white stroke-opacity-50 stroke-[0.3]'/>
      </svg>
    </div>
  )
}

export default Header