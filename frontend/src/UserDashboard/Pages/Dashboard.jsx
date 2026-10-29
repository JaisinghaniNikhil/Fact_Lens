import React, { useEffect, useState, useCallback } from 'react'
import { User } from 'lucide-react'
import Modal from '../Components/Modal'
import Navbar from '../Components/Navbar'
import FilterBar from '../Components/FilterBar'
import NewsCard from '../Components/NewsCard'
import SavedArticles from '../Components/SavedArticles'
import axios from 'axios'

const API_BASE = 'http://localhost:7900'

function Dashboard() {
  const [user, setUser] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  // Headlines browsing state
  const [activeCategory, setActiveCategory] = useState(null) // null = "Top 10"
  const [headlines, setHeadlines] = useState([])
  const [headlinesLoading, setHeadlinesLoading] = useState(false)
  const [savingUrl, setSavingUrl] = useState(null) // tracks which card is mid-save

  // Saved articles state
  const [savedArticles, setSavedArticles] = useState([])
  const [savedLoading, setSavedLoading] = useState(false)
  const [removingId, setRemovingId] = useState(null)

  const getToken = () => localStorage.getItem('token')

  const fetchUser = useCallback(async () => {
    try {
      const token = getToken()
      const res = await axios.get(`${API_BASE}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(res.data)
    } catch (err) {
      alert(err?.response?.data?.message)
    }
  }, [])

  const fetchHeadlines = useCallback(async (category) => {
    try {
      setHeadlinesLoading(true)
      const params = category ? { category } : {}
      const res = await axios.get(`${API_BASE}/api/news/headlines`, { params })
      setHeadlines(res.data || [])
    } catch (err) {
      console.error('Failed to load headlines:', err?.response?.data?.message || err.message)
      setHeadlines([])
    } finally {
      setHeadlinesLoading(false)
    }
  }, [])

  const fetchSavedArticles = useCallback(async () => {
    try {
      setSavedLoading(true)
      const token = getToken()
      const userId = user?._id || user?.id
      if (!userId) return

      const res = await axios.get(`${API_BASE}/api/news/saved/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSavedArticles(res.data || [])
    } catch (err) {
      console.error('Failed to load saved articles:', err?.response?.data?.message || err.message)
    } finally {
      setSavedLoading(false)
    }
  }, [user])

  const handleSaveArticle = async (article) => {
    try {
      setSavingUrl(article.url)
      const token = getToken()

      await axios.post(
        `${API_BASE}/api/news/save`,
        {
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          category: activeCategory || 'general',
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      fetchSavedArticles()
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not save article')
    } finally {
      setSavingUrl(null)
    }
  }

  const handleRemoveSaved = async (id) => {
    try {
      setRemovingId(id)
      const token = getToken()

      await axios.delete(`${API_BASE}/api/news/saved/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setSavedArticles((prev) => prev.filter((a) => a._id !== id))
    } catch (err) {
      alert(err?.response?.data?.message || 'Could not remove article')
    } finally {
      setRemovingId(null)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  useEffect(() => {
    fetchHeadlines(activeCategory)
  }, [activeCategory, fetchHeadlines])

  useEffect(() => {
    if (user?._id || user?.id) {
      fetchSavedArticles()
    }
  }, [user, fetchSavedArticles])

  const categoryLabel = (key) => {
    const found = [
      { key: 'business', label: 'Business' },
      { key: 'sports', label: 'Sports' },
      { key: 'politics', label: 'Politics' },
      { key: 'technology', label: 'Technology' },
      { key: 'entertainment', label: 'Entertainment' },
    ].find((c) => c.key === key)
    return found ? found.label : null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navbar userName={user?.fname} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header row with profile trigger */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Hey, <span className="text-blue-400">{user?.fname}</span> 👋
          </h2>

          <div
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition cursor-pointer"
          >
            <User strokeWidth={1.5} size={28} />
          </div>
        </div>

        {/* Category filters */}
        <FilterBar activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

        {/* Headlines grid */}
        <div className="mt-6">
          {headlinesLoading && (
            <p className="text-gray-400 text-sm">Loading headlines…</p>
          )}

          {!headlinesLoading && headlines.length === 0 && (
            <p className="text-gray-400 text-sm border border-dashed border-white/20 rounded-xl p-6 text-center">
              No headlines found for this category right now.
            </p>
          )}

          {!headlinesLoading && headlines.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {headlines.map((article, i) => (
                <NewsCard
                  key={article.url || i}
                  article={article}
                  categoryLabel={categoryLabel(activeCategory)}
                  onSave={handleSaveArticle}
                  isSaving={savingUrl === article.url}
                />
              ))}
            </div>
          )}
        </div>

        {/* Saved for later */}
        <SavedArticles
          items={savedArticles}
          loading={savedLoading}
          onRemove={handleRemoveSaved}
          removingId={removingId}
        />
      </div>

      {/* Profile Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="text-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">User Profile</h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Full Name</span>
              <span className="font-medium">
                {`${user?.fname || ''} ${user?.lname || ''}`}
              </span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Email</span>
              <span className="font-medium">{user?.email}</span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Phone</span>
              <span className="font-medium">{user?.phone}</span>
            </div>

            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Age</span>
              <span className="font-medium">{user?.age}</span>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 transition py-2 rounded-lg font-medium"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Dashboard