import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { LogOut, Home } from 'lucide-react';

// Top bar for the user dashboard (FactLens theme)
function Navbar({ userName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/user/login');
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0b1f4d]/90 border-b border-white/10 text-white">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-wide"
        >
          <FiSearch size={26} style={{ strokeWidth: '2px' }} />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            FACTLENS
          </span>
        </button>

        <div className="flex items-center gap-3 md:gap-4">
          {userName && (
            <span className="text-sm text-gray-300 hidden sm:inline">
              Hi, <span className="text-white font-medium">{userName}</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/15 text-sm text-gray-200 hover:bg-white/10 transition"
          >
            <Home size={18} />
            <span className="hidden sm:inline">Home</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-sm font-medium hover:from-blue-600 hover:to-indigo-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
