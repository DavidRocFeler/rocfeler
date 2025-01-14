import React from 'react'
import styles from '../style/ProfileShadow.module.css'

const ProfileShadow: React.FC = () => {
  return (
    <div>
        <img className={styles.rocProfileShadow} src="https://gist.githubusercontent.com/DavidRocFeler/fe3b1887e8c3b0bd252a24708b8db0a2/raw/78f450ae1215202f84ebb77c30ee36afd4f9120b/ProfileShadow.svg" alt="ProfileShadow" />
    </div>
  )
}

export default ProfileShadow