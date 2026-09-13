import React, { useState } from 'react'
import { FiMenu, FiSearch, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Headlines', path: '/headlines' },
  { label: 'Detector', path: '/factlens-detector' },
]

function Header() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const goTo = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 md:py-5">
        <button
          type="button"
          className="flex items-center gap-2 text-2xl md:text-4xl font-bold tracking-wider cursor-pointer"
          onClick={() => goTo('/')}
        >
          <FiSearch size={30} style={{ strokeWidth: '2px' }} />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            FACTLENS
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-gray-300 font-medium">
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              className="hover:text-white transition duration-300 cursor-pointer relative group text-lg lg:text-xl"
              onClick={() => goTo(item.path)}
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}

          <button
            type="button"
            onClick={() => goTo('/user/dashboard')}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition duration-300 shadow-lg hover:shadow-blue-500/40 text-lg lg:text-xl cursor-pointer"
          >
            My Dashboard
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden rounded-xl border border-white/10 bg-white/10 p-3 text-white"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden mx-4 mb-4 rounded-2xl border border-white/10 bg-[#08142e]/95 p-4 shadow-2xl">
          {[...navLinks, { label: 'My Dashboard', path: '/user/dashboard' }].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => goTo(item.path)}
              className="block w-full rounded-xl px-4 py-3 text-left text-gray-200 hover:bg-white/10 hover:text-white transition"
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}

export default Header
