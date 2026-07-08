import { useState } from "react";
import { loadTasks, addTask, toggleTask, toggleTaskPriority, deleteTask } from "../utils/store";

const TasksPage = ({ darkMode }) => {
  const [tasks, setTasks] = useState(loadTasks());
  const [input, setInput] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks(addTask(trimmed));
    setInput("");
  };

  const handleToggle = (id) => {
    setTasks(toggleTask(id));
  };

  const handlePriority = (id) => {
    setTasks(toggleTaskPriority(id));
  };

  const handleDelete = (id) => {
    setTasks(deleteTask(id));
  };

  const sorted = [...tasks].sort((a, b) => {
    if (a.priority !== b.priority) return a.priority ? -1 : 1;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 sm:p-5">
        <div className="mb-6 sm:mb-8">
          <h1 className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
            darkMode ? 'text-slate-300' : 'text-indigo-700'
          }`}>
            Tasks
          </h1>
          <p className={`mt-1 text-xs sm:text-sm transition-colors ${
            darkMode ? 'text-slate-500' : 'text-indigo-400'
          }`}>
            Manage your daily to-dos and stay on track.
          </p>
        </div>

        <form onSubmit={handleAdd} className="mb-6 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task…"
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors ${
              darkMode
                ? 'border-slate-700 bg-slate-800 text-slate-200 placeholder-slate-500 focus:border-sky-500'
                : 'border-indigo-200/60 bg-white/80 text-slate-700 placeholder-indigo-400 focus:border-purple-500'
            }`}
          />
          <button
            type="submit"
            className={`rounded-lg px-5 py-2.5 text-sm font-bold transition-colors ${
              darkMode
                ? 'bg-sky-500 text-white hover:bg-sky-400'
                : 'bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-700 text-white hover:from-rose-400 hover:via-purple-500 hover:to-indigo-600'
            }`}
          >
            Add
          </button>
        </form>

        {total > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-medium ${
                darkMode ? 'text-slate-400' : 'text-indigo-500'
              }`}>
                {completed}/{total} completed
              </span>
              <span className="text-xs font-bold text-purple-500">{pct}%</span>
            </div>
            <div className={`h-1.5 w-full overflow-hidden rounded-full ${
              darkMode ? 'bg-slate-800' : 'bg-indigo-200/60'
            }`}>
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-600 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        <div className={`rounded-xl border transition-colors ${
          darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-indigo-200/60 bg-white/70'
        }`}>
          {tasks.length === 0 ? (
            <div className="p-10">
              <p className={`text-sm italic text-center py-6 transition-colors ${
                darkMode ? 'text-slate-500' : 'text-indigo-400'
              }`}>
                No tasks yet. Add one above!
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-800/50">
              {sorted.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center gap-3 px-5 py-3 group"
                >
                  <button
                    onClick={() => handleToggle(task.id)}
                    className={`shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? darkMode
                          ? 'bg-sky-500 border-sky-500'
                          : 'bg-purple-600 border-purple-600'
                        : darkMode
                          ? 'border-slate-600 hover:border-slate-500'
                          : 'border-indigo-300 hover:border-purple-400'
                    }`}
                  >
                    {task.completed && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handlePriority(task.id)}
                    className={`shrink-0 transition-colors ${
                      task.priority
                        ? 'text-amber-400 hover:text-amber-300'
                        : darkMode
                          ? 'text-slate-600 hover:text-slate-500'
                          : 'text-indigo-300 hover:text-indigo-400'
                    }`}
                    title={task.priority ? "High priority" : "Mark as priority"}
                  >
                    <svg className="w-4 h-4" fill={task.priority ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <span
                    className={`flex-1 text-sm transition-all ${
                      task.completed
                        ? darkMode
                          ? 'line-through text-slate-500'
                          : 'line-through text-indigo-400'
                        : darkMode
                          ? 'text-slate-300'
                          : 'text-slate-700'
                    }`}
                  >
                    {task.title}
                  </span>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity text-sm ${
                      darkMode
                        ? 'text-red-400 hover:text-red-300'
                        : 'text-red-500 hover:text-red-700'
                    }`}
                    title="Delete task"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;