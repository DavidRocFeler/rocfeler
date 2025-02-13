'use client'
import React, { useState, useEffect, useRef } from 'react'
import styles from '../style/Header.module.css'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import ButtonContactMe from './ButtonContactMe'
import { usePathname } from 'next/navigation'
import ContactModal from './ContactModal'
import EmailForm from './EmailForm'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [ contacOpentModal, setContactOpenModal ] = useState(false);

  const handleOpenModal = () => {
    setContactOpenModal(!contacOpentModal);
  }

  const pathname = usePathname();

  const isDeployPath = pathname === '/deploy';


  // Manejar el cierre del menú al salir del contenedor
  useEffect(() => {
    const dropdown = dropdownRef.current;

    if (!dropdown) return;

    const handleMouseLeave = () => {
      setIsOpen(false);
    };

    dropdown.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      dropdown.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Manejar el clic en enlaces o el botón para cerrar el menú
  useEffect(() => {
    const content = contentRef.current;

    if (!content) return;

    const handleContentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        setIsOpen(false);
      }
    };

    content.addEventListener('click', handleContentClick);

    return () => {
      content.removeEventListener('click', handleContentClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className='pt-[1rem]'>
      <div id='rocStart' className=' h-0 relative'>
        <img 
          className={`${styles.rocStartWhaterMark} ${isDeployPath ? 'opacity-0' : ''}`} 
          src="https://gist.githubusercontent.com/DavidRocFeler/1e71d964e24ce4beef6d5c18e9ed7080/raw/59d678e018f505b325002b6af79c29d107a135d0/StartShadow.svg" 
          alt="StartWaterMark" 
        />
        <img 
          className={`${styles.rocStartWhaterMark2} ${isDeployPath ? 'opacity-0' : ''}`} 
          src="https://gist.githubusercontent.com/DavidRocFeler/e7b4aa63689c9fd651afd3e0f54b4478/raw/24e6e59e3c4afb178660853376aec5f687232818/StartXL.svg" 
          alt="StartWaterMark" 
        />
      </div>
      <header className={styles.rocHeader}>
        <Link href='/' className='absolute left-[1rem] md:left-[2rem] top-[0.1rem]'>
          <img 
            src="/rocfeler.png" 
            alt="rocfelerLogo" 
          />
        </Link>
        
         <nav className={`${styles.rocNav}`}>
          <div className="hidden xxl:flex flex-row justify-evenly p-0 w-[100%]">
            <Link 
              href="/deploy" 
              className={`${pathname === '/deploy' ? 'font-bold' : 'text-white font-[250]'}`}
            >
              Deploys
            </Link>
            <Link 
              href="/repositories" 
              className={`${pathname === '/repositories' ? 'font-bold' : 'text-white font-[250]'}`}
            >
              Repositories
            </Link>
            <Link 
              href="/uxui" 
              className={`${pathname === '/uxui' ? 'font-bold' : 'text-white font-[250]'}`}
            >
              UX/UI
            </Link>
            <Link 
              href="https://davidrocfeler.blogspot.com" 
              className="text-white font-[250]"
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              className={`${pathname === '/about' ? 'font-bold' : 'text-white font-[250]'}`}
            >
              About
            </Link>
            <a href="" className="text-white font-[250]">
              Resources
            </a>
          </div>
        </nav>

        <div className='flex flex-row absolute right-[1rem] xxl:right-[3rem] h-[2rem] xxl:h-[2.34rem]'>
          <ButtonContactMe
          toggleModal={handleOpenModal}
          />
          <div className="block xxl:hidden">
            <button onClick={toggleMenu}>
              <Menu size={32} color="white" />
            </button>
          </div>
        </div>
      </header>

      {/* Dropdown fuera del header */}
      <ul 
        ref={dropdownRef}
        className={`absolute top-[4.4rem] bg-black text-white p-4 space-y-2 z-50 w-[100%] border-[#4E4E4E] border-[1px] border-solid overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div ref={contentRef}>
          <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2 text-center rounded-[10px]'>
            <Link href="/deploy">Deploys</Link>
          </li>
          <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2 text-center rounded-[10px]'>
            <Link href="/repositories">Repositories</Link>
          </li>
          <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2 text-center rounded-[10px]'>
            <Link href="/uxui">UX/UI</Link>
          </li>
          <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2 text-center rounded-[10px]'>
            <Link href="https://davidrocfeler.blogspot.com">Blog</Link>
          </li>
          <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2 text-center rounded-[10px]'>
            <Link href="/about">About</Link>
          </li>
          <li className='hover:bg-[#1F1F1F] py-[0.35rem] mb-2 text-center rounded-[10px]'>
            <a href="">Resources</a>
          </li>
          <button 
            className={`${styles.rocButton}`}
            onClick={handleOpenModal}
          >
            Contact me
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 16"
              fill="currentColor"
              className="mt-[0.75rem] ml-[0.46rem] w-[1.5rem] h-auto"
            >
              <path d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553L15.3536 4.35355ZM4 4.5H15V3.5H4V4.5Z" />
            </svg>
          </button>
        </div>
      </ul>

      <svg height="1" width="100%" className='xxl:mt-0 mt-[3rem]'>
        <line x1="0" y1="0" x2="100%" y2="0" className='stroke-white stroke-opacity-50 stroke-[0.3]'/>
      </svg>
      {contacOpentModal && (
        <div className="fixed z-[9999] inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[90%] sm:w-[50%] xxl:w-[30%] h-[27rem] p-6 rounded-[10px] relative pt-[2rem]">
            <button 
              className="absolute top-0 right-[0.375rem] text-gray-600 hover:text-gray-900"
              onClick={handleOpenModal}
            >
              ✖
            </button>
            <ContactModal />
            <EmailForm/>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header;
