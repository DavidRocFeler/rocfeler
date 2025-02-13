"use client";

import { useEffect, useState } from "react";

const GitHubContributions = () => {
  const [contributions, setContributions] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('four-blocks');
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch("/api/github");
        const data = await response.json();

        if (data.error) {
          console.error("Error fetching contributions:", data.error);
          return;
        }

        const weeks = data.data.viewer.contributionsCollection.contributionCalendar.weeks;
        const transformedData = weeks.map((week: any) =>
          week.contributionDays.map((day: any) => day.contributionCount)
        );

        // Calcular el total de contribuciones
        const total = weeks.reduce((acc: number, week: any) => {
          return acc + week.contributionDays.reduce((dayAcc: number, day: any) => dayAcc + day.contributionCount, 0);
        }, 0);

        setTotalContributions(total);
        setContributions(transformedData);
      } catch (error) {
        console.error("Failed to fetch contributions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();

    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setViewMode('full-view');
      } else if (window.innerWidth > 650) {
        setViewMode('split-view');
      } else {
        setViewMode('four-blocks');
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const weekdays = ["Mon", "", "Wed", "", "Fri", "", ""];

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-800";
    if (count < 5) return "bg-green-300";
    if (count < 10) return "bg-green-500";
    if (count < 20) return "bg-green-700";
    return "bg-green-900";
  };

  const getMonthLabels = (startWeek: number, numWeeks: number) => {
    const date = new Date();
    date.setDate(date.getDate() - ((52 - startWeek) * 7)); // Comenzar desde la primera semana del rango
    
    const months: { name: string, week: number }[] = [];
    let currentMonth = date.getMonth();
    
    for (let week = 0; week < numWeeks; week++) {
      const monthIndex = date.getMonth();
      if (monthIndex !== currentMonth) {
        months.push({
          name: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date),
          week: week
        });
        currentMonth = monthIndex;
      }
      date.setDate(date.getDate() + 7);
    }
    
    return months;
  };

  const renderBlock = (startWeek: number, numWeeks: number, showWeekdays: boolean = false) => {
    const monthLabels = getMonthLabels(startWeek, numWeeks);
    
    return (
      <div className="flex mb-4">
        {showWeekdays && (
          <div className="flex flex-col justify-between mt-[1.5rem] mr-[0.5rem]">
            {weekdays.map((day, index) => (
              <div key={index} className="h-4 text-xs text-gray-400">{day}</div>
            ))}
          </div>
        )}
        <div className="flex flex-col">
          <div style={{ gridTemplateColumns: `repeat(${numWeeks}, 1fr)` }} className="relative grid text-xs text-gray-400 mb-1 h-4">
            {monthLabels.map((month, index) => (
              <div 
                key={index} 
                className="absolute text-center"
                style={{ 
                  left: `${(month.week / numWeeks) * 100}%`,
                  width: '3rem',
                  transform: 'translateX(-50%)'
                }}
              >
                {month.name}
              </div>
            ))}
          </div>
          <div className="grid gap-1 mx-auto" style={{ gridTemplateColumns: `repeat(${numWeeks}, 1fr)` }}>
            {contributions.slice(startWeek, startWeek + numWeeks).map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div key={dayIndex} className={`w-4 h-4 rounded-[4px] ${getColor(day)}`} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-black flex flex-col w-[76%] mx-auto justify-center items-center text-white rounded-lg p-4">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black flex flex-col w-[76%] mx-auto justify-center items-center text-white rounded-lg p-4">
      {viewMode === 'four-blocks' ? (
        <>
          {renderBlock(0, 13, true)}
          {renderBlock(13, 26)}
          {renderBlock(26, 39)}
          {renderBlock(39, 52)}
        </>
      ) : viewMode === 'split-view' ? (
        <>
          {renderBlock(0, 26, true)}
          {renderBlock(26, 52)}
        </>
      ) : (
        // Full view (> 1200px)
        <div className="flex flex-col">
          {renderBlock(0, 52, true)}
        </div>
      )}

      <div className="flex flex-col items-end w-full">
        <p className="text-xs text-gray-400">
          Less &nbsp;
          <span className="bg-gray-800 w-4 h-4 rounded-[4px] mr-1 inline-block"></span>
          <span className="bg-green-300 w-4 h-4 rounded-[4px] mr-1 inline-block"></span>
          <span className="bg-green-500 w-4 h-4 rounded-[4px] mr-1 inline-block"></span>
          <span className="bg-green-700 w-4 h-4 rounded-[4px] mr-1 inline-block"></span>
          <span className="bg-green-900 w-4 h-4 rounded-[4px] mr-1 inline-block"></span> &nbsp; More
        </p>
        <p className="text-sm text-gray-400 mt-2">
          {totalContributions} contributions in the last year
        </p>
      </div>
    </div>
  );
};

export default GitHubContributions;