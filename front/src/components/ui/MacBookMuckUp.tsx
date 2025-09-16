import React from 'react';

interface MacBookMockupProps {
  children?: React.ReactNode; // Para poder pasar LazyIframe como children
}

const MacBookMockup: React.FC<MacBookMockupProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center max-w-fit mx-auto">
      <div 
        className="marvel-device macbook" 
        style={{ 
          transform: 'scale(0.5)', 
          transformOrigin: 'center',
          margin: '-150px -230px' // Reducir el espacio extra que genera marvel-devices
        }}
      >
        <div className="top-bar"></div>
        <div className="camera"></div>
        <div className="screen">
          {/* Renderizar LazyIframe como children */}
          <div className="w-full h-full mt-2 overflow-hidden"> {/* ✅ Contenedor para el iframe */}
            {children || (
              <div className="w-full">
                <p className="text-white">Loading...</p>
              </div>
            )}
          </div>
        </div>
        <div className="bottom-bar"></div>
      </div>
    </div>
  );
};

export default MacBookMockup;