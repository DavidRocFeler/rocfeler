"use client";
import styles from '../style/GitHubContributions.module.css'
import { useEffect, useState } from "react";

const GitHubContributions = () => {
  const [contributions, setContributions] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('four-blocks'); // 'four-blocks', 'split-view', 'full-view'
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

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function generateMonthsArray() {
    // Nombres abreviados de los meses en inglés
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Obtener el mes actual (0-11)
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    
    // Crear array resultado
    const result = [];
    
    // Añadir 13 meses en total (mes actual + 12 meses siguientes)
    for (let i = 0; i < 13; i++) {
      // Calcular el índice del mes a añadir
      let monthIndex = (currentMonthIndex + i) % 12;
      result.push(monthNames[monthIndex]);
    }
    
    return result;
  }  

  const months = generateMonthsArray();
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
        <div style={{ gridTemplateColumns: `repeat(${endWeek - startWeek}, 1fr)` }} className="border-solid flex flx-row gap-x-[2.8rem] text-xs text-gray-400 pl-2 mb-1">
          {months.slice(startMonth, endMonth).map((month, index) => (
            <p key={index} className="text-center col-span-4">{month}</p>
          ))}
        </div>
        <div className="grid gap-1 mx-auto" style={{ gridTemplateColumns: `repeat(${endWeek - startWeek}, 1fr)` }}>
          {contributions.slice(startWeek, endWeek).map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div key={dayIndex} className={`w-3 h-3 rounded-[4px] ${getColor(day)}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
    <div className="bg-transparent flex flex-col w-fit mx-auto justify-center items-center text-white">
      {viewMode === 'four-blocks' ? (
        <>
          <div className='h-[9rem]'>
              {renderBlock(1, 4, 0, 13, true)} {/* First 3 months with weekdays */}
          </div>
          <div className="pl-[0.5rem]"> 
            {renderBlock(4, 7, 13, 26)} {/* Second 3 months */}
          </div>
          <div className='mt-0'>
            {renderBlock(7, 10, 26, 39)} {/* Third 3 months */}
          </div>
          <div className='mb-0'>
            {renderBlock(10, 13, 39, 52)} {/* Last 3 months */}
          </div>
        </>
      ) : viewMode === 'split-view' ? (
        <>
          {renderBlock(1, 7, 0, 26, true)} {/* First 6 months with weekdays */}
          <div className={`ml-[1.8rem] ${styles.SplitView}`}>
            {renderBlock(7, 13, 26, 53)} {/* Last 6 months */}
          </div>
        </>
      ) : (
        // Full view (> 1200px)
        <div className="flex flex-col">
          <div className="flex flex-row pl-[2rem] gap-x-[2.7rem] text-xs text-gray-400 mb-1">
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
                    <div key={dayIndex} className={`w-3 h-3 rounded-[4px] ${getColor(day)}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs mt-[1rem] text-gray-400 ml-auto">
        Less &nbsp;
        <span className="bg-gray-800 w-3 h-3 rounded-[4px] mr-1 inline-block"></span>
        <span className="bg-green-300 w-3 h-3 rounded-[4px] mr-1 inline-block"></span>
        <span className="bg-green-500 w-3 h-3 rounded-[4px] mr-1 inline-block"></span>
        <span className="bg-green-700 w-3 h-3 rounded-[4px] mr-1 inline-block"></span>
        <span className="bg-green-900 w-3 h-3 rounded-[4px] mr-1 inline-block"></span> &nbsp; More
      </p>
      <p className="text-sm text-gray-400 mt-2 w-full text-end">
          {totalContributions} contributions in the last year
      </p>
    </div>
  );
};

export default GitHubContributions;