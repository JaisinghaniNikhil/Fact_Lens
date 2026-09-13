import React from 'react'
import myabout from '../assets/4.webp'

const cards = [
  {
    number: '01',
    title: 'Who We Are',
    text: 'FactLens is a clarity-first platform built for people who want to read, verify, and understand news with confidence.',
  },
  {
    number: '02',
    title: 'What We Do',
    text: 'We bring headlines, source signals, and AI-assisted analysis into one simple experience.',
  },
  {
    number: '03',
    title: 'How We Help',
    text: 'We help users slow down misinformation by checking claims before sharing or trusting them.',
  },
  {
    number: '04',
    title: 'Your Dashboard',
    text: 'Create an account to browse topics, save articles, and keep useful stories organized.',
  },
]

function AboutComp() {
  return (
    <section className="relative bg-[#050a1f] text-white px-4 sm:px-6 md:px-16 pt-32 pb-20 md:pb-32 overflow-hidden">
      <div className="absolute top-20 left-4 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-4 w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto flex flex-col gap-14 md:gap-16">
        <div className="flex flex-col gap-3 text-center md:text-left">
          <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            About Us
          </h3>
          <p className="text-lg md:text-xl text-gray-300">
            FactLens - A Fake News Detector
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
            {cards.map((card) => (
              <div
                key={card.number}
                className="bg-white/5 border border-white/10 rounded-xl p-5 sm:p-6 backdrop-blur-md hover:border-blue-400/60 transition"
              >
                <h2 className="text-blue-400 text-xl font-bold">{card.number}</h2>
                <h4 className="text-lg font-semibold mt-2">{card.title}</h4>
                <p className="text-gray-300 mt-3 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl">
              <img
                src={myabout}
                alt="About FactLens"
                className="w-full max-w-[350px] md:max-w-[450px] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutComp
