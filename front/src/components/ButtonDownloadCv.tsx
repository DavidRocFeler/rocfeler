import React from 'react'
import styles from '../style/ButtonDownload.module.css'

const ButtonDownloadCv: React.FC = () => {
  return (
    <a 
      href="/DAVID_PALOMINO_UX_FRONT-END.pdf" // Ruta correcta si el archivo está en public/
      download="DAVID_CV_2025.pdf" // Nombre del archivo al descargarlo
      className={styles.rocButton}
    >
      Download CV
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 16"
        fill="currentColor"
        className="mt-[0.75rem] ml-[0.46rem] w-[1.5rem] h-auto"
      >
        <path d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM4 4.5H15V3.5H4V4.5Z" />
      </svg>
    </a>
  )
}

export default ButtonDownloadCv;
