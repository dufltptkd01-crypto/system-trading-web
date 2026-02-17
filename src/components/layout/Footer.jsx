import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../brand/Logo.jsx'
import { useI18n } from '../../i18n/I18nContext.jsx'

const footerContent = {
    ko: {
        sections: [
            {
                title: '제품',
                links: [
                    { label: '기능', to: '/#features' },
                    { label: '작동 방식', to: '/#how-it-works' },
                    { label: '대시보드', to: '/#dashboard' },
                    { label: 'AI 추천 종목', to: '/recommendations' },
                ],
            },
            {
                title: '트레이딩',
                links: [
                    { label: '업비트 자동매매', to: '/trading/upbit' },
                    { label: '바이낸스 자동매매', to: '/trading/binance' },
                    { label: '리스크 제어', to: '/#security' },
                    { label: '요금제', to: '/#pricing' },
                ],
            },
            {
                title: '지원',
                links: [
                    { label: '자주 묻는 질문', to: '/#faq' },
                    { label: '이용약관', to: '/terms' },
                    { label: '개인정보처리방침', to: '/privacy' },
                    { label: '문의하기', to: 'mailto:support@alpha-st.com' },
                ],
            },
        ],
        description: 'Alpha-ST는 신호 분석, 자동 실행, 리스크 관리가 하나의 워크스페이스에서 동작하도록 설계된 프리미엄 AI 자동매매 SaaS입니다.',
        copyright: 'Copyright 2026 Alpha-ST. All rights reserved.',
    },
    en: {
        sections: [
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
        ],
        description: 'Alpha-ST is a premium AI trading SaaS designed to unify signals, execution automation, and risk controls in one reliable workspace.',
        copyright: 'Copyright 2026 Alpha-ST. All rights reserved.',
    },
}

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
    const { locale } = useI18n()
    const copy = footerContent[locale] || footerContent.ko

    return (
        <footer className="mt-24 border-t border-white/8 bg-ink-950/72">
            <div className="container-custom py-16">
                <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
                    <div>
                        <Link to="/" className="inline-flex items-center">
                            <Logo compact />
                        </Link>
                        <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-400">
                            {copy.description}
                        </p>
                    </div>

                    {copy.sections.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-sm font-semibold text-ink-100/95">{section.title}</h4>
                            <ul className="mt-4 space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>{renderLink(link)}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="section-divider mb-6 mt-12" />

                <div className="flex flex-col gap-3 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>{copy.copyright}</p>
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
