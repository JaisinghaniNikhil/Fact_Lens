import React, { useState } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const platformLinks = [
  { label: 'Headlines', path: '/headlines' },
  { label: 'Detector', path: '/factlens-detector' },
  { label: 'About', path: '/about' },
  { label: 'Dashboard', path: '/user/dashboard' },
]

const resourceLinks = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms-and-conditions' },
  { label: 'FAQ', path: '/faq' },
]

const connectLinks = [
  { label: 'GitHub', href: 'https://github.com/JaisinghaniNikhil' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/-jaisinghani-nikhil/' },
  { label: 'Email', href: 'mailto:nikhiljaisinghani30@gmail.com' },
]

function Footer() {
  const navigate = useNavigate()
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setStatus('')

    try {
      const response = await fetch('https://fact-lens-tdlu.onrender.com/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()

      if (!response.ok) {
        setStatus(data.message || 'Feedback could not be sent.')
        return
      }

      setStatus('Thank you! Your feedback was sent successfully.')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('Could not connect to the feedback server.')
    } finally {
      setLoading(false)
    }
  }

  const closeModal = () => {
    setIsFeedbackOpen(false)
    setStatus('')
  }

  return (
    <footer className="relative bg-gradient-to-br from-[#08142e] via-[#050a1f] to-black text-gray-400 pt-20 pb-10 px-4 sm:px-6 md:px-16 border-t border-white/10 overflow-hidden">
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
        <div className="space-y-5">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-2xl font-bold tracking-wider cursor-pointer"
          >
            <FiSearch size={26} />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              FACTLENS
            </span>
          </button>

          <p className="text-gray-500 leading-relaxed">Verify Before You Trust.</p>
          <p className="text-sm text-gray-600">
            Promoting transparency and responsible news consumption in the digital age.
          </p>
        </div>

        <div>
          <h3 className="text-white text-xl font-semibold mb-5">Platform</h3>
          <ul className="space-y-3">
            {platformLinks.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="hover:text-blue-400 transition cursor-pointer text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xl font-semibold mb-5">Resources</h3>
          <ul className="space-y-3">
            {resourceLinks.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  className="hover:text-blue-400 transition cursor-pointer text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white text-xl font-semibold mb-5">Connect</h3>
          <ul className="space-y-3">
            {connectLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="hover:text-blue-400 transition"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 sm:col-span-2 lg:col-span-1">
          <h3 className="text-white font-semibold text-xl">Help Us Improve</h3>
          <p className="text-sm text-gray-500">
            Your feedback helps us enhance FactLens and build a more transparent news ecosystem.
          </p>

          <button
            type="button"
            onClick={() => setIsFeedbackOpen(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 font-medium text-white hover:from-blue-600 hover:to-indigo-600 transition duration-300 shadow-lg hover:shadow-blue-500/30 text-lg sm:text-xl"
          >
            Give Feedback
          </button>
        </div>
      </div>

      <div className="mt-16 border-t border-white/10 pt-6 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} FactLens. Built with clarity & trust.
      </div>

      {isFeedbackOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#08142e] p-5 sm:p-7 shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition"
              aria-label="Close feedback modal"
            >
              <FiX size={22} />
            </button>

            <div className="pr-10">
              <p className="text-sm text-blue-300 font-medium">Feedback</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                Help us improve FactLens
              </h3>
              <p className="text-gray-400 mt-3">
                Tell us what worked, what felt confusing, or what you would like to see next.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your feedback..."
                required
                rows="5"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

              {status && (
                <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200">
                  {status}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 py-3 font-semibold text-white hover:from-blue-600 hover:to-indigo-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Feedback'}
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  )
}

export default Footer
