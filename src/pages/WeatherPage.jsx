import { useState, useEffect } from "react";

const WeatherPage = ({ darkMode }) => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setTimeout(() => setError("Geolocation not supported"), 0);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => setLocation({ latitude: 28.6139, longitude: 77.209 })
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
        // ignore fetch errors
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

  const dayName = (i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-3 sm:p-5">
        <div className="mb-6 sm:mb-8">
          <h1 className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
            darkMode ? 'text-slate-300' : 'text-indigo-700'
          }`}>
            Weather
          </h1>
          <p className={`mt-1 text-xs sm:text-sm transition-colors ${
            darkMode ? 'text-slate-500' : 'text-indigo-400'
          }`}>
            Current conditions and 7-day forecast for your location.
          </p>
        </div>

        <div className={`rounded-xl border transition-colors ${
          darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-indigo-200/60 bg-white/70'
        }`}>
          {error ? (
            <div className="p-10">
              <p className={`text-sm italic text-center py-6 transition-colors ${
                darkMode ? 'text-slate-500' : 'text-indigo-400'
              }`}>{error}</p>
            </div>
          ) : !weather ? (
            <div className="p-10">
              <p className={`text-sm italic text-center py-6 transition-colors ${
                darkMode ? 'text-slate-500' : 'text-indigo-400'
              }`}>Loading weather data…</p>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-8 sm:mb-10">
                <span className="text-6xl sm:text-8xl">{getWeatherEmoji(weather.current.weather_code)}</span>
                <div className="text-center sm:text-left">
                  <div className={`text-4xl sm:text-6xl font-bold tracking-tight ${
                    darkMode ? 'text-slate-100' : 'text-indigo-800'
                  }`}>
                    {Math.round(weather.current.temperature_2m)}°C
                  </div>
                  <div className={`text-xs sm:text-sm mt-1 ${
                    darkMode ? 'text-slate-400' : 'text-indigo-500'
                  }`}>
                    Feels like {Math.round(weather.current.apparent_temperature)}°C
                  </div>
                  <div className={`text-xs sm:text-sm font-medium mt-1 ${
                    darkMode ? 'text-slate-300' : 'text-indigo-700'
                  }`}>
                    {getWeatherLabel(weather.current.weather_code)}
                  </div>
                  <div className="flex gap-4 mt-2 text-xs text-indigo-400">
                    <span>💧 {weather.current.relative_humidity_2m}% humidity</span>
                    <span>💨 {Math.round(weather.current.wind_speed_10m)} km/h wind</span>
                  </div>
                </div>
              </div>

              <div className={`border-t pt-6 ${
                darkMode ? 'border-slate-800' : 'border-indigo-200/60'
              }`}>
                <h3 className={`text-sm font-bold mb-4 ${
                  darkMode ? 'text-slate-300' : 'text-indigo-700'
                }`}>
                  7-Day Forecast
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-3">
                  {weather.daily.time.map((date, i) => (
                    <div
                      key={date}
                      className={`rounded-lg p-2 sm:p-3 text-center transition-colors ${
                        i === 0
                          ? darkMode
                            ? 'bg-sky-400/10 ring-1 ring-sky-400/30'
                            : 'bg-gradient-to-br from-purple-100/50 to-indigo-100/50 ring-1 ring-purple-500/30'
                          : darkMode
                            ? 'bg-slate-800/50'
                            : 'bg-indigo-100/40'
                      }`}
                    >
                      <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 sm:mb-2 ${
                        darkMode ? 'text-slate-400' : 'text-indigo-500'
                      }`}>
                        {i === 0 ? "Today" : dayName(i)}
                      </div>
                      <div className="text-xl sm:text-2xl mb-1">
                        {getWeatherEmoji(weather.daily.weather_code[i])}
                      </div>
                      <div className={`text-xs sm:text-sm font-bold ${
                        darkMode ? 'text-slate-200' : 'text-indigo-800'
                      }`}>
                        {Math.round(weather.daily.temperature_2m_max[i])}°
                      </div>
                      <div className={`text-[10px] ${
                        darkMode ? 'text-slate-500' : 'text-indigo-400'
                      }`}>
                        {Math.round(weather.daily.temperature_2m_min[i])}°
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;