import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WeatherCard = ({ darkMode }) => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setTimeout(() => setError("Geolocation not supported"), 0);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
      },
      () => {
        setLocation({ latitude: 28.6139, longitude: 77.209 });
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
        );
        const data = await res.json();
        setWeather(data);
      } catch {
        setError("Failed to load weather");
      }
    };
    fetchWeather();
  }, [location]);

  const getWeatherEmoji = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 57) return "🌧️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦️";
    return "🌩️";
  };

  const getWeatherLabel = (code) => {
    if (code === 0) return "Clear";
    if (code <= 3) return "Partly cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 57) return "Drizzle";
    if (code <= 67) return "Rain";
    if (code <= 77) return "Snow";
    if (code <= 82) return "Rain showers";
    return "Thunderstorm";
  };

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
          Weather
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/weather")}
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
      <div className="flex-1 p-5">
        {error ? (
          <p className={`text-sm italic text-center py-6 transition-colors ${
            darkMode ? 'text-slate-500' : 'text-indigo-400'
          }`}>{error}</p>
        ) : !weather ? (
          <p className={`text-sm italic text-center py-6 transition-colors ${
            darkMode ? 'text-slate-500' : 'text-indigo-400'
          }`}>Loading weather…</p>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-5xl mb-2">
              {getWeatherEmoji(weather.current.weather_code)}
            </span>
            <span className={`text-3xl font-bold tracking-tight ${
              darkMode ? 'text-slate-200' : 'text-indigo-800'
            }`}>
              {Math.round(weather.current.temperature_2m)}°C
            </span>
            <span className={`text-xs mt-1 ${
              darkMode ? 'text-slate-400' : 'text-indigo-500'
            }`}>
              Feels like {Math.round(weather.current.apparent_temperature)}°C
            </span>
            <span className={`text-[10px] font-medium uppercase tracking-widest mt-2 ${
              darkMode ? 'text-slate-500' : 'text-indigo-400'
            }`}>
              {getWeatherLabel(weather.current.weather_code)}
            </span>
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-1">
                <svg className={`w-3 h-3 ${darkMode ? 'text-sky-400' : 'text-purple-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <span className={`text-[10px] ${
                  darkMode ? 'text-slate-400' : 'text-indigo-500'
                }`}>{weather.current.relative_humidity_2m}%</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className={`w-3 h-3 ${darkMode ? 'text-sky-400' : 'text-purple-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span className={`text-[10px] ${
                  darkMode ? 'text-slate-400' : 'text-indigo-500'
                }`}>{Math.round(weather.current.wind_speed_10m)} km/h</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;