"use client";

import { useEffect, useState } from "react";

const ContributionGraph = () => {
  const [contributions, setContributions] = useState<number[][]>([]);

  useEffect(() => {
    const fetchContributions = async () => {
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
    };

    fetchContributions();
  }, []);

  // Etiquetas de los meses (deben alinearse con las semanas)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Etiquetas de los días de la semana
  const weekdays = ["Mon", "", "Wed", "", "Fri", "", ""]; // Solo Mon, Wed y Fri visibles

  // Función para determinar el color de los cuadros
  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-800"; // Sin contribuciones
    if (count < 5) return "bg-green-300";
    if (count < 10) return "bg-green-500";
    if (count < 20) return "bg-green-700";
    return "bg-green-900"; // Mayor contribución
  };

  return (
    <div className="bg-black flex flex-col w-[76%] mx-auto justify-center items-center text-white rounded-lg">
      {/* Contenedor de la cuadrícula */}
      <div className="flex">
        {/* Columna con los días de la semana */}
        <div className="flex flex-col justify-between mt-[1.5rem] mr-[0.5rem]">
          {weekdays.map((day, index) => (
            <div key={index} className="h-4 text-xs text-gray-400">{day}</div>
          ))}
        </div>

        <div className="flex flex-col">
          {/* Meses en la parte superior */}
          <div style={{ gridTemplateColumns: "repeat(53, 1fr)" }} className="grid grid-cols-52 text-xs text-gray-400 mb-1">
            {months.map((month, index) => (
              <div key={index} className="text-center col-span-4">{month}</div>
            ))}
          </div>

          {/* Cuadrícula de contribuciones */}
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

      {/* Leyenda de colores */}
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

export default ContributionGraph;
