"use client";

import { useEffect, useState } from "react";

const GitHubContributions = () => {
  const [contributions, setContributions] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('three-blocks'); // 'three-blocks', 'split-view', 'full-view'

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
        setViewMode('three-blocks');
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
  const weekdays = ["Mon", "", "Wed", "", "Fri", "", ""];

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-800";
    if (count < 5) return "bg-green-300";
    if (count < 10) return "bg-green-500";
    if (count < 20) return "bg-green-700";
    return "bg-green-900";
  };

  const renderBlock = (startMonth: number, endMonth: number, startWeek: number, endWeek: number, showWeekdays: boolean = false) => (
    <div className="flex mb-4">
      {showWeekdays && (
        <div className="flex flex-col justify-between mt-[1.5rem] mr-[0.5rem]">
          {weekdays.map((day, index) => (
            <div key={index} className="h-4 text-xs text-gray-400">{day}</div>
          ))}
        </div>
      )}
      <div className="flex flex-col">
        <div style={{ gridTemplateColumns: `repeat(${endWeek - startWeek}, 1fr)` }} className="grid text-xs text-gray-400 mb-1">
          {months.slice(startMonth, endMonth).map((month, index) => (
            <div key={index} className="text-center col-span-4">{month}</div>
          ))}
        </div>
        <div className="grid gap-1 mx-auto" style={{ gridTemplateColumns: `repeat(${endWeek - startWeek}, 1fr)` }}>
          {contributions.slice(startWeek, endWeek).map((week, weekIndex) => (
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

  return (
    <div className="bg-black flex flex-col w-[76%] mx-auto justify-center items-center text-white rounded-lg p-4">
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
        </div>
      ) : viewMode === 'three-blocks' ? (
        <>
          {renderBlock(0, 4, 0, 17, true)} {/* First 4 months with weekdays */}
          {renderBlock(4, 8, 17, 34)} {/* Middle 4 months */}
          {renderBlock(8, 12, 34, 52)} {/* Last 4 months */}
        </>
      ) : viewMode === 'split-view' ? (
        <>
          {renderBlock(0, 6, 0, 26, true)} {/* First 6 months with weekdays */}
          {renderBlock(6, 13, 26, 53)} {/* Last 6 months */}
        </>
      ) : (
        // Full view (> 1200px)
        <div className="flex flex-col">
          <div style={{ gridTemplateColumns: "repeat(53, 1fr)" }} className="grid grid-cols-52 text-xs text-gray-400 mb-1">
            {months.map((month, index) => (
              <div key={index} className="text-center col-span-4">{month}</div>
            ))}
          </div>
          <div className="flex">
            <div className="flex flex-col justify-between mr-[0.5rem]">
              {weekdays.map((day, index) => (
                <div key={index} className="h-4 text-xs text-gray-400">{day}</div>
              ))}
            </div>
            <div className="grid gap-1 mx-auto" style={{ gridTemplateColumns: "repeat(53, 1fr)" }}>
              {contributions.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div key={dayIndex} className={`w-4 h-4 rounded-[4px] ${getColor(day)}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs mt-[1rem] text-gray-400 ml-auto">
        Less &nbsp;
        <span className="bg-gray-800 w-4 h-4 rounded-[4px] mr-1 inline-block"></span>
        <span className="bg-green-300 w-4 h-4 rounded-[4px] mr-1 inline-block"></span>
        <span className="bg-green-500 w-4 h-4 rounded-[4px] mr-1 inline-block"></span>
        <span className="bg-green-700 w-4 h-4 rounded-[4px] mr-1 inline-block"></span>
        <span className="bg-green-900 w-4 h-4 rounded-[4px] mr-1 inline-block"></span> &nbsp; More
      </p>
    </div>
  );
};

export default GitHubContributions;
