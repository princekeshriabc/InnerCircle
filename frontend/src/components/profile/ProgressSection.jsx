import React, { useEffect, useState } from "react";

// Generate array of past 365 dates
const generatePastDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date);
  }
  return dates;
};

// Return ISO format like '2024-04-24'
const toISO = (date) => date.toISOString().split("T")[0];

// Return Tailwind color class based on count
const getColor = (count) => {
  if (count >= 5) return "bg-green-800";
  if (count >= 3) return "bg-green-600";
  if (count >= 1) return "bg-green-400";
  return "bg-gray-200";
};

const ProgressSection = () => {
  const [activity, setActivity] = useState({});
  const [dates, setDates] = useState(generatePastDates());

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("activity") || "{}");
    setActivity(stored);
  }, []);

  const handleActivity = () => {
    const today = toISO(new Date());
    const updated = {
      ...activity,
      [today]: (activity[today] || 0) + 1,
    };
    setActivity(updated);
    localStorage.setItem("activity", JSON.stringify(updated));
  };

  // Format data into columns (weeks)
  const weeks = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  // Find month labels to display above columns
  const monthLabels = weeks.map((week, index) => {
    const firstDate = week[0];
    if (firstDate.getDate() <= 7) {
      return firstDate.toLocaleString("default", { month: "short" });
    }
    return "";
  });

  return (
    <div className="p-24 text-center bg-gradient-to-bl from-[#f4d6c9] via-[#fc8e57] to-[#2a217c]">
      <h2 className="text-xl font-semibold mb-4">365 Days Activity</h2>

      <button
        onClick={handleActivity}
        className="mb-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
      >
        Click to Record Activity
      </button>

      {/* Month labels */}
      <div className="flex ml-7 space-x-1 mb-1 items-center justify-center">
        {monthLabels.map((label, i) => (
          <div key={i} className="w-3 text-xs text-gray-500 text-center">
            {label}
          </div>
        ))}
      </div>

      {/* Heatmap Grid */}
      <div className="flex space-x-1 overflow-x-auto items-center justify-center">
        {weeks.map((week, i) => {
          const firstDate = week[0];
          const prevDate = i > 0 ? weeks[i - 1][0] : null;
          const isNewMonth =
            prevDate && firstDate.getMonth() !== prevDate.getMonth();

          return (
            <div
              key={i}
              className={`flex flex-col space-y-1 ${isNewMonth ? "ml-2" : ""}`}
            >
              {week.map((day, j) => {
                const iso = toISO(day);
                return (
                  <div
                    key={j}
                    className={`w-3 h-3 rounded ${getColor(
                      activity[iso] || 0
                    )}`}
                    title={`${iso}: ${activity[iso] || 0} activity`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSection;
