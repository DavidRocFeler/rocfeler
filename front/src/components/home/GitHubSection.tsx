import React from 'react'
import IphoneMockupGithub from '../ui/IphoneMuckUp'
import styles from '@/style/Home.module.css'

const GitHubSection = () => {
  return (
    <div className='w-[90%] m-auto mt-[10rem] flex flex-col lg:flex-row justify-around items-center'>
    <div className='lg:hidden'>
        <h2 className={styles.rocTitle3}>
          Active Github
          contributor
        </h2>
    </div>
    <IphoneMockupGithub
     className=""
    />
    <aside className='w-[80%] mt-0 lg:w-[40%] h-fit'>
      <div className='hidden lg:block'>
        <h2 className={styles.rocTitle3}>
        Active Github
        contributor
        </h2>
      </div>
      <p className='text-[#B2B2B2] font-light text-[1.5rem] mt-[2rem] xll:mt-[4rem] xll:mb-[4rem] mb-[3rem] text-center lg:text-right'>
          I actively participate in the GitHub community, contributing 
          solutions and improving projects. I master version control with 
          efficient practices, such as branch management and conflict 
          resolution, ensuring organized and collaborative workflows.
      </p>
      <button className='text-[#2dbd2d] text-[1.5rem] ml-auto mt-[2rem] hidden lg:block'> See more </button>
      <div className='lg:hidden'>
        <button 
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
      </div>
    </aside>
    </div>
  )
}

export default GitHubSection