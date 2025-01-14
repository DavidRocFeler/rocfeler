import React from 'react'
import styles from '../style/Header.module.css'
import Link from 'next/link'

const Header: React.FC = () => {
  return (
    <div>
         <img className={styles.rocStartWhaterMark} src="https://gist.githubusercontent.com/DavidRocFeler/1e71d964e24ce4beef6d5c18e9ed7080/raw/59d678e018f505b325002b6af79c29d107a135d0/StartShadow.svg" alt="StartWaterMark" />
         <header className={styles.rocHeader}>
            <Link href='/' className='absolute left-[2rem]'>
              <img src="https://gist.githubusercontent.com/DavidRocFeler/b61259a123f78d3776ca317ac2286063/raw/fabc8bc7f3883347360532f60bbd5c37d555ab5c/rocfelerLogo.svg" alt="rocfelerLogo" />
            </Link>
            <nav className={styles.rocNav}>
                <Link href="">Deploys</Link>
                <a href="">Repositories</a>
                <a href="">UX/UI</a>
                <a className='font-bold' href="">Blog</a>
                <Link href="/about">About</Link>
                <a href="">Resources</a>
            </nav>
            <button className={styles.rocButton}>
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
        </header>
        <svg height="1" width="100%" className='block'>
          <line x1="0" y1="0" x2="100%" y2="0" className='stroke-white stroke-opacity-50 stroke-[0.3]'/>
        </svg>
    </div>
  )
}

export default Header