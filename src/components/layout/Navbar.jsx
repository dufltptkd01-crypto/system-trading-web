import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from '../brand/Logo.jsx'

const sectionLinks = [
    { label: 'Features', hash: '#features' },
    { label: 'How It Works', hash: '#how-it-works' },
    { label: 'Dashboard', hash: '#dashboard' },
    { label: 'Security', hash: '#security' },
    { label: 'Pricing', hash: '#pricing' },
    { label: 'FAQ', hash: '#faq' },
]

const tradingLinks = [
    { label: 'Upbit Auto Trading', to: '/trading/upbit' },
    { label: 'Binance Auto Trading', to: '/trading/binance' },
    { label: 'AI Recommendations', to: '/recommendations' },
]

function getBasePath() {
    const base = import.meta.env.BASE_URL || '/'
    if (base === './' || base === '.') return '/'
    return base.startsWith('/') ? base : `/${base}`
}

export default function Navbar() {
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
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'border-b border-white/10 bg-ink-950/90 backdrop-blur-xl shadow-[0_12px_26px_rgba(0,0,0,0.32)]'
                    : 'bg-transparent'
            }`}
        >
            <nav className="container-custom flex h-[82px] items-center justify-between gap-4">
                <Link to="/" className="shrink-0" aria-label="Alpha-ST Home">
                    <Logo compact showSub={false} />
                </Link>

                <div className="hidden xl:flex items-center gap-5">
                    {sectionLinks.map((item) => (
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
                            Trading
                            <ChevronDown size={14} className={`transition-transform ${isTradingOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isTradingOpen && (
                            <div className="absolute right-0 top-11 w-56 glass-card p-2">
                                {tradingLinks.map((link) => (
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
                    <Link to="/login" className="btn-secondary text-sm px-5 py-2.5">
                        Sign in
                    </Link>
                    <Link to="/signup" className="btn-primary text-sm px-5 py-2.5">
                        Start free
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

            <div className={`xl:hidden overflow-hidden transition-all duration-300 ${isMobileOpen ? 'max-h-[560px]' : 'max-h-0'}`}>
                <div className="container-custom space-y-2 border-t border-white/10 pb-5 pt-2">
                    {sectionLinks.map((item) => (
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

                    <p className="px-1 pt-2 text-[11px] uppercase tracking-[0.2em] text-ink-500">Trading pages</p>
                    {tradingLinks.map((link) => (
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
                            Sign in
                        </Link>
                        <Link to="/signup" onClick={() => setIsMobileOpen(false)} className="btn-primary text-sm py-2.5">
                            Start free
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
