import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loadTasks, loadGoals } from '../utils/store'

const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-dashboard h-4 w-4" aria-hidden="true"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg> },
    { id: 'planner', label: 'Planner', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days h-4 w-4" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg> },
    { id: 'tasks', label: 'Tasks', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-todo h-4 w-4" aria-hidden="true"><path d="M13 5h8"></path><path d="M13 12h8"></path><path d="M13 19h8"></path><path d="m3 17 2 2 4-4"></path><rect x="3" y="4" width="6" height="6" rx="1"></rect></svg> },
    { id: 'goals', label: 'Goals', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target h-4 w-4" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> },
    { id: 'focus', label: 'Focus', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-timer h-4 w-4" aria-hidden="true"><line x1="10" x2="14" y1="2" y2="2"></line><line x1="12" x2="15" y1="14" y2="11"></line><circle cx="12" cy="14" r="8"></circle></svg> },
    { id: 'weather', label: 'Weather', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-sun h-4 w-4" aria-hidden="true"><path d="M12 2v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="M20 12h2"></path><path d="m19.07 4.93-1.41 1.41"></path><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"></path></svg> },
]

const Sidebar = ({ darkMode }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    const activeTab = location.pathname === '/planner' ? 'planner' : location.pathname === '/focus' ? 'focus' : location.pathname === '/tasks' ? 'tasks' : location.pathname === '/goals' ? 'goals' : location.pathname === '/weather' ? 'weather' : 'dashboard'

    const handleTabClick = (tabId) => {
        if (tabId === 'planner') {
            navigate('/planner')
        } else if (tabId === 'dashboard') {
            navigate('/')
        } else if (tabId === 'focus') {
            navigate('/focus')
        } else if (tabId === 'tasks') {
            navigate('/tasks')
        } else if (tabId === 'goals') {
            navigate('/goals')
        } else if (tabId === 'weather') {
            navigate('/weather')
        }
        setMobileOpen(false)
    }

    const [tDone, setTDone] = useState(0);
    const [tTotal, setTTotal] = useState(0);
    const [gDone, setGDone] = useState(0);
    const [gTotal, setGTotal] = useState(0);

    useEffect(() => {
        const refresh = () => {
            const t = loadTasks();
            setTDone(t.filter((x) => x.completed).length);
            setTTotal(t.length);
            const g = loadGoals();
            setGDone(g.filter((x) => x.completed).length);
            setGTotal(g.length);
        };
        refresh();
        window.addEventListener("focus", refresh);
        return () => window.removeEventListener("focus", refresh);
    }, []);

    const totalItems = tTotal + gTotal;
    const doneItems = tDone + gDone;
    const pct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

    return (
        <>
            {/* Mobile hamburger */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden fixed top-3 left-3 z-50 p-2 rounded-lg transition-colors ${
                    darkMode
                        ? 'bg-slate-900 text-slate-100 border border-slate-700'
                        : 'bg-white/90 text-indigo-700 border border-indigo-200 shadow-md backdrop-blur-md'
                }`}
                aria-label="Toggle sidebar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></>}
                </svg>
            </button>

            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Desktop sidebar */}
            <div className={`hidden lg:flex h-full w-64 shrink-0 flex-col border-r transition-colors duration-500 ${
                darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white/80 border-indigo-200/60 text-slate-800 backdrop-blur-xl'
            }`}>

                <div className={`border-b p-4 transition-colors ${
                    darkMode ? 'border-slate-800' : 'border-indigo-200/60'
                }`}>
                    <div className='flex items-center gap-3 px-6'>
                        <div className='grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-rose-400 via-purple-500 to-indigo-600 font-display font-bold text-white shadow-lg shadow-purple-500/30'>
                            N
                        </div>
                        <h3 className='font-bold text-xl tracking-tight'>
                            Nexus OS
                        </h3>
                    </div>
                </div>

                <div className='flex-1 space-y-1 p-4'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                activeTab === tab.id
                                    ? `${
                                        darkMode
                                            ? 'bg-slate-800 text-sky-400 border-l-4 border-sky-400 pl-3'
                                            : 'bg-gradient-to-r from-purple-100/80 to-indigo-100/80 text-indigo-700 border-l-4 border-purple-500 pl-3 shadow-sm'
                                      }`
                                    : `${
                                        darkMode
                                            ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                                            : 'text-indigo-400/80 hover:bg-indigo-100/60 hover:text-indigo-700'
                                      }`
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className='p-4'>
                    <div className={`rounded-xl border p-4 transition-colors ${
                        darkMode
                            ? 'border-slate-800 bg-slate-900/50'
                            : 'border-indigo-200/60 bg-gradient-to-br from-purple-50/80 to-indigo-50/80'
                    }`}>
                        <div className='flex items-center justify-between'>
                            <span className={`text-xs transition-colors ${
                                darkMode ? 'text-slate-400' : 'text-indigo-500'
                            }`}>Today's progress</span>
                            <span className='text-xs font-bold text-purple-500'>{pct}%</span>
                        </div>
                        <div className={`mt-2 h-1.5 w-full overflow-hidden rounded-full transition-colors ${
                            darkMode ? 'bg-slate-800' : 'bg-indigo-200/60'
                        }`}>
                            <div className='h-full bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-600 transition-all' style={{ width: `${pct}%` }}></div>
                        </div>
                        <p className={`mt-2 text-[10px] font-medium transition-colors ${
                            darkMode ? 'text-slate-500' : 'text-indigo-400'
                        }`}>{tDone}/{tTotal} tasks · {gDone}/{gTotal} goals</p>
                    </div>
                </div>

            </div>

            {/* Mobile sidebar drawer */}
            <div className={`lg:hidden fixed top-0 left-0 z-40 h-full w-64 flex-col border-r transition-all duration-300 ease-in-out ${
                mobileOpen ? 'translate-x-0' : '-translate-x-full'
            } ${
                darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-100'
                    : 'bg-white/95 border-indigo-200/60 text-slate-800 backdrop-blur-xl'
            }`}>
                <div className={`border-b p-4 pt-16 transition-colors ${
                    darkMode ? 'border-slate-800' : 'border-indigo-200/60'
                }`}>
                    <div className='flex items-center gap-3 px-6'>
                        <div className='grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-rose-400 via-purple-500 to-indigo-600 font-display font-bold text-white shadow-lg shadow-purple-500/30'>
                            N
                        </div>
                        <h3 className='font-bold text-xl tracking-tight'>
                            Nexus OS
                        </h3>
                    </div>
                </div>

                <div className='flex-1 space-y-1 p-4'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                activeTab === tab.id
                                    ? `${
                                        darkMode
                                            ? 'bg-slate-800 text-sky-400 border-l-4 border-sky-400 pl-3'
                                            : 'bg-gradient-to-r from-purple-100/80 to-indigo-100/80 text-indigo-700 border-l-4 border-purple-500 pl-3 shadow-sm'
                                      }`
                                    : `${
                                        darkMode
                                            ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                                            : 'text-indigo-400/80 hover:bg-indigo-100/60 hover:text-indigo-700'
                                      }`
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className='p-4'>
                    <div className={`rounded-xl border p-4 transition-colors ${
                        darkMode
                            ? 'border-slate-800 bg-slate-900/50'
                            : 'border-indigo-200/60 bg-gradient-to-br from-purple-50/80 to-indigo-50/80'
                    }`}>
                        <div className='flex items-center justify-between'>
                            <span className={`text-xs transition-colors ${
                                darkMode ? 'text-slate-400' : 'text-indigo-500'
                            }`}>Today's progress</span>
                            <span className='text-xs font-bold text-purple-500'>{pct}%</span>
                        </div>
                        <div className={`mt-2 h-1.5 w-full overflow-hidden rounded-full transition-colors ${
                            darkMode ? 'bg-slate-800' : 'bg-indigo-200/60'
                        }`}>
                            <div className='h-full bg-gradient-to-r from-rose-400 via-purple-500 to-indigo-600 transition-all' style={{ width: `${pct}%` }}></div>
                        </div>
                        <p className={`mt-2 text-[10px] font-medium transition-colors ${
                            darkMode ? 'text-slate-500' : 'text-indigo-400'
                        }`}>{tDone}/{tTotal} tasks · {gDone}/{gTotal} goals</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar