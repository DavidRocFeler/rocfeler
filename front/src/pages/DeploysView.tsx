'use client'
import CoverDeploy from "@/components/CoverDeploy"
import DeployArticle from "@/components/DeployArticle"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { coverDeployHelpers } from "@/helpers/CoverDeploys.helpers"
import { deployArticleHelpers } from "@/helpers/DeployArticle.helpers"
import React, { useState } from "react"

const DeploysView: React.FC = () => {
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | ''>('');

  // Calculate total pages
  const totalPages = Math.ceil(deployArticleHelpers.length / ITEMS_PER_PAGE);

  // Get current items
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = deployArticleHelpers.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page navigation
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
    <div className='flex flex-col'>
      <CoverDeploy items={coverDeployHelpers} />
      <h1 className='text-white font-bold w-[87%] s:w-[92%] m-auto mt-[3rem] xxl:mt-[5rem] mb-[1rem]'>Deploy Projects</h1>
      <div className="overflow-hidden w-[92%] m-auto">
        <section 
          className={`
            grid grid-cols-1 mddd:grid-cols-2 xxl:grid-cols-3 gap-[3rem] 
            transition-transform duration-300 ease-in-out pb-[1rem]
            ${slideDirection === 'left' ? 'translate-x-[-100%] opacity-0' : ''}
            ${slideDirection === 'right' ? 'translate-x-[100%] opacity-0' : ''}
            ${!slideDirection ? 'translate-x-0 opacity-100' : ''}
          `}
        >
          {currentItems.map((item) => (
            <DeployArticle
              key={item.id}
              {...item}
            />
          ))}
        </section>
      </div>
      <div className="flex items-center text-[#B2B2B2] justify-center mt-8 gap-8">
        <button
          className="p-2 disabled:opacity-50 hover:bg-[#656565] rounded-full transition"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-lg font-medium">
          {currentPage}/{totalPages}
        </div>
        <button
          className="p-2 disabled:opacity-50 hover:bg-[#656565] rounded-full transition"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default DeploysView;