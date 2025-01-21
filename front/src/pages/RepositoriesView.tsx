import ContentInfinity from '@/components/ContentInfinity';
import GitHubProjectsList from '@/components/GitHubProjectsList';
import React from 'react'

const RepositoriesView: React.FC = () => {
  return (
    <div>
      <ContentInfinity/>
      <div className='mt-[26.5rem]'>
        <GitHubProjectsList/>
      </div>
    </div>
  )
}

export default RepositoriesView;