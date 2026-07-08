import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "plans";

const to24Hour = (hourStr) => {
  const match = hourStr.match(/(\d+)\s*(AM|PM)/i);
  if (!match) return null;
  const [, numStr, period] = match;
  if (!numStr) return null;
  const num = parseInt(numStr);
  if (period.toUpperCase() === "AM") return num === 12 ? 0 : num;
  if (period.toUpperCase() === "PM") return num === 12 ? 12 : num + 12;
  return null;
};

const toDisplay = (hour24) => {
  return `${String(hour24).padStart(2, "0")}:00`;
};

const HOURS_12 = [
  "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM",
  "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
  "7 PM", "8 PM", "9 PM"
];

const PlannerCard = ({ darkMode }) => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState({});

  useEffect(() => {
    const load = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setPlans(JSON.parse(saved));
      } catch {
        // ignore parse errors
      }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  const currentHour = new Date().getHours();

  const visibleHours = HOURS_12.filter((h) => {
    const h24 = to24Hour(h);
    return h24 !== null && h24 >= currentHour && h24 < currentHour + 5;
  });

  if (visibleHours.length === 0) {
    return (
      <div className={`rounded-xl border transition-colors flex flex-col ${
        darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-indigo-200/60 bg-white/60'
      } h-[250px]`}>
        <header className={`flex items-center justify-between border-b px-5 py-4 transition-colors ${
          darkMode ? 'border-slate-800' : 'border-indigo-200/60'
        }`}>
          <h2 className={`text-sm font-bold tracking-tight transition-colors ${
            darkMode ? 'text-slate-300' : 'text-indigo-700'
          }`}>
            Today's Schedule
          </h2>
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
              darkMode ? 'text-slate-500' : 'text-indigo-400'
            }`}>
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <button
              onClick={() => navigate("/planner")}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                darkMode
                  ? 'text-sky-400 hover:text-sky-300'
                  : 'text-purple-600 hover:text-purple-700'
              }`}
            >
              Open →
            </button>
          </div>
        </header>
        <div className="flex-1 p-5 overflow-y-auto">
          <p className={`text-sm italic text-center py-6 transition-colors ${
            darkMode ? 'text-slate-500' : 'text-indigo-400'
          }`}>
            All plans for today are complete.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border transition-colors flex flex-col ${
      darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-indigo-200/60 bg-white/60'
    } h-[250px]`}>
      <header className={`flex items-center justify-between border-b px-5 py-4 transition-colors ${
        darkMode ? 'border-slate-800' : 'border-indigo-200/60'
      }`}>
        <h2 className={`text-sm font-bold tracking-tight transition-colors ${
          darkMode ? 'text-slate-300' : 'text-indigo-700'
        }`}>
          Today's Schedule
        </h2>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
            darkMode ? 'text-slate-500' : 'text-indigo-400'
          }`}>
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() => navigate("/planner")}
            className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
              darkMode
                ? 'text-sky-400 hover:text-sky-300'
                : 'text-purple-600 hover:text-purple-700'
            }`}
          >
            Open →
          </button>
        </div>
      </header>
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="space-y-3">
          {visibleHours.map((hour) => {
            const h24 = to24Hour(hour);
            const isNow = h24 === currentHour;
            const planText = plans[hour] || "";

            return (
              <div
                key={hour}
                className={`flex items-start gap-4 rounded-lg border-l-2 py-1.5 pl-4 transition-colors ${
                  isNow
                    ? `${
                        darkMode
                          ? 'border-sky-400 bg-sky-400/5'
                          : 'border-purple-500 bg-gradient-to-r from-purple-100/50 to-indigo-100/50'
                      }`
                    : `${
                        darkMode
                          ? 'border-slate-700'
                          : 'border-indigo-200/60'
                      }`
                }`}
              >
                <span
                  className={`w-14 font-mono text-xs tabular-nums transition-colors ${
                    isNow
                      ? `font-bold ${
                          darkMode ? 'text-sky-400' : 'text-purple-600'
                        }`
                      : `${
                          darkMode ? 'text-slate-400' : 'text-indigo-500'
                        }`
                  }`}
                >
                  {toDisplay(h24)}
                </span>
                <div className="flex-1">
                  {planText ? (
                    <p className={`text-sm transition-colors ${
                      darkMode ? 'text-slate-200' : 'text-slate-700'
                    }`}>{planText}</p>
                  ) : (
                    <p className={`text-sm italic font-normal transition-colors ${
                      darkMode ? 'text-slate-500' : 'text-indigo-400'
                    }`}>
                      Unscheduled
                    </p>
                  )}
                  {isNow && (
                    <p className={`text-[10px] uppercase tracking-widest mt-0.5 transition-colors ${
                      darkMode ? 'text-sky-400/80' : 'text-purple-600/80'
                    }`}>
                      Now
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlannerCard;