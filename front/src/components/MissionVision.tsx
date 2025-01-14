import React from 'react'
import styles from '../style/MissionVission.module.css'
import { IMissionVisionProps } from '@/interfaces/types'

const MissionVision: React.FC<IMissionVisionProps> = ({title, info}) => {
  return (
    <div className={styles.rocMissionVisionContent} >
        <h1 className={styles.rocTitle3}> {title} </h1>
        <p className='m-auto text-center text-[#B2B2B2] mt-[3rem]'>
          {info}
        </p>
    </div>
    
  )
}

export default MissionVision