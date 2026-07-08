import { useState, useEffect, useCallback } from 'react'

const getInitialQuote = () => {
  const today = new Date().toDateString()
  const cached = localStorage.getItem('dailyQuote')
  if (cached) {
    try {
      const { date, quote } = JSON.parse(cached)
      if (date === today && quote) return quote
    } catch {
      // ignore parse errors
    }
  }
  return null
}

const QuoteCard = ({ darkMode }) => {
  const [quote, setQuote] = useState(getInitialQuote)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRandomQuote = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://dummyjson.com/quotes/random')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      return { content: data.quote, author: data.author }
    } catch (e) {
      setError(e.message || 'Could not load quote')
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (quote) return
    const today = new Date().toDateString()
    ;(async () => {
      const q = await fetchRandomQuote()
      if (q) {
        setQuote(q)
        localStorage.setItem('dailyQuote', JSON.stringify({ date: today, quote: q }))
      }
    })()
  }, [fetchRandomQuote, quote])

  const handleNewQuote = async () => {
    const q = await fetchRandomQuote()
    if (q) setQuote(q)
  }

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
          Daily Quote
        </h2>
      </header>
      <div className="flex-1 flex flex-col justify-center p-5 overflow-y-auto">
        {error && !quote ? (
          <p className={`text-sm text-center transition-colors ${
            darkMode ? 'text-red-400' : 'text-red-500'
          }`}>{error}</p>
        ) : quote ? (
          <div className="flex flex-col justify-center min-h-0">
            <p className={`text-sm leading-relaxed italic transition-colors ${
              darkMode ? 'text-slate-300' : 'text-slate-600'
            }`}>
              &ldquo;{quote.content}&rdquo;
            </p>
            <p className={`mt-3 text-xs font-medium transition-colors ${
              darkMode ? 'text-slate-400' : 'text-indigo-500'
            }`}>
              — {quote.author}
            </p>
            <button
              onClick={handleNewQuote}
              disabled={loading}
              className={`mt-4 w-full rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                darkMode
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50'
                  : 'bg-gradient-to-r from-purple-100/80 to-indigo-100/80 text-indigo-600 hover:from-purple-200/80 hover:to-indigo-200/80 disabled:opacity-50'
              }`}
            >
              {loading ? 'Loading…' : 'New Quote'}
            </button>
          </div>
        ) : (
          <div className="animate-pulse space-y-2">
            <div className={`h-4 rounded ${darkMode ? 'bg-slate-800' : 'bg-indigo-200/60'}`} />
            <div className={`h-4 rounded w-3/4 ${darkMode ? 'bg-slate-800' : 'bg-indigo-200/60'}`} />
            <div className={`mt-3 h-3 rounded w-1/4 ${darkMode ? 'bg-slate-800' : 'bg-indigo-200/60'}`} />
          </div>
        )}
      </div>
    </div>
  )
}

export default QuoteCard