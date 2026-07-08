import useTimer from "../hooks/useTimer";

const FocusPage = ({ darkMode }) => {
  const {
    mode,
    modes,
    formattedTime,
    isRunning,
    isBreak,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
  } = useTimer();

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 sm:p-5">
        <div className="mb-6 sm:mb-8">
          <h1 className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
            darkMode ? 'text-slate-300' : 'text-indigo-700'
          }`}>
            Focus
          </h1>
          <p className={`mt-1 text-xs sm:text-sm transition-colors ${
            darkMode ? 'text-slate-500' : 'text-indigo-400'
          }`}>
            Stay in the zone with the Pomodoro technique.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className={`rounded-xl border transition-colors ${
            darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-indigo-200/60 bg-white/70'
          }`}>
            <div className="p-6 sm:p-10">
              <div className="flex justify-center gap-2 mb-8 flex-wrap">
                {Object.entries(modes).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => switchMode(key)}
                    className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                      mode === key && !isBreak
                        ? darkMode
                          ? 'bg-sky-400/10 text-sky-400 ring-1 ring-sky-400/30'
                          : 'bg-purple-600/10 text-purple-600 ring-1 ring-purple-600/30'
                        : darkMode
                          ? 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
                          : 'text-indigo-400 hover:text-indigo-700 hover:bg-indigo-100/60'
                    }`}
                  >
                    {val.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col items-center py-6">
                {isBreak && (
                  <span className={`text-sm font-bold uppercase tracking-widest mb-3 transition-colors ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    Break Time — {modes[mode].label}
                  </span>
                )}
                <span className={`font-mono text-6xl sm:text-8xl font-bold tracking-tight transition-colors ${
                  darkMode ? 'text-slate-100' : 'text-indigo-800'
                }`}>
                  {formattedTime}
                </span>
                <span className={`mt-3 text-xs font-medium uppercase tracking-widest transition-colors ${
                  darkMode ? 'text-slate-500' : 'text-indigo-400'
                }`}>
                  {isBreak ? `${modes[mode].label} in progress` : "Focus session"}
                </span>
              </div>

              <div className={`mt-6 h-2 w-full overflow-hidden rounded-full transition-colors ${
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

              <div className="mt-8 flex justify-center gap-4">
                {isRunning ? (
                  <button
                    onClick={pauseTimer}
                    className={`rounded-xl px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                      darkMode
                        ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                        : 'bg-indigo-100/80 text-indigo-700 hover:bg-indigo-200/80'
                    }`}
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={startTimer}
                    className={`rounded-xl px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                      isBreak
                        ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/20'
                        : 'bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-700 text-white hover:from-rose-400 hover:via-purple-500 hover:to-indigo-600 shadow-lg shadow-purple-600/20'
                    }`}
                  >
                    Start
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className={`rounded-xl px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                    darkMode
                      ? 'text-slate-400 hover:text-slate-200 border border-slate-700 hover:border-slate-600'
                      : 'text-indigo-500 hover:text-indigo-700 border border-indigo-200/60 hover:border-indigo-300'
                  }`}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusPage;