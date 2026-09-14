import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NewspaperIcon } from 'lucide-react'

// Same backend used everywhere else in the app — keep this in sync with
// Dashboard.jsx's API_BASE.
const API_BASE = 'https://fact-lens-tdlu.onrender.com'

function Headlines() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getNews = async () => {
    try {
      setLoading(true)
      setError(null)

      // Calls our own backend, which proxies NewsAPI's /v2/everything.
      // No API key needed here — the backend holds it server-side, and
      // this also avoids NewsAPI's block on direct browser requests in
      // production.
      const res = await axios.get(`${API_BASE}/api/news/headlines`)
      setNews(res.data || [])
    } catch {
      setError('Failed to fetch headlines.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getNews()
  }, [])

  return (
    <section
      id="headlines"
      className="relative min-h-screen bg-gradient-to-br from-[#0b1f4d] via-[#08142e] to-[#050a1f] pt-32 pb-16 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white flex flex-col sm:flex-row items-center justify-center gap-3">
            <NewspaperIcon size={36} className="text-blue-400" />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Top Headlines
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Browse fresh stories and use FactLens Detector when a claim needs a closer look.
          </p>
        </div>

        {loading && (
          <div className="text-center text-gray-300 text-lg">
            Fetching latest news...
          </div>
        )}

        {error && (
          <div className="max-w-xl mx-auto text-center text-red-300 bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-4">
            {error}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center text-gray-400 border border-dashed border-white/20 rounded-2xl px-5 py-12">
            No headlines found right now.
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10">
            {news.map((article, index) => (
              <article
                key={article.url || index}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/60 transition-all duration-500 shadow-lg hover:shadow-blue-500/10 flex flex-col"
              >
                <div className="overflow-hidden">
                  <img
                    src={article.urlToImage || 'https://placehold.co/400x220/08142e/93c5fd?text=FactLens'}
                    alt={article.title || 'News'}
                    className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-semibold text-white text-base leading-snug mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {article.description || 'Open the full article to read more details.'}
                    </p>
                  </div>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-blue-400 font-medium hover:text-blue-300 transition"
                  >
                    Read Full Article
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Headlines