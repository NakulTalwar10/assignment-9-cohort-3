import { useState, useEffect } from "react";

const HOURS = [
  "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM",
  "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM",
  "7 PM", "8 PM", "9 PM"
];

const STORAGE_KEY = "plans";

const loadPlans = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const PlannerPage = ({ darkMode }) => {
  const [plans, setPlans] = useState(loadPlans);
  const currentHour = new Date().getHours();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  }, [plans]);

  const handleChange = (hour, value) => {
    setPlans((prev) => ({ ...prev, [hour]: value }));
  };

  const to24Hour = (hour) => {
    const num = parseInt(hour);
    if (hour === "12 AM") return 0;
    if (hour === "12 PM") return 12;
    if (hour.includes("PM")) return num + 12;
    return num;
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 sm:p-5">
        <div className="mb-6 sm:mb-8">
          <h1 className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
            darkMode ? 'text-slate-300' : 'text-indigo-700'
          }`}>
            Planner
          </h1>
          <p className={`mt-1 text-xs sm:text-sm transition-colors ${
            darkMode ? 'text-slate-500' : 'text-indigo-400'
          }`}>
            Structure the day, hour by hour.
          </p>
        </div>

        <div className={`rounded-xl border transition-colors ${
          darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-indigo-200/60 bg-white/70'
        }`}>
          <div className="space-y-2 p-4 sm:p-10">
          {HOURS.map((hour) => {
            const isActive = to24Hour(hour) === currentHour + 1;
            const isPast = to24Hour(hour) <= currentHour;

            return (
              <div
                key={hour}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 rounded-lg border p-3 transition-colors ${
                  isActive
                    ? `${
                        darkMode
                          ? 'border-sky-400/60 bg-sky-400/10'
                          : 'border-purple-500/60 bg-gradient-to-r from-purple-100/50 to-indigo-100/50'
                      }`
                    : isPast
                    ? `${
                        darkMode
                          ? 'border-slate-800 bg-slate-900/30 opacity-60'
                          : 'border-indigo-200/40 bg-indigo-100/30 opacity-60'
                      }`
                    : `${
                        darkMode
                          ? 'border-slate-800 bg-slate-900/50'
                          : 'border-indigo-200/60 bg-white/50'
                      }`
                }`}
              >
                <div
                  className={`w-16 shrink-0 font-mono text-xs tabular-nums transition-colors ${
                    isActive
                      ? `font-bold ${darkMode ? 'text-sky-400' : 'text-purple-600'}`
                      : isPast
                      ? `${darkMode ? 'text-slate-500' : 'text-indigo-400'}`
                      : `${darkMode ? 'text-slate-400' : 'text-indigo-500'}`
                  }`}
                >
                  {hour}
                </div>
                <input
                  disabled={isPast}
                  className={`flex w-full rounded-md border px-3 py-1.5 text-sm shadow-sm transition-colors ${
                    isPast
                      ? `cursor-not-allowed ${
                          darkMode
                            ? 'border-slate-800 bg-slate-900/30 text-slate-500 placeholder-slate-600'
                            : 'border-indigo-200/40 bg-indigo-100/30 text-indigo-400 placeholder-indigo-300'
                        }`
                      : `${
                          darkMode
                            ? 'bg-slate-900/50 text-slate-200 placeholder-slate-500 border-slate-800 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400'
                            : 'bg-white/80 text-slate-700 placeholder-indigo-400 border-indigo-200/60 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                        }`
                  } ${isActive ? `${darkMode ? 'border-sky-400/40' : 'border-purple-500/40'}` : ''}`}
                  placeholder="Plan this hour…"
                  value={plans[hour] || ""}
                  onChange={(e) => handleChange(hour, e.target.value)}
                />
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;