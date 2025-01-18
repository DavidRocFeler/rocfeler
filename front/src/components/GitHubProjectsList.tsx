'use client';
import React, { useEffect, useState } from 'react';
import { fetchGitHubProjects } from '@/server/FetchGithubProjects.server';
import GitHubCard from './GithubCard';
import Loading from './Loading';

const GitHubProjectsList: React.FC = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [languages, setLanguages] = useState<Record<string, Record<string, number>>>({});

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

  return (
    <div
        className='w-[95%] m-auto grid grid-cols-5 grid-rows-4 gap-x-[2.5rem] gap-y-[2.5rem]'
    >
      {repos.map((repo) => (
        <GitHubCard
          key={repo.id}
          name={repo.name}
          htmlUrl={repo.html_url}
          isPublic={!repo.private}
          languages={languages[repo.id] || {}} 
        />
      ))}
    </div>
  );
};

export default GitHubProjectsList;

