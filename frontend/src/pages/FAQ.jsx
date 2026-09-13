import React from 'react'
import InfoPage from '../components/InfoPage'

function FAQ() {
  const sections = [
    {
      heading: 'What is FactLens?',
      body: 'FactLens is a news-focused platform that helps users browse headlines, save useful stories, and analyze suspicious claims or articles.',
    },
    {
      heading: 'How does the detector work?',
      body: 'You paste a headline or claim, and FactLens reviews language patterns, context, and available source signals to provide a credibility verdict.',
    },
    {
      heading: 'Can I trust every result completely?',
      body: 'No automated tool is perfect. Treat the result as a helpful signal and check trusted publications or official sources before making important decisions.',
    },
    {
      heading: 'Why do some headlines fail to load?',
      body: 'News loading depends on the configured news API key and provider limits. If the API key is missing or limited, the page may show an error instead of articles.',
    },
    {
      heading: 'How can I share feedback?',
      body: 'Use the Give Feedback button in the footer. Your message will be sent to the configured FactLens feedback email address.',
    },
  ]

  return (
    <InfoPage
      badge="Help Center"
      title="Frequently Asked Questions"
      subtitle="Quick answers for the main things users usually want to know before using FactLens."
      sections={sections}
    />
  )
}

export default FAQ
