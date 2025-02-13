import React from 'react'

const ContactModal: React.FC = () => {
  return (
    <div className='flex flex-col items-center'>
        <div className='flex flex-row items-center justify-between w-full mb-[1rem]'>
          <img src="/BehanceLogo.png" alt="BehanceIcon"/>
          <a href='https://www.behance.net/davidrocfeler' className='font-light text-[0.9rem]'>David Roc Feler </a>
        </div>

        <div className='flex flex-row items-center justify-between w-full mb-[1rem]'>
          <img src="/LinkedinLogoSvg.svg" alt="LinkedinIcon"/>
          <a href='https://www.linkedin.com/in/davidrocfeler/' className='font-light text-[0.9rem]'>David Roc Feler</a>
        </div>

        <div className='flex flex-row items-center justify-between w-full mb-[1rem]'>
          <img src="/LogoGitHubSvg.svg" alt="GithubIcon"/>
          <a href='https://github.com/DavidRocFeler' className='font-light text-[0.9rem]'>DavidRocFeler</a>
        </div>

        <div className='flex flex-row items-center justify-between w-full mb-[1rem]'>
            <img className="" src="/LogoGmail.png" alt="GmailIcom"/>
            <p className='font-light text-[0.9rem]'> davidrocfeler@gmail.com</p>
        </div>
  </div>
  )
}

export default ContactModal