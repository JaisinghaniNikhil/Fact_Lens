import React from 'react'
import Header from './Header'
import Footer from './Footer'

function InfoPage({ badge, title, subtitle, sections }) {
  return (
    <div className="myhome min-h-screen bg-gradient-to-br from-[#0b1f4d] via-[#08142e] to-[#050a1f] text-white">
      <Header />

      <main className="relative overflow-hidden px-4 sm:px-6 lg:px-16 pt-32 pb-20">
        <div className="absolute top-24 left-4 sm:left-12 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-16 right-4 sm:right-12 w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full" />

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-200">
              {badge}
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          <div className="grid gap-5">
            {sections.map((section, index) => (
              <article
                key={section.heading}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-7 backdrop-blur-xl shadow-xl"
              >
                <p className="text-blue-300 text-sm font-semibold mb-2">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="text-2xl font-semibold mb-3">{section.heading}</h2>
                <p className="text-gray-300 leading-relaxed">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default InfoPage
