'use client';
import React, { useState, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DeployArticle from "@/components/DeployArticle";
import { deployArticleHelpers } from "@/helpers/DeployArticle.helpers";

const ScrollListDeploy: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const itemsPerPage = 6;
  const totalPages = Math.ceil(deployArticleHelpers.length / itemsPerPage);

  const getPages = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      const startIndex = i * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      pages.push(deployArticleHelpers.slice(startIndex, endIndex));
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

  const getPageWidth = () => {
    if (containerRef.current) {
      return containerRef.current.clientWidth;
    }
    return 0;
  };

  return (
    <div className="w-[92%] m-auto" ref={containerRef}>
      <div className="overflow-x-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentPage - 1) * getPageWidth()}px)`,
            width: "fit-content",
          }}
        >
          {getPages().map((pageArticles, pageIndex) => (
            <div 
              key={pageIndex} 
              style={{ width: `${getPageWidth()}px` }} 
              className="flex-shrink-0"
            >
              <section className="grid grid-cols-1 mddd:grid-cols-2 xxl:grid-cols-3 gap-[3rem]">
                {pageArticles.map((item, index) => (
                  <DeployArticle key={index} {...item} />
                ))}
              </section>
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

export default ScrollListDeploy;
