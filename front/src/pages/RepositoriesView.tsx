import GitHubProjectsList from '@/components/GitHubProjectsList';
import Infinity from '@/components/Infinitiy';
import React from 'react'

const RepositoriesView: React.FC = () => {
  return (
    <div>
      <Infinity/>
      <div className='mt-[26.5rem]'>
        <GitHubProjectsList/>
      </div>
    </div>
  )
}

export default RepositoriesView;