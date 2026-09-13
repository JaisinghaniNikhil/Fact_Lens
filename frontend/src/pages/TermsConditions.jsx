import React from 'react'
import InfoPage from '../components/InfoPage'

function TermsConditions() {
  const sections = [
    {
      heading: 'Use of FactLens',
      body: 'FactLens is built for news discovery, article saving, and helpful credibility signals. Use it responsibly and do not rely on it as the only source for important decisions.',
    },
    {
      heading: 'Detector Results',
      body: 'The detector provides an assisted analysis, not a final legal or journalistic ruling. Always compare results with trusted reporting and official sources.',
    },
    {
      heading: 'User Accounts',
      body: 'Users are responsible for keeping their login details safe and for the activity that happens through their account.',
    },
    {
      heading: 'Acceptable Use',
      body: 'Do not misuse the platform, attempt to damage the service, submit harmful content, or use FactLens to harass others.',
    },
    {
      heading: 'Changes to Terms',
      body: 'These terms may be updated as FactLens improves. Continued use of the platform means you accept the latest version shown on this page.',
    },
  ]

  return (
    <InfoPage
      badge="Terms"
      title="Terms & Conditions"
      subtitle="Simple rules for using FactLens safely, fairly, and with the right expectations."
      sections={sections}
    />
  )
}

export default TermsConditions
