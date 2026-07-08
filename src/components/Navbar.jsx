import { useState, useEffect } from 'react'

const Navbar = ({ darkMode, setDarkMode }) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const dayName = days[time.getDay()]
  const monthName = months[time.getMonth()]
  const day = time.getDate()
  const dateStr = `${dayName}, ${monthName} ${day}`

  return (
    <header className={`sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
      darkMode
        ? 'border-slate-800 bg-slate-950/70 text-slate-100'
        : 'border-indigo-200/60 bg-white/70 text-slate-800 backdrop-blur-md'
    } backdrop-blur-md`}>
      <div className='relative w-full max-w-md'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors ${
          darkMode ? 'text-slate-500' : 'text-indigo-400'
        }`}>
          <path d="m21 21-4.34-4.34"></path>
          <circle cx="11" cy="11" r="8"></circle>
        </svg>
        <input
          placeholder="Search commands, tasks, or files..."
          className={`h-9 w-full rounded-full border px-10 text-sm transition-colors focus:outline-none focus:ring-2 ${
            darkMode
              ? 'border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:ring-sky-400/20'
              : 'border-indigo-200/60 bg-indigo-50/50 text-slate-700 placeholder-indigo-400 focus:border-purple-500 focus:ring-purple-500/20'
          }`}
          type="text"
        />
      </div>

      <div className='flex items-center gap-2 sm:gap-4'>
        <div className='hidden sm:block text-right'>
          <div className={`font-display text-sm font-bold tabular-nums leading-none transition-colors ${
            darkMode ? 'text-slate-100' : 'text-slate-800'
          }`}>
            {hours}:{minutes}
          </div>
          <div className={`text-[10px] uppercase tracking-widest transition-colors ${
            darkMode ? 'text-slate-400' : 'text-indigo-500'
          }`}>
            {dateStr}
          </div>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 h-9 w-9 rounded-full ${
            darkMode
              ? 'hover:bg-slate-800 hover:text-slate-100 text-slate-400 focus-visible:ring-sky-400'
              : 'hover:bg-indigo-100 hover:text-indigo-700 text-indigo-500 focus-visible:ring-purple-500'
          }`}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </svg>
          )}
        </button>

        <div className={`h-6 w-px transition-colors ${
          darkMode ? 'bg-slate-800' : 'bg-indigo-200/60'
        }`}></div>

        <div className='hidden sm:flex items-center gap-3'>
          <div className='text-right'>
            <div className={`text-xs font-bold leading-none transition-colors ${
              darkMode ? 'text-slate-100' : 'text-slate-800'
            }`}>
              Alex Sterling
            </div>
            <div className={`mt-1 text-[10px] uppercase tracking-widest transition-colors ${
              darkMode ? 'text-slate-400' : 'text-indigo-500'
            }`}>
              Admin
            </div>
          </div>
          <div className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold transition-colors ${
            darkMode ? 'bg-sky-500 text-white' : 'bg-gradient-to-br from-rose-400 via-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/30'
          }`}>
            AS
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar