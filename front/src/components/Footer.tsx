'use client'
import React from 'react'
import styles from '../style/Footer.module.css'

const Footer: React.FC = () => {
  const handleRedirectBehance = () => {
    window.open('https://www.behance.net/davidrocfeler', '_blank')
  }

  const handleRedirectLinkedin = () => {
    window.open('https://www.linkedin.com/in/davidrocfeler/', '_blank')
  }
  const handleRedirectGithub = () => {
    window.open('https://github.com/DavidRocFeler', '_blank')
  }
  return (
    <footer className={styles.rocFooter}>
        <div className="mb-[2.4rem] w-[100%]">
            <svg height="1" width="100%" className='block'>
                <line x1="0" y1="0" x2="100%" y2="0" className='stroke-white stroke-opacity-50 stroke-[0.3]'/>
            </svg>
        </div>
        <div className={styles.rocFooter2}>
          <img className="w-[2.3rem] h-[2.3rem] opacity-[0.5]" src="https://gist.githubusercontent.com/DavidRocFeler/a82bad0263f099b49fd71551c9d10710/raw/e4c64a225ae5559b3aac2420f89248593ac9878a/GmailIcom.svg" alt="GmailIcom"/>
          <p> davidrocfeler@gmail.com</p>
          <button onClick={handleRedirectBehance}>
            <img className="w-[1.5rem] h-[1.5rem] opacity-[0.5]" src="https://gist.githubusercontent.com/DavidRocFeler/94a5ae0992375ddd8e63232ba5c9c015/raw/45e320926596349e767fa5da288dab079d7a05fb/BehanceIcon.svg" alt="BehanceIcon"/>
          </button>
          <a>https://www.behance.net/davidrocfeler</a>
          <button onClick={handleRedirectLinkedin}>
            <img className="w-[1.65rem] h-[1.65rem] opacity-[0.5]" src="https://gist.githubusercontent.com/DavidRocFeler/f49db0827e71b8c3516a822c7d644808/raw/f5ee6b35b6d251cfc42f348e9257e8b5346fa20b/LinkedingIconBalckWhite.svg" alt="LinkedinIcon"/>
          </button>
          <a>https://www.linkedin.com/in/davidrocfeler/</a>
          <button onClick={handleRedirectGithub}>
            <img className="w-[1.7rem] h-[1.7rem]" src="https://gist.githubusercontent.com/DavidRocFeler/773312ea20e3b8090310332bc43f96f5/raw/ea0b666f534cb8cb6a5b6e698ad0aab9a025a6f1/Github.svg" alt="GithubIcon"/>
          </button>
          <a>https://github.com/DavidRocFeler</a>
        </div>
    </footer>
  )
}

export default Footer;