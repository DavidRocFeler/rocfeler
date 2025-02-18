'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { fetchGitHubProjects } from '@/server/FetchGithubProjects.server';
import GitHubCard from './GithubCard';

const GitHubProjectsList: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [languages, setLanguages] = useState<Record<string, Record<string, number>>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | ''>('');
  const [dimensions, setDimensions] = useState({
    columns: 5,
    rows: 4
  });

  // Memoized dimension calculations
  const calculateDimensions = useCallback(() => {
    const width = window.innerWidth;
    const columns = width < 500 ? 1 : 
                   width < 900 ? 2 : 
                   width < 1200 ? 3 : 
                   width < 1440 ? 4 : 5;
    
    const rows = width >= 1440 ? 5 : 4;
    
    return { columns, rows };
  }, []);

  // Handle window resize with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newDimensions = calculateDimensions();
        setDimensions(newDimensions);
      }, 250); // Debounce de 250ms
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [calculateDimensions]);

  // Initial dimension setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions(calculateDimensions());
    }
  }, [calculateDimensions]);

  // Fetch GitHub data
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
        console.error('Error fetching repositories or languages:', error);
      }
    };
    fetchData();
  }, []);

  const cardsPerPage = dimensions.columns * dimensions.rows;
  const totalPages = Math.ceil(repos.length / cardsPerPage);
  const indexOfLastItem = currentPage * cardsPerPage;
  const indexOfFirstItem = indexOfLastItem - cardsPerPage;
  const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);
  const needsPagination = repos.length > cardsPerPage;

  const handlePageChange = (direction: 'prev' | 'next') => {
    const newPage = direction === 'prev' ? currentPage - 1 : currentPage + 1;
    
    if ((direction === 'prev' && currentPage > 1) || 
        (direction === 'next' && currentPage < totalPages)) {
      setSlideDirection(direction === 'prev' ? 'right' : 'left');
      
      // Smooth scroll to top before page change
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Wait for scroll and animation
      setTimeout(() => {
        setCurrentPage(newPage);
      }, 300);

      setTimeout(() => {
        setSlideDirection('');
      }, 600);
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
            gridTemplateRows: `repeat(${Math.ceil(currentItems.length / dimensions.columns)}, minmax(0, 1fr))`,
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
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className="p-2 disabled:opacity-50 hover:bg-[#656565] rounded-full transition"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="text-lg font-medium">
            {currentPage}/{totalPages}
          </div>

          <button 
            onClick={() => handlePageChange('next')}
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