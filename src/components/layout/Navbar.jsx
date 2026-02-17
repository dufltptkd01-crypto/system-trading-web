import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from '../brand/Logo.jsx'
import { useI18n } from '../../i18n/I18nContext.jsx'

const content = {
    ko: {
        sectionLinks: [
            { label: '기능', hash: '#features' },
            { label: '작동 방식', hash: '#how-it-works' },
            { label: '대시보드', hash: '#dashboard' },
            { label: '보안', hash: '#security' },
            { label: '요금제', hash: '#pricing' },
            { label: 'FAQ', hash: '#faq' },
        ],
        tradingLinks: [
            { label: '업비트 자동매매', to: '/trading/upbit' },
            { label: '바이낸스 자동매매', to: '/trading/binance' },
            { label: 'AI 추천 종목', to: '/recommendations' },
        ],
        trading: '트레이딩',
        tradingPages: '트레이딩 페이지',
        signIn: '로그인',
        startFree: '무료로 시작하기',
        language: '언어',
        homeAria: 'Alpha-ST 홈',
    },
    en: {
        sectionLinks: [
            { label: 'Features', hash: '#features' },
            { label: 'How It Works', hash: '#how-it-works' },
            { label: 'Dashboard', hash: '#dashboard' },
            { label: 'Security', hash: '#security' },
            { label: 'Pricing', hash: '#pricing' },
            { label: 'FAQ', hash: '#faq' },
        ],
        tradingLinks: [
            { label: 'Upbit Auto Trading', to: '/trading/upbit' },
            { label: 'Binance Auto Trading', to: '/trading/binance' },
            { label: 'AI Recommendations', to: '/recommendations' },
        ],
        trading: 'Trading',
        tradingPages: 'Trading pages',
        signIn: 'Sign in',
        startFree: 'Start free',
        language: 'Language',
        homeAria: 'Alpha-ST Home',
    },
}

function getBasePath() {
    const base = import.meta.env.BASE_URL || '/'
    if (base === './' || base === '.') return '/'
    return base.startsWith('/') ? base : `/${base}`
}

export default function Navbar() {
    const { locale, setLocale } = useI18n()
    const copy = content[locale] || content.ko

    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [isTradingOpen, setIsTradingOpen] = useState(false)
    const dropdownRef = useRef(null)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 6)
        window.addEventListener('scroll', onScroll)
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        setIsMobileOpen(false)
        setIsTradingOpen(false)
    }, [location.pathname])

    useEffect(() => {
        const onClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsTradingOpen(false)
            }
        }

        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [])

    const moveToSection = (hash) => {
        if (location.pathname !== '/') {
            window.location.assign(`${getBasePath()}${hash}`)
            return
        }

        const target = document.querySelector(hash)
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
            window.location.hash = hash
        }
    }

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-ink-950/80 backdrop-blur-xl transition-all duration-300 ${
                isScrolled ? 'shadow-[0_14px_28px_rgba(2,6,14,0.45)]' : ''
            }`}
        >
            <nav className="container-custom flex h-[88px] items-center justify-between gap-4">
                <Link to="/" className="shrink-0" aria-label={copy.homeAria}>
                    <Logo compact showSub={false} />
                </Link>

                <div className="hidden xl:flex items-center gap-6">
                    {copy.sectionLinks.map((item) => (
                        <button
                            key={item.hash}
                            onClick={() => moveToSection(item.hash)}
                            className="text-[13px] font-medium text-ink-300 transition-colors hover:text-ink-100"
                        >
                            {item.label}
                        </button>
                    ))}

                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsTradingOpen((prev) => !prev)}
                            className="inline-flex items-center gap-1 text-[13px] font-medium text-ink-300 transition-colors hover:text-ink-100"
                        >
                            {copy.trading}
                            <ChevronDown size={14} className={`transition-transform ${isTradingOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isTradingOpen && (
                            <div className="absolute right-0 top-12 w-56 glass-card p-2">
                                {copy.tradingLinks.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className="block rounded-lg px-3 py-2.5 text-sm text-ink-300 transition-colors hover:bg-white/5 hover:text-ink-100"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="hidden xl:flex items-center gap-2.5">
                    <div className="inline-flex items-center rounded-full border border-white/14 bg-ink-900/72 p-1">
                        <button
                            type="button"
                            onClick={() => setLocale('ko')}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                locale === 'ko' ? 'bg-white/14 text-ink-100' : 'text-ink-400 hover:text-ink-200'
                            }`}
                            aria-label={`${copy.language} Korean`}
                        >
                            한국어
                        </button>
                        <button
                            type="button"
                            onClick={() => setLocale('en')}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                locale === 'en' ? 'bg-white/14 text-ink-100' : 'text-ink-400 hover:text-ink-200'
                            }`}
                            aria-label={`${copy.language} English`}
                        >
                            English
                        </button>
                    </div>

                    <Link to="/login" className="btn-secondary text-sm px-5 py-2.5">
                        {copy.signIn}
                    </Link>
                    <Link to="/signup" className="btn-primary text-sm px-5 py-2.5">
                        {copy.startFree}
                    </Link>
                </div>

                <button
                    type="button"
                    onClick={() => setIsMobileOpen((prev) => !prev)}
                    className="xl:hidden inline-flex items-center justify-center rounded-lg border border-white/15 bg-ink-900/72 p-2 text-ink-200"
                    aria-label="Toggle menu"
                >
                    {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </nav>

            <div className={`xl:hidden overflow-hidden transition-all duration-300 ${isMobileOpen ? 'max-h-[640px]' : 'max-h-0'}`}>
                <div className="container-custom space-y-2 border-t border-white/10 pb-5 pt-2">
                    {copy.sectionLinks.map((item) => (
                        <button
                            key={item.hash}
                            onClick={() => {
                                moveToSection(item.hash)
                                setIsMobileOpen(false)
                            }}
                            className="block w-full rounded-lg border border-white/10 bg-ink-900/55 px-4 py-2.5 text-left text-sm text-ink-200"
                        >
                            {item.label}
                        </button>
                    ))}

                    <div className="mt-3 inline-flex items-center rounded-full border border-white/14 bg-ink-900/72 p-1">
                        <button
                            type="button"
                            onClick={() => setLocale('ko')}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                locale === 'ko' ? 'bg-white/14 text-ink-100' : 'text-ink-400 hover:text-ink-200'
                            }`}
                        >
                            한국어
                        </button>
                        <button
                            type="button"
                            onClick={() => setLocale('en')}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                locale === 'en' ? 'bg-white/14 text-ink-100' : 'text-ink-400 hover:text-ink-200'
                            }`}
                        >
                            English
                        </button>
                    </div>

                    <p className="px-1 pt-2 text-[11px] uppercase tracking-[0.2em] text-ink-500">{copy.tradingPages}</p>
                    {copy.tradingLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setIsMobileOpen(false)}
                            className="block rounded-lg border border-white/10 bg-ink-900/45 px-4 py-2.5 text-sm text-ink-300"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="grid grid-cols-2 gap-2 pt-2">
                        <Link to="/login" onClick={() => setIsMobileOpen(false)} className="btn-secondary text-sm py-2.5">
                            {copy.signIn}
                        </Link>
                        <Link to="/signup" onClick={() => setIsMobileOpen(false)} className="btn-primary text-sm py-2.5">
                            {copy.startFree}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
