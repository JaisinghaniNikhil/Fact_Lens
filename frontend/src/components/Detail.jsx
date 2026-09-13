import React from 'react'
import { Check, Newspaper, SearchCheck, ShieldCheck } from 'lucide-react'

function Detail() {
  return (
    <section className="bg-[radial-gradient(circle_at_top_left,#0b1f4d_0%,#08142e_40%,#050a1f_100%)] py-16 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center gap-10 lg:gap-20">
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          <h4 className="text-lg tracking-wide uppercase text-blue-400">
            About FactLens
          </h4>

          <h3 className="text-3xl sm:text-4xl font-semibold text-white leading-tight">
            What is FactLens?
          </h3>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            FactLens is a modern news platform built to help readers access organized
            headlines, explore credible reporting, and verify the authenticity of news
            in a digital-first world.
          </p>

          <div className="flex flex-col gap-4 text-gray-300">
            {[
              'Curated daily news from reliable sources.',
              'Fact-checking tools for responsible awareness.',
              'Clean and structured reading experience.',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Check className="text-blue-400 shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:gap-8 w-full lg:w-1/2">
          {[
            {
              icon: ShieldCheck,
              title: 'Credible Reporting',
              text: 'Emphasis on clarity, structure, and responsible journalism.',
            },
            {
              icon: SearchCheck,
              title: 'Smart Verification',
              text: 'Tools that help users verify information quickly and accurately.',
            },
            {
              icon: Newspaper,
              title: 'Organized Headlines',
              text: 'Structured and easy-to-navigate daily news coverage.',
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="flex items-start gap-4 sm:gap-6 p-5 sm:p-6 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500 transition duration-300"
              >
                <Icon size={45} className="text-blue-400 shrink-0" />
                <div>
                  <p className="text-lg font-medium text-white">{item.title}</p>
                  <p className="text-gray-400 mt-1">{item.text}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Detail
