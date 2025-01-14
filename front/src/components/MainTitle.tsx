import { IMainTitleprops } from '@/interfaces/types'
import React from 'react'
import styles from '../style/MainTitle.module.css'

const MainTitle: React.FC<IMainTitleprops> = ({title}) => {
  return (
    <>
      <h1 className={styles.rocTitle}> {title} </h1>
    </>
  )
}

export default MainTitle;