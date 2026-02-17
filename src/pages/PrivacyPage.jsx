import React from 'react'
import { Link } from 'react-router-dom'

const sections = [
    {
        title: '1. Data We Collect',
        points: [
            'Account data: name, email, login credentials.',
            'Connection data: exchange API keys and configuration metadata.',
            'Usage data: logs, device/browser details, and interaction events.',
        ],
    },
    {
        title: '2. Why We Use Data',
        points: [
            'To provide trading dashboards, recommendations, and automation features.',
            'To protect accounts, detect abuse, and maintain platform reliability.',
            'To improve product quality through aggregate usage analytics.',
        ],
    },
    {
        title: '3. Security Controls',
        points: [
            'Sensitive fields are encrypted at rest.',
            'Transport traffic is protected with TLS.',
            'Access to production data is restricted and audited.',
        ],
    },
    {
        title: '4. Data Retention',
        points: [
            'Data is retained only as long as needed for service delivery and legal obligations.',
            'You can request account deletion, subject to mandatory retention requirements.',
        ],
    },
    {
        title: '5. Sharing and Disclosure',
        points: [
            'We do not sell personal data.',
            'Data may be shared only with service providers or when legally required.',
        ],
    },
    {
        title: '6. Your Rights',
        points: [
            'You can request access, correction, deletion, or restriction of your data.',
            'You can contact us at privacy@alpha-st.com for privacy requests.',
        ],
    },
]

export default function PrivacyPage() {
    return (
        <section className="min-h-screen px-4 pb-16 pt-24">
            <div className="container-custom max-w-4xl">
                <div className="mb-10">
                    <Link to="/" className="text-sm text-brand-300 hover:text-brand-200">
                        Back to home
                    </Link>
                    <h1 className="mt-3 text-3xl font-semibold text-ink-100 md:text-4xl">Privacy Policy</h1>
                    <p className="mt-2 text-sm text-ink-500">Last updated: February 17, 2026</p>
                </div>

                <div className="glass-card space-y-6 p-6 sm:p-8 md:p-10 text-sm text-ink-300">
                    <p>
                        This policy explains how Alpha-ST collects, uses, protects, and stores personal data.
                    </p>

                    {sections.map((section) => (
                        <section key={section.title}>
                            <h2 className="mb-2 text-lg font-semibold text-ink-100">{section.title}</h2>
                            <ul className="space-y-1.5 pl-4 text-ink-300 list-disc">
                                {section.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </section>
                    ))}

                    <div className="rounded-xl border border-brand-400/25 bg-brand-500/8 p-4 text-sm text-ink-300">
                        We strongly recommend using exchange API keys with withdrawal permission disabled.
                    </div>

                    <div className="border-t border-white/10 pt-5 text-xs text-ink-500">
                        For privacy concerns: privacy@alpha-st.com
                    </div>
                </div>
            </div>
        </section>
    )
}
