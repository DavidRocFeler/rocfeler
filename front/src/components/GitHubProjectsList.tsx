'use client';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { fetchGitHubProjects } from '@/server/FetchGithubProjects.server';
import GitHubCard from './GithubCard';

const GitHubProjectsList: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [languages, setLanguages] = useState<Record<string, Record<string, number>>>({});
  const [currentPage, setCurrentPage] = useState(1);
  
  // Definimos cuántas cards por página según el breakpoint
  const getCardsPerPage = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 580) return 4; // 1 columna x 4 filas = 4 cards
      if (width < 850) return 8; // 3 columnas x 4 filas = 12 cards
      if (width < 1150) return 12; // 3 columnas x 4 filas = 12 cards
      if (width < 1430) return 16; // 4 columnas x 4 filas = 16 cards
      return 20; // 5 columnas x 4 filas = 20 cards
    }
    return 20; // Default value
  };

  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

  // Actualizar cardsPerPage cuando cambie el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage());
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

  // Calcular el total de páginas
  const totalPages = Math.ceil(repos.length / cardsPerPage);

  // Obtener los repos de la página actual
  const getCurrentPageRepos = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return repos.slice(startIndex, endIndex);
  };

  // Funciones de navegación
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-[95%] mx-auto">
      {/* Grid de cards */}
      <div className={`
        grid 
        grid-cols-1 
        s:grid-cols-3 
        xl:grid-cols-4 
        xxl:grid-cols-5 
        gap-x-10 
        gap-y-10
        grid-rows-4
        transition-transform duration-500 ease-in-out
      `}>
        {getCurrentPageRepos().map((repo) => (
          <GitHubCard
            key={repo.id}
            name={repo.name}
            htmlUrl={repo.html_url}
            isPublic={!repo.private}
            languages={languages[repo.id] || {}}
          />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center text-[#B2B2B2] justify-center mt-8 gap-8">
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="p-2 disabled:opacity-1 hover:bg-[#656565] rounded-full transition"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-lg font-medium">
          {currentPage}/{totalPages}
        </div>

        <button 
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="p-2 disabled:opacity-1 hover:bg-[#656565] rounded-full transition"
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default GitHubProjectsList;
