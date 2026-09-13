import React from 'react'
import InfoPage from '../components/InfoPage'

function PrivacyPolicy() {
  const sections = [
    {
      heading: 'Information We Collect',
      body: 'FactLens may collect basic account details, saved article choices, feedback messages, and news text submitted for analysis so the platform can provide its main features.',
    },
    {
      heading: 'How We Use Information',
      body: 'We use information to run the detector, personalize your dashboard, improve the website, respond to feedback, and keep the service secure.',
    },
    {
      heading: 'Data Safety',
      body: 'We aim to store only useful information and protect it with sensible access controls. Avoid submitting passwords, financial details, or private documents inside feedback or news analysis boxes.',
    },
    {
      heading: 'Third-Party Services',
      body: 'FactLens uses news and analysis services to fetch articles and review claims. Those services may process the text or requests required for the feature you use.',
    },
    {
      heading: 'Your Choices',
      body: 'You can choose not to create an account, avoid saving articles, or contact the FactLens team if you want help with account-related information.',
    },
  ]

  return (
    <InfoPage
      badge="Privacy"
      title="Privacy Policy"
      subtitle="A clear overview of what FactLens collects, why it is used, and how users can make informed choices."
      sections={sections}
    />
  )
}

export default PrivacyPolicy
