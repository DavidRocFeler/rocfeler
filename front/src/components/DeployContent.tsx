import React from 'react'
import styles from '../style/DeployContent.module.css'
import { IDeployContentProps } from '@/interfaces/types';

const DeployContent: React.FC<IDeployContentProps> = ({image, link, imageSize}) => {
  return (
    <>
        <button
            // href='https://ingenius-lydg.vercel.app' 
            className={styles.rocDeployContent}>
            <img className={`h-auto ${imageSize}`} src={image} alt="LogoIngeius" />
            <p className=' text-[#B2B2B2] mt-[1rem]'>{link}</p>
        </button>
    </>
  )
}

export default DeployContent;