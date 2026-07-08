import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import PlannerPage from './pages/PlannerPage'
import FocusPage from './pages/FocusPage'
import TasksPage from './pages/TasksPage'
import GoalsPage from './pages/GoalsPage'
import WeatherPage from './pages/WeatherPage'

const App = () => {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <BrowserRouter>
      <div className={`h-screen w-full overflow-hidden transition-colors duration-500 ${
        darkMode
          ? 'bg-slate-950 text-slate-100'
          : 'bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-100 text-slate-800'
      }`}>
        <div className='flex h-full'>
          <div className='h-full overflow-hidden'>
            <Sidebar darkMode={darkMode} />
          </div>
          <div className='flex-1 flex flex-col h-full overflow-hidden'>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className='flex-1 overflow-y-auto'>
              <Routes>
                <Route path="/" element={<Home darkMode={darkMode} />} />
                <Route path="/planner" element={<PlannerPage darkMode={darkMode} />} />
                <Route path="/focus" element={<FocusPage darkMode={darkMode} />} />
                <Route path="/tasks" element={<TasksPage darkMode={darkMode} />} />
                <Route path="/goals" element={<GoalsPage darkMode={darkMode} />} />
                <Route path="/weather" element={<WeatherPage darkMode={darkMode} />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App