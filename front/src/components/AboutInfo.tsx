import { IAboutInfoProps } from '@/interfaces/types'
import React from 'react'

const AboutInfo: React.FC<IAboutInfoProps> = ({image, info, flex}) => {
  return (
    <div className={`flex ${flex} justify-around items-center w-[90%] m-auto`}>
        <img src={image} alt="" />
        <p className='text-center text-[#B2B2B2] w-[30%]'> {info} </p>
    </div>
  )
}

export default AboutInfo