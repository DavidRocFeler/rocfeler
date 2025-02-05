'use client';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { fetchGitHubProjects } from '@/server/FetchGithubProjects.server';
import GitHubCard from './GithubCard';

const GitHubProjectsList: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [languages, setLanguages] = useState<Record<string, Record<string, number>>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | ''>('');
  
  const getColumnsPerRow = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 500) return 1;      // móvil
      if (width < 900) return 2;      // tablet
      if (width < 1200) return 3;     // laptop
      if (width < 1440) return 4;     // desktop
      return 5;                       // pantalla grande
    }
    return 5;
  };

  const getMaxRowsForWidth = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1440) return 5;    // 5 filas en pantallas grandes
      return 4;                       // 4 filas en el resto
    }
    return 4;
  };

  const [columnsPerRow, setColumnsPerRow] = useState(getColumnsPerRow());
  const [maxRows, setMaxRows] = useState(getMaxRowsForWidth());
  const cardsPerPage = columnsPerRow * maxRows;

  useEffect(() => {
    const handleResize = () => {
      setColumnsPerRow(getColumnsPerRow());
      setMaxRows(getMaxRowsForWidth());
      setCurrentPage(1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reposData = await fetchGitHubProjects();
        setRepos(reposData);
        const languagesData: Record<string, Record<string, number>> = {};
        await Promise.all(
          reposData.map(async (repo: any) => {
            const response = await fetch(repo.languages_url, {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
              },
            });
            languagesData[repo.id] = await response.json();
          })
        );
        setLanguages(languagesData);
      } catch (error) {
        console.error('Error al obtener los repositorios o lenguajes:', error);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(repos.length / cardsPerPage);
  const indexOfLastItem = currentPage * cardsPerPage;
  const indexOfFirstItem = indexOfLastItem - cardsPerPage;
  const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);

  // Verificar si necesitamos paginación basado en el ancho de la pantalla
  const needsPagination = repos.length > columnsPerRow * maxRows;

  const calculateGridRows = () => {
    const itemCount = currentItems.length;
    return Math.ceil(itemCount / columnsPerRow);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSlideDirection('right');
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
      }, 50);
      setTimeout(() => {
        setSlideDirection('');
      }, 300);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSlideDirection('left');
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
      }, 50);
      setTimeout(() => {
        setSlideDirection('');
      }, 300);
    }
  };

  return (
    <div className="w-[95%] md:w-[80%] xl:w-[95%] mx-auto">
      <div className="overflow-hidden">
        <div 
          className={`
            grid 
            grid-cols-1 
            s:grid-cols-2 
            xl:grid-cols-3 
            xxl:grid-cols-4 
            xxxl:grid-cols-5
            gap-x-10 
            gap-y-10
            transition-transform duration-300 ease-in-out
            ${slideDirection === 'left' ? 'translate-x-[-100%] opacity-0' : ''}
            ${slideDirection === 'right' ? 'translate-x-[100%] opacity-0' : ''}
            ${!slideDirection ? 'translate-x-0 opacity-100' : ''}
          `}
          style={{
            gridTemplateRows: `repeat(${calculateGridRows()}, minmax(0, 1fr))`,
          }}
        >
          {currentItems.map((repo) => (
            <GitHubCard
              key={repo.id}
              name={repo.name}
              htmlUrl={repo.html_url}
              isPublic={!repo.private}
              languages={languages[repo.id] || {}}
            />
          ))}
        </div>
      </div>

      {needsPagination && (
        <div className="flex items-center text-[#B2B2B2] justify-center mt-8 gap-8">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="p-2 disabled:opacity-50 hover:bg-[#656565] rounded-full transition"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="text-lg font-medium">
            {currentPage}/{totalPages}
          </div>

          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="p-2 disabled:opacity-50 hover:bg-[#656565] rounded-full transition"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GitHubProjectsList;