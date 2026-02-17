import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../brand/Logo.jsx'

const sections = [
    {
        title: 'Product',
        links: [
            { label: 'Features', to: '/#features' },
            { label: 'How It Works', to: '/#how-it-works' },
            { label: 'Dashboard', to: '/#dashboard' },
            { label: 'AI Recommendations', to: '/recommendations' },
        ],
    },
    {
        title: 'Trading',
        links: [
            { label: 'Upbit Auto Trading', to: '/trading/upbit' },
            { label: 'Binance Auto Trading', to: '/trading/binance' },
            { label: 'Risk Controls', to: '/#security' },
            { label: 'Pricing', to: '/#pricing' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'FAQ', to: '/#faq' },
            { label: 'Terms', to: '/terms' },
            { label: 'Privacy', to: '/privacy' },
            { label: 'Contact', to: 'mailto:support@alpha-st.com' },
        ],
    },
]

const renderLink = (link) => {
    if (link.to.startsWith('/#')) {
        return (
            <Link to={link.to} className="text-sm text-ink-400 transition-colors hover:text-ink-200">
                {link.label}
            </Link>
        )
    }

    if (link.to.startsWith('/')) {
        return (
            <Link to={link.to} className="text-sm text-ink-400 transition-colors hover:text-ink-200">
                {link.label}
            </Link>
        )
    }

    return (
        <a href={link.to} className="text-sm text-ink-400 transition-colors hover:text-ink-200">
            {link.label}
        </a>
    )
}

export default function Footer() {
    return (
        <footer className="mt-20 border-t border-white/10 bg-ink-950/65">
            <div className="container-custom py-14">
                <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
                    <div>
                        <Link to="/" className="inline-flex items-center">
                            <Logo compact />
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-400">
                            An AI-first trading workspace for signals, automation, and risk management.
                            Built for traders who want structure, speed, and consistent execution.
                        </p>
                    </div>

                    {sections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-sm font-semibold text-ink-100">{section.title}</h4>
                            <ul className="mt-3 space-y-2.5">
                                {section.links.map((link) => (
                                    <li key={link.label}>{renderLink(link)}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="section-divider mb-6 mt-10" />

                <div className="flex flex-col gap-3 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>Copyright 2026 Alpha-ST. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-ink-300">GitHub</a>
                        <a href="https://x.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-ink-300">X</a>
                        <a href="mailto:support@alpha-st.com" className="transition-colors hover:text-ink-300">support@alpha-st.com</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
