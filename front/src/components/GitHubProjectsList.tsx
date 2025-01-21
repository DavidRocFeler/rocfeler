'use client';
import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { fetchGitHubProjects } from '@/server/FetchGithubProjects.server';
import GitHubCard from './GithubCard';

const GitHubProjectsList: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [languages, setLanguages] = useState<Record<string, Record<string, number>>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const getColumnsPerRow = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 500) return 1;  // 4 total cards (1x4)
      if (width < 900) return 2;  // 8 total cards (2x4)
      if (width < 1200) return 3; // 12 total cards (3x4)
      return 4;                   // 16 total cards (4x4)
    }
    return 4;
  };

  const [columnsPerRow, setColumnsPerRow] = useState(getColumnsPerRow());
  const cardsPerPage = columnsPerRow * 4; // Siempre 4 filas

  useEffect(() => {
    const handleResize = () => {
      setColumnsPerRow(getColumnsPerRow());
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

  const getPages = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      const startIndex = i * cardsPerPage;
      const endIndex = startIndex + cardsPerPage;
      pages.push(repos.slice(startIndex, endIndex));
    }
    return pages;
  };

  const goToNextPage = () => {
    if (currentPage < totalPages && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1 && !isAnimating) {
      setIsAnimating(true);
      setCurrentPage(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Calcular el ancho de cada página basado en el contenedor padre
  const getPageWidth = () => {
    if (containerRef.current) {
      return containerRef.current.clientWidth;
    }
    return 0;
  };

  return (
    <div className="w-[95%] md:w-[80%] xl:w-[95%] mx-auto" ref={containerRef}>
      <div className="overflow-x-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentPage - 1) * getPageWidth()}px)`,
            width: 'fit-content'
          }}
        >
          {getPages().map((pageRepos, pageIndex) => (
            <div 
              key={pageIndex}
              style={{ width: `${getPageWidth()}px` }}
              className="flex-shrink-0"
            >
              <div className={`
                grid 
                grid-cols-1 
                s:grid-cols-2 
                xl:grid-cols-3 
                xxl:grid-cols-4
                xxxl:grid-cols-5
                gap-x-10 
                gap-y-10
                grid-rows-4
              `}>
                {pageRepos.map((repo) => (
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
          ))}
        </div>
      </div>

      <div className="flex items-center text-[#B2B2B2] justify-center mt-8 gap-8">
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 1 || isAnimating}
          className="p-2 disabled:opacity-50 hover:bg-[#656565] rounded-full transition"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-lg font-medium">
          {currentPage}/{totalPages}
        </div>

        <button 
          onClick={goToNextPage}
          disabled={currentPage === totalPages || isAnimating}
          className="p-2 disabled:opacity-50 hover:bg-[#656565] rounded-full transition"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default GitHubProjectsList;