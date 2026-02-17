import React from 'react'
import { Link } from 'react-router-dom'

const sections = [
    {
        title: '1. Purpose',
        body: 'These Terms govern your use of Alpha-ST, including recommendation tools, strategy settings, and automated execution features.',
    },
    {
        title: '2. Eligibility',
        body: 'You must be legally able to enter binding agreements and use exchange APIs in compliance with local regulations.',
    },
    {
        title: '3. Service Scope',
        body: 'Alpha-ST provides signal analysis, automation tooling, and reporting views. It does not provide financial, legal, or tax advice.',
    },
    {
        title: '4. Account and API Responsibility',
        body: 'You are responsible for API key setup, permission configuration, and all actions taken through your account.',
    },
    {
        title: '5. Risk Disclosure',
        body: 'Market trading carries risk of loss. Past strategy performance does not guarantee future results.',
    },
    {
        title: '6. Acceptable Use',
        body: 'You must not use the service for abusive behavior, unauthorized access, or actions that violate exchange terms.',
    },
    {
        title: '7. Service Changes',
        body: 'Features may evolve over time. Material updates will be announced through in-app notices or official channels.',
    },
    {
        title: '8. Suspension and Termination',
        body: 'We may suspend access if misuse, security risks, or legal violations are detected.',
    },
    {
        title: '9. Limitation of Liability',
        body: 'To the maximum extent permitted by law, Alpha-ST is not liable for indirect losses, strategy outcomes, or exchange downtime.',
    },
    {
        title: '10. Contact',
        body: 'For questions about these Terms, contact support@alpha-st.com.',
    },
]

export default function TermsPage() {
    return (
        <section className="min-h-screen px-4 pb-16 pt-24">
            <div className="container-custom max-w-4xl">
                <div className="mb-10">
                    <Link to="/" className="text-sm text-brand-300 hover:text-brand-200">
                        Back to home
                    </Link>
                    <h1 className="mt-3 text-3xl font-semibold text-ink-100 md:text-4xl">Terms of Service</h1>
                    <p className="mt-2 text-sm text-ink-500">Last updated: February 17, 2026</p>
                </div>

                <div className="glass-card space-y-6 p-6 sm:p-8 md:p-10 text-sm text-ink-300">
                    <p>
                        By using Alpha-ST, you agree to these Terms. If you do not agree, do not use the service.
                    </p>

                    {sections.map((section) => (
                        <section key={section.title}>
                            <h2 className="mb-2 text-lg font-semibold text-ink-100">{section.title}</h2>
                            <p className="leading-relaxed text-ink-300">{section.body}</p>
                        </section>
                    ))}

                    <div className="rounded-xl border border-signal-500/25 bg-signal-500/7 p-4 text-sm text-ink-300">
                        Important: you are solely responsible for all investment decisions and exchange account settings.
                    </div>

                    <div className="border-t border-white/10 pt-5 text-xs text-ink-500">
                        Effective date: February 17, 2026
                    </div>
                </div>
            </div>
        </section>
    )
}
