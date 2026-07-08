import { useNavigate } from "react-router-dom";
import useTimer from "../hooks/useTimer";

const FocusCard = ({ darkMode }) => {
  const navigate = useNavigate();
  const {
    mode,
    modes,
    formattedTime,
    isBreak,
    progress,
  } = useTimer();

  const currentModeLabel = isBreak ? modes[mode].label : "Pomodoro";

  return (
    <div className={`rounded-xl border transition-colors duration-300 flex flex-col ${
      darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-indigo-200/60 bg-white/60'
    } h-[250px]`}>
      <header className={`flex items-center justify-between border-b px-5 py-4 transition-colors duration-300 ${
        darkMode ? 'border-slate-800' : 'border-indigo-200/60'
      }`}>
        <h2 className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
          darkMode ? 'text-slate-300' : 'text-indigo-700'
        }`}>
          Focus Session
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/focus")}
            className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${
              darkMode
                ? 'text-sky-400 hover:text-sky-300'
                : 'text-purple-600 hover:text-purple-700'
            }`}
          >
            Open →
          </button>
        </div>
      </header>
      <div className="flex-1 p-5">
        <div className="flex justify-center mb-3">
          <span className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors ${
            isBreak
              ? darkMode
                ? 'bg-emerald-400/10 text-emerald-400'
                : 'bg-emerald-600/10 text-emerald-600'
              : darkMode
                ? 'bg-sky-400/10 text-sky-400'
                : 'bg-purple-600/10 text-purple-600'
          }`}>
            {currentModeLabel}
          </span>
        </div>

        <div className="flex flex-col items-center py-3">
          {isBreak && (
            <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors ${
              darkMode ? 'text-emerald-400' : 'text-emerald-600'
            }`}>
              Break Time
            </span>
          )}
          <span className={`font-mono text-5xl font-bold tracking-tight transition-colors ${
            darkMode ? 'text-slate-100' : 'text-indigo-800'
          }`}>
            {formattedTime}
          </span>
        </div>

        <div className={`mt-3 h-1.5 w-full overflow-hidden rounded-full transition-colors ${
          darkMode ? 'bg-slate-800' : 'bg-indigo-200/60'
        }`}>
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isBreak
                ? 'bg-emerald-500'
                : 'bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-600'
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FocusCard;