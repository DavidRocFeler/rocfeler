import ContentInfinity from '@/components/ContentInfinity';
import GitHubContributions from '@/components/GitHubContributions';
import GitHubProjectsList from '@/components/GitHubProjectsList';
import React from 'react'

const RepositoriesView: React.FC = () => {
  return (
    <div>
      <div className='border-[#33C343] border-solid border-t-[1px] border-b-[1px] py-[10rem] mb-[2rem] overflow-auto'>
        <GitHubContributions/>
      </div>
      <div className='text-[#33c343]'>
        <GitHubProjectsList/>
      </div>
    </div>
  )
}

export default RepositoriesView;