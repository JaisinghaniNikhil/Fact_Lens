import React from 'react'
import { useNavigate } from 'react-router-dom'
import robohii from '../assets/robohi2.png'

function Intro() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1f4d] via-[#08142e] to-[#050a1f] px-4 sm:px-6 py-20 text-white overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <div className="flex justify-center">
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl hover:scale-105 transition duration-500">
            <img
              src={robohii}
              alt="FactLens AI Robot"
              className="w-64 sm:w-72 md:w-96 object-contain animate-[float_4s_ease-in-out_infinite]"
            />
          </div>
        </div>

        <div className="space-y-8 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Introducing the{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              FactLens Detector
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
            FactLens Detector empowers you to instantly assess the credibility of news articles
            and headlines. Powered by advanced AI analysis, it evaluates linguistic patterns
            and contextual signals to detect misinformation, helping you verify before you trust.
          </p>

          <button
            type="button"
            onClick={() => navigate('/factlens-detector')}
            className="relative px-10 py-4 text-lg sm:text-xl font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition duration-300 shadow-lg hover:shadow-blue-500/40 transform hover:-translate-y-1 cursor-pointer"
          >
            Analyze News
          </button>
        </div>
      </div>
    </section>
  )
}

export default Intro
