import React from 'react'
import { useNavigate } from 'react-router-dom'
import bgcor from '../assets/herocor.png'

function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0b1f4d] via-[#08142e] to-[#050a1f] px-4 sm:px-6 md:px-16 pt-32 pb-20 overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-8 text-white text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Ensuring Transparency in the{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Digital News Era
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
            FactLens leverages advanced analytical intelligence to evaluate news authenticity
            and detect misinformation patterns. Empowering individuals and organizations
            to navigate today's information landscape with clarity and confidence.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => navigate('/factlens-detector')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold text-lg sm:text-xl shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1 transition duration-300"
            >
              Start Analysis
            </button>

            <button
              type="button"
              onClick={() => navigate('/headlines')}
              className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 font-semibold text-lg sm:text-xl hover:bg-white/20 transition duration-300"
            >
              Explore Platform
            </button>
          </div>
        </div>

        <div className="flex justify-center relative">
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl">
            <img
              src={bgcor}
              alt="FactLens Platform Preview"
              className="w-full max-w-[340px] md:max-w-[500px] object-contain animate-[float_5s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
