import { IDeployArticleProps } from '@/interfaces/types';
import React from 'react'

const DeployArticle: React.FC<IDeployArticleProps> = ({text, tech, title, img, link}) => {
    const handleRedirectLink = () => {
        window.open(link, '_blank')
    }

  return (
        <div className='h-[34rem] s:h-[30rem] relative border w-[100%] m-auto border-purple-500 rounded-2xl shadow-lg p-4 hover:shadow-purple-500 transition'>
            <article className='text-white w-[90%] m-auto mt-[0.6rem]'>
                <h1 className='text-[1rem]'> {title} </h1>
                <p className='text-[0.9rem] mt-[1rem] opacity-[0.7]'> {text} </p>
                <p className='mt-[2rem] text-purple-500'> {tech} </p>
            </article>

    
            <img  className='absolute bottom-[1rem]' src={img} alt="" />
            <div className='absolute bottom-[1rem] right-[1rem] flex flex-row'>
                <button onClick={handleRedirectLink} className='font-bold text-[0.9rem] mr-[1rem] text-white pt-[0.2rem]'>
                    See Project
                </button>
                <img onClick={handleRedirectLink} className='cursor-pointer' src="/VectorRedirect.svg" alt="" />     
            </div> 

        </div>      
  )
}

export default DeployArticle;