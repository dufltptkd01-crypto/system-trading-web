import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Shield, Sparkles } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

const content = {
    ko: {
        badge: '실시간 AI 시그널 스트림이 활성화되었습니다',
        headline: 'AI 기반 자동매매 플랫폼',
        description: '뉴스와 기술적 지표를 분석하여 자동으로 투자 기회를 탐색합니다.',
        primaryCta: '무료로 시작하기',
        secondaryCta: '데모 보기',
        highlights: [
            { label: '시그널 업데이트 주기', value: '30초' },
            { label: '리스크 제어 항목', value: '12개' },
            { label: '알림 평균 지연', value: '1.2초 미만' },
        ],
        cards: [
            {
                title: '신호 통합 엔진',
                description: '뉴스 감성 분석과 기술적 지표를 하나의 추천 점수로 통합합니다.',
                icon: BarChart3,
                tone: 'bg-brand-500/15 text-brand-300',
            },
            {
                title: '시장 적응형 로직',
                description: '변동성과 거래 세션에 따라 전략 파라미터를 자동 조정합니다.',
                icon: Sparkles,
                tone: 'bg-signal-500/15 text-signal-300',
            },
            {
                title: '우선 리스크 제어',
                description: '일일 손실 한도, 연속 손실 중지, API 보호를 기본으로 제공합니다.',
                icon: Shield,
                tone: 'bg-success-500/15 text-success-400',
            },
        ],
    },
    en: {
        badge: 'Real-time AI signal stream is active',
        headline: 'AI-powered automated trading platform',
        description: 'We analyze news and technical indicators to automatically discover investment opportunities.',
        primaryCta: 'Start Free',
        secondaryCta: 'View Demo',
        highlights: [
            { label: 'Signal refresh cadence', value: 'Every 30s' },
            { label: 'Risk controls per strategy', value: '12 rules' },
            { label: 'Average alert latency', value: '< 1.2s' },
        ],
        cards: [
            {
                title: 'Signal Fusion Engine',
                description: 'News sentiment and technical factors are merged into one confidence score.',
                icon: BarChart3,
                tone: 'bg-brand-500/15 text-brand-300',
            },
            {
                title: 'Adaptive Market Logic',
                description: 'Strategy parameters adjust by volatility regime and trading session.',
                icon: Sparkles,
                tone: 'bg-signal-500/15 text-signal-300',
            },
            {
                title: 'Risk-first Execution',
                description: 'Daily drawdown limits, stop chains, and API guards are built in.',
                icon: Shield,
                tone: 'bg-success-500/15 text-success-400',
            },
        ],
    },
}

export default function HeroSection() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

    return (
        <section id="hero" className="relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
            <div className="pointer-events-none absolute inset-0 hero-surface">
                <div className="absolute -left-32 top-8 h-80 w-80 rounded-full bg-brand-400/20 blur-[130px]" />
                <div className="absolute -right-10 top-8 h-80 w-80 rounded-full bg-signal-400/18 blur-[130px]" />
                <div className="absolute inset-x-0 bottom-0 h-[300px] opacity-55">
                    <svg viewBox="0 0 1200 300" className="h-full w-full">
                        <defs>
                            <linearGradient id="heroLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3ad5c1" stopOpacity="0.1" />
                                <stop offset="50%" stopColor="#74e8d6" stopOpacity="0.85" />
                                <stop offset="100%" stopColor="#f9bc4f" stopOpacity="0.2" />
                            </linearGradient>
                        </defs>
                        <path d="M0 220 L120 198 L210 214 L310 168 L430 176 L530 118 L640 138 L730 88 L830 110 L930 72 L1030 88 L1200 54" fill="none" stroke="url(#heroLine)" strokeWidth="3" />
                        <path d="M0 242 L120 226 L210 236 L310 195 L430 205 L530 149 L640 164 L730 122 L830 140 L930 104 L1030 122 L1200 96" fill="none" stroke="url(#heroLine)" strokeOpacity="0.36" strokeWidth="2" />
                    </svg>
                </div>
            </div>

            <div className="container-custom relative z-10">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-brand-400/35 bg-brand-400/12 px-4 py-2 text-xs font-medium text-brand-300">
                        <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse-soft" />
                        {copy.badge}
                    </div>

                    <h1 className="animate-rise mt-8 text-5xl font-bold leading-[1.1] tracking-tight text-ink-100 sm:text-6xl lg:text-7xl" style={{ animationDelay: '0.08s' }}>
                        <span className="gradient-text">{copy.headline}</span>
                    </h1>

                    <p className="animate-rise mx-auto mt-7 max-w-2xl text-[16px] leading-relaxed text-ink-300 sm:text-lg" style={{ animationDelay: '0.16s' }}>
                        {copy.description}
                    </p>

                    <div className="animate-rise mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '0.24s' }}>
                        <Link to="/signup" className="btn-primary w-full sm:w-auto">
                            {copy.primaryCta}
                            <ArrowRight size={17} />
                        </Link>
                        <Link to="/recommendations" className="btn-secondary w-full sm:w-auto">
                            {copy.secondaryCta}
                        </Link>
                    </div>

                    <div className="animate-rise mt-14 grid gap-4 sm:grid-cols-3" style={{ animationDelay: '0.32s' }}>
                        {copy.highlights.map((item) => (
                            <div key={item.label} className="glass-card p-5 text-center">
                                <p className="text-2xl font-semibold text-ink-100">{item.value}</p>
                                <p className="mt-1 text-sm text-ink-400">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {copy.cards.map((card, index) => {
                        const Icon = card.icon
                        return (
                            <article key={card.title} className="glass-card glass-card-hover animate-rise p-6" style={{ animationDelay: `${0.2 + index * 0.08}s` }}>
                                <div className={`mb-4 inline-flex rounded-lg p-2 ${card.tone}`}>
                                    <Icon size={18} />
                                </div>
                                <h3 className="text-lg font-semibold text-ink-100">{card.title}</h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-ink-300">{card.description}</p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}