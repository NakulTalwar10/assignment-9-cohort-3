import  { useState, useEffect } from "react";
import PlannerCard from "../cards/PlannerCard";
import FocusCard from "../cards/FocusCard";
import TasksCard from "../cards/TasksCard";
import GoalsCard from "../cards/GoalsCard";
import WeatherCard from "../cards/WeatherCard";
import { loadTasks, loadGoals } from "../utils/store";
import QuoteCard from "../cards/QuoteCard";

const Home = ({ darkMode }) => {
  const [tasksDone, setTasksDone] = useState(() => loadTasks().filter((x) => x.completed).length);
  const [tasksTotal, setTasksTotal] = useState(() => loadTasks().length);
  const [goalsDone, setGoalsDone] = useState(() => loadGoals().filter((x) => x.completed).length);
  const [goalsTotal, setGoalsTotal] = useState(() => loadGoals().length);

  useEffect(() => {
    const refresh = () => {
      const t = loadTasks();
      setTasksDone(t.filter((x) => x.completed).length);
      setTasksTotal(t.length);
      const g = loadGoals();
      setGoalsDone(g.filter((x) => x.completed).length);
      setGoalsTotal(g.length);
    };
    window.addEventListener("focus", refresh);
    return () => window.removeEventListener("focus", refresh);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="p-3 sm:p-5">
      <div className="mb-6 sm:mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
            darkMode ? 'text-slate-300' : 'text-indigo-700'
          }`}>
            {getGreeting()}, Alex
          </h1>
          <p className={`mt-1 text-xs sm:text-sm transition-colors ${
            darkMode ? 'text-slate-500' : 'text-indigo-400'
          }`}>
            Here's your operational overview for Wednesday, July 8.
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <div className={`rounded-xl border px-3 sm:px-4 py-2 transition-colors ${
            darkMode ? 'border-slate-800' : 'border-indigo-200/60 bg-white/50'
          }`}>
            <div className={`text-sm sm:text-base font-bold leading-none tabular-nums transition-colors ${
              darkMode ? 'text-slate-300' : 'text-indigo-700'
            }`}>
              {tasksDone}/{tasksTotal}
            </div>
            <div className={`mt-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              darkMode ? 'text-slate-500' : 'text-indigo-400'
            }`}>
              Tasks
            </div>
          </div>
          <div className={`rounded-xl border px-3 sm:px-4 py-2 transition-colors ${
            darkMode ? 'border-slate-800' : 'border-indigo-200/60 bg-white/50'
          }`}>
            <div className={`text-sm sm:text-base font-bold leading-none tabular-nums transition-colors ${
              darkMode ? 'text-slate-300' : 'text-indigo-700'
            }`}>
              {goalsDone}/{goalsTotal}
            </div>
            <div className={`mt-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              darkMode ? 'text-slate-500' : 'text-indigo-400'
            }`}>
              Goals
            </div>
          </div>
          <div className={`rounded-xl border px-3 sm:px-4 py-2 transition-colors ${
            darkMode
              ? 'border-sky-400/30 bg-sky-400/10'
              : 'border-purple-500/30 bg-gradient-to-br from-purple-100/50 to-indigo-100/50'
          }`}>
            <div className={`text-sm sm:text-base font-bold leading-none tabular-nums transition-colors ${
              darkMode ? 'text-sky-400' : 'text-purple-600'
            }`}>
              7d
            </div>
            <div className={`mt-1 text-[10px] font-bold uppercase tracking-widest transition-colors ${
              darkMode ? 'text-sky-400/70' : 'text-purple-500'
            }`}>
              Streak
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="sm:col-span-2 lg:col-span-8 h-full">
          <PlannerCard darkMode={darkMode} />
        </div>

        <div className="sm:col-span-2 lg:col-span-4 h-full">
          <FocusCard darkMode={darkMode} />
        </div>

        <div className="sm:col-span-2 lg:col-span-7 h-full"><TasksCard darkMode={darkMode} /></div>
        <div className="sm:col-span-2 lg:col-span-5 h-full"><GoalsCard darkMode={darkMode} /></div>

        <div className="sm:col-span-2 lg:col-span-6 h-full"><WeatherCard darkMode={darkMode} /></div>
        <div className="sm:col-span-2 lg:col-span-6 h-full"><QuoteCard darkMode={darkMode} /></div>
      </div>
    </div>
  );
};

export default Home;