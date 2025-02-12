import React from 'react';
import styles from '../style/ButtonDownload.module.css';

const ButtonDownloadCv: React.FC = () => {
  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    try {
      // Hacer fetch del archivo
      const response = await fetch('/DAVID_PALOMINO_UX_FRONTEND.pdf');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Convertir la respuesta a blob
      const blob = await response.blob();
      
      // Crear URL del blob
      const url = window.URL.createObjectURL(blob);
      
      // Crear elemento temporal para la descarga
      const link = document.createElement('a');
      link.href = url;
      link.download = 'DAVID_PALOMINO_UX_FRONTEND.pdf';
      
      // Agregar al DOM, hacer clic y remover
      document.body.appendChild(link);
      link.click();
      
      // Limpieza
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error al descargar el archivo. Por favor intenta de nuevo.');
    }
  };

  return (
    <a
      href="/DAVID_PALOMINO_UX_FRONTEND.pdf"
      onClick={handleDownload}
      className={styles.rocButton}
    >
      Download cv
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 16"
        fill="currentColor"
        className="mt-[0.75rem] ml-[0.46rem] w-[1.5rem] h-auto"
      >
        <path d="M15.3536 4.35355C15.5488 4.15829 15.5488 3.84171 15.3536 3.64645L12.1716 0.464466C11.9763 0.269204 11.6597 0.269204 11.4645 0.464466C11.2692 0.659728 11.2692 0.976311 11.4645 1.17157L14.2929 4L11.4645 6.82843C11.2692 7.02369 11.2692 7.34027 11.4645 7.53553C11.6597 7.7308 11.9763 7.7308 12.1716 7.53553L15.3536 4.35355ZM4 4.5H15V3.5H4V4.5Z" />
      </svg>
    </a>
  );
};

export default ButtonDownloadCv;