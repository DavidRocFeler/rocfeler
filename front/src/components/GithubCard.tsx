'use client';
import React, { useState, useEffect } from 'react';
import LanguageBar from './LenguajeBar';
import Loading from './Loading';

interface GitHubCardProps {
  name: string;
  htmlUrl: string;
  isPublic: boolean;
  languages: Record<string, number>;
}

const GitHubCard: React.FC<GitHubCardProps> = ({ name, htmlUrl, isPublic, languages }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos la carga de datos (puedes ajustar esto según tu lógica real)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simula un retraso de 2 segundos
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading width="241px" height="220px" />;
  }

  const totalBytes = Object.values(languages).reduce((acc, bytes) => acc + bytes, 0);

  const languageData = Object.entries(languages).map(([lang, bytes]) => {
    const percentage = (bytes / totalBytes) * 100;
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      CSS: '#563d7c',
      JavaScript: '#f1e05a',
      HTML: '#e34c26',
    };
    return {
      name: lang,
      color: colors[lang] || '#ddd',
      percentage: percentage,
    };
  });

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div
      style={{
        margin: 'auto',
        width: '241px',
        background: '#0d1117',
        height: '220px',
        border: '1px solid #3D444D',
        borderRadius: '10px',
        padding: '10px',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="w-fit flex flex-row items-center absolute top-2">
        <img
          src="https://gist.githubusercontent.com/DavidRocFeler/326dc25fe04947a3e0639238aab0d4a6/raw/99ac42c759861980da86360162c0d3c3ced10f40/GitHubLogoCard.svg"
          alt="GitHub Logo"
          style={{
            width: '24px',
            height: '24px',
            marginRight: '1rem',
          }}
        />
        <h3
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: '#357ac3',
          }}
        >
          {truncateText(name, 12)}
        </h3>
      </div>
      <a
        href={htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '11px',
          margin: 'auto',
          marginTop: '4rem',
          display: 'inline-block',
          paddingTop: '0.1rem',
          paddingBottom: '0.1rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          width: 'fit-content',
          backgroundColor: '#2f8f3f',
          color: '#fff',
          borderRadius: '5px',
          textDecoration: 'none',
          textAlign: 'center',
        }}
      >
        Code
      </a>
      <span
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '10px',
          border: '1px solid #3D444D',
          backgroundColor: 'transparent',
          padding: '2px 5px',
          borderRadius: '20px',
          fontWeight: '400',
          opacity: '0.5',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
        }}
      >
        {isPublic ? 'Public' : 'Private'}
      </span>
      <div style={{ marginTop: '10px' }}>
        <h4 style={{ fontSize: '14px', marginBottom: '5px' }}>Language</h4>
        <LanguageBar languages={languageData} />
        <ul style={{ marginTop: '10px', paddingLeft: '0' }} className="grid grid-cols-2 grid-rows-2 gap-x-2">
          {languageData.map((language, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '10px',
                marginBottom: '5px',
                color: '#ffffff',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: language.color,
                  display: 'inline-block',
                  marginRight: '8px',
                }}
              ></span>
              {language.name}{' '}
              <span style={{ opacity: '0.5', marginLeft: '0.5rem' }}>
                {language.percentage.toFixed(1)}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GitHubCard;
