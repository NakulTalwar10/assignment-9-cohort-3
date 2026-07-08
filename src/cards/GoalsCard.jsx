import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadGoals, toggleGoal, toggleGoalPriority } from "../utils/store";

const GoalsCard = ({ darkMode }) => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState(loadGoals());

  React.useEffect(() => {
    const onFocus = () => setGoals(loadGoals());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const handleToggle = (id) => {
    setGoals(toggleGoal(id));
  };

  const handlePriority = (id) => {
    setGoals(toggleGoalPriority(id));
  };

  const pending = [...goals.filter((g) => !g.completed)].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority ? -1 : 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const completed = goals.filter((g) => g.completed);
  const total = goals.length;
  const pct = total > 0 ? Math.round((completed.length / total) * 100) : 0;

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
          Goals
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/goals")}
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
        {goals.length === 0 ? (
          <p className={`text-sm italic text-center py-6 transition-colors ${
            darkMode ? 'text-slate-500' : 'text-indigo-400'
          }`}>
            Your goals will appear here.
          </p>
        ) : (
          <div className="flex flex-col h-full">
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-medium ${
                  darkMode ? 'text-slate-400' : 'text-indigo-500'
                }`}>{completed.length}/{total} done</span>
                <span className="text-[10px] font-bold text-purple-500">{pct}%</span>
              </div>
              <div className={`h-1 w-full overflow-hidden rounded-full ${
                darkMode ? 'bg-slate-800' : 'bg-indigo-200/60'
              }`}>
                <div className="h-full rounded-full bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-600 transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <ul className="space-y-1 flex-1">
              {pending.slice(0, 5).map((goal) => (
                <li key={goal.id} className="flex items-center gap-1.5 group">
                  <button
                    onClick={() => handleToggle(goal.id)}
                    className={`shrink-0 w-3.5 h-3.5 rounded border-2 transition-colors ${
                      darkMode
                        ? 'border-slate-600 hover:border-slate-500'
                        : 'border-indigo-300 hover:border-purple-400'
                    }`}
                  />
                  <button
                    onClick={() => handlePriority(goal.id)}
                    className={`shrink-0 transition-colors ${
                      goal.priority
                        ? 'text-amber-400'
                        : darkMode
                          ? 'text-slate-600 hover:text-slate-500'
                          : 'text-indigo-300 hover:text-indigo-400'
                    }`}
                    title={goal.priority ? "High priority" : "Mark as priority"}
                  >
                    <svg className="w-3 h-3" fill={goal.priority ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <span className={`flex-1 truncate text-xs ${
                    darkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {goal.title}
                  </span>
                </li>
              ))}
              {pending.length > 5 && (
                <p className={`text-[10px] text-center pt-1 ${
                  darkMode ? 'text-slate-500' : 'text-indigo-400'
                }`}>
                  +{pending.length - 5} more
                </p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsCard;