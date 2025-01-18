import React from 'react';

interface Language {
  name: string;
  color: string;
  percentage: number;
}

interface LanguageBarProps {
  languages: Language[];
}

const LanguageBar: React.FC<LanguageBarProps> = ({ languages }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#21262d',
        borderRadius: '5px',
        overflow: 'hidden',
        display: 'flex',
      }}
    >
      {languages.map((language, index) => (
        <div
          key={index}
          style={{
            width: `${language.percentage}%`,
            backgroundColor: language.color,
          }}
        ></div>
      ))}
    </div>
  );
};

export default LanguageBar;

