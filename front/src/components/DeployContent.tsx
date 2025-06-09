import React from 'react'
import styles from '../style/DeployContent.module.css'
import { IDeployContentProps } from '@/interfaces/types';

const DeployContent: React.FC<IDeployContentProps> = ({image, link, imageSize,}) => {
  const handleRedirectIngenius = () => {
    window.open(link, '_blank')
  }
  return (
    <>
        <button
            onClick={handleRedirectIngenius}
            className={styles.rocDeployContent}>
            <img className= 'w-auto h-[4rem]' src={image} alt="Logo" />
            <p className=' text-[#B2B2B2] mt-[1rem]'>{link}</p>
        </button>
    </>
  )
}

export default DeployContent;