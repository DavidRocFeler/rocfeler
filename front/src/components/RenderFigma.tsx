'use client';
import React, { useEffect, useState } from 'react';
import { fetchFigmaData } from '@/server/RenderFigma.server';
import Loading from './Loading';

const RenderFigma: React.FC<{ fileKey: string }> = ({ fileKey }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [mainLogoUrl, setMainLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const getFigmaData = async () => {
      const data = await fetchFigmaData(fileKey);
      setThumbnailUrl(data.thumbnailUrl);
      setFileName(data.fileName);
      setMainLogoUrl(data.mainLogoUrl);
    };
    getFigmaData();
  }, [fileKey]);

  if (!thumbnailUrl) {
    return <Loading width="241px" height="198px" />;
  }

  return (
    <>
      <button
        style={{
          width: '241px',
          position: 'relative',
          textAlign: 'center',
          marginBottom: '20px',
          marginRight: '1.7rem',
        }}
      >
        <img
          className="border-solid border-[1px] border-white"
          src={thumbnailUrl}
          alt="Miniatura del archivo Figma"
          style={{
            width: '241px',
            height: '198px',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
        />
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '0 0 10px 10px',
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
            boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          {mainLogoUrl && (
            <img
              src={mainLogoUrl}
              alt="Main Logo"
              style={{ width: 'auto', height: '20px', objectFit: 'contain', marginRight: '0.5rem', marginLeft: '0.5rem' }}
            />
          )}
          <span
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#333',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {fileName}
          </span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
            alt="Figma Logo"
            style={{ width: '20px', height: '20px', position:'absolute', right: '1rem' }}
          />
        </div>
      </button>
    </>
  );
};

export default RenderFigma;