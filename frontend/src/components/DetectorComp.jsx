import React, { useState } from 'react'

function DetectorComp() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleAnalyze = async () => {
    try {
      setLoading(true)
      setError('')
      setResult(null)

      const response = await fetch('https://fact-lens-tdlu.onrender.com/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch {
      setError('Could not connect to server. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const verdictColor = (verdict) => {
    if (verdict === 'Likely Real') return 'text-green-400'
    if (verdict === 'Likely Fake') return 'text-red-400'
    return 'text-yellow-400'
  }

  const barColor = (verdict) => {
    if (verdict === 'Likely Real') return 'bg-green-500'
    if (verdict === 'Likely Fake') return 'bg-red-500'
    return 'bg-yellow-500'
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0b1f4d] via-[#08142e] to-[#050a1f] px-4 sm:px-6 py-28 overflow-hidden">
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            News Verification
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Paste any headline or news claim and analyze whether it may be real or fake.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2">
          <p className="text-xs text-yellow-300">
            Experimental AI fact-checker — verdicts are AI-generated and not a substitute for professional fact-checking.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl space-y-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your headline or claim here..."
            className="w-full h-40 p-4 rounded-xl bg-transparent border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
          />
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
            <span className="text-sm text-gray-500">{input.length} characters</span>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!input.trim() || loading}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 font-semibold text-white hover:from-blue-600 hover:to-indigo-600 transition duration-300 shadow-lg hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-400 font-medium bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            Warning: {error}
          </div>
        )}

        {result && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl text-left space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-2xl font-semibold text-white">
                Verdict:{' '}
                <span className={verdictColor(result.verdict)}>
                  {result.verdict}
                </span>
              </h3>
              <span className="text-sm text-gray-400 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                Confidence: {result.confidence}%
              </span>
            </div>

            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-700 ${barColor(result.verdict)}`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>

            {result.summary && (
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-sm text-gray-300 font-medium mb-1">Analysis Summary</p>
                <p className="text-gray-400 text-sm leading-relaxed">{result.summary}</p>
              </div>
            )}

            {result.redFlags?.length > 0 && (
              <div>
                <p className="text-sm text-red-400 font-medium mb-3">Red Flags Detected</p>
                <ul className="space-y-2">
                  {result.redFlags.map((flag, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-red-400 mt-0.5">-</span>
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.positiveSignals?.length > 0 && (
              <div>
                <p className="text-sm text-green-400 font-medium mb-3">Credibility Signals</p>
                <ul className="space-y-2">
                  {result.positiveSignals.map((signal, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-green-400 mt-0.5">-</span>
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.citedSources?.length > 0 && (
              <div>
                <p className="text-sm text-blue-300 font-medium mb-3">
                  Sources the agent checked
                </p>
                <div className="space-y-3">
                  {result.citedSources.map((source, index) => (
                    <a
                      key={index}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-xl border border-white/10 hover:border-blue-500 transition"
                    >
                      <p className="text-white font-medium text-sm">{source.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{source.domain}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {result.citedSources?.length === 0 && (
              <p className="text-xs text-gray-500 italic">
                No specific sources were found for this claim. This often means the topic
                has limited or no news coverage.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default DetectorComp