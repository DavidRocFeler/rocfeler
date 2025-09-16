import React from 'react';

interface IphoneMockupGithubProps {
  className?: string;
}

const IphoneMockupGithub: React.FC<IphoneMockupGithubProps> = ({ className }) => {
  return (
    <button className={className}>
      <div className="marvel-device iphone-x" style={{ transform: 'scale(0.7)', transformOrigin: 'center', marginBottom:'-6rem', marginTop: '-4rem'}}>
        <div className="notch">
          <div className="camera"></div>
          <div className="speaker"></div>
        </div>
        <div className="top-bar"></div>
        <div className="sleep"></div>
        <div className="bottom-bar"></div>
        <div className="volume"></div>
        <div className="overflow">
          <div className="shadow shadow--tr"></div>
          <div className="shadow shadow--tl"></div>
          <div className="shadow shadow--br"></div>
          <div className="shadow shadow--bl"></div>
        </div>
        <div className="inner-shadow"></div>
        <div className="screen">
          {/* Aquí irá el contenido de GitHub más adelante */}
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-center">
              <h3 className="text-lg font-semibold mb-2">GitHub Repositories</h3>
              <p className="text-sm opacity-75">Loading repositories...</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default IphoneMockupGithub;