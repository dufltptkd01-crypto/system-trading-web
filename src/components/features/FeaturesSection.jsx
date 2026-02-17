import React from 'react'
import { Brain, Bot, ShieldCheck, BarChart3, Zap, Layers } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

const content = {
    ko: {
        chip: '핵심 기능',
        title: '프리미엄 자동매매를 위한',
        titleAccent: 'AI 신호 스택',
        description: '핵심 지표와 뉴스 감성을 결합해 예측 가능하고 재현 가능한 실행 흐름을 제공합니다.',
        features: [
            {
                icon: Brain,
                title: '뉴스 감성 엔진',
                description: '시장 영향도가 높은 뉴스를 실시간으로 스코어링해 종목 컨텍스트를 보강합니다.',
                tone: 'from-brand-500/25 to-brand-400/10',
            },
            {
                icon: BarChart3,
                title: '기술적 시그널 스택',
                description: 'RSI, MACD, 추세선, 변동성 필터를 하나의 의사결정 프레임으로 통합합니다.',
                tone: 'from-signal-500/25 to-signal-400/10',
            },
            {
                icon: Bot,
                title: '룰 기반 자동 실행',
                description: '진입/청산은 사전에 정의한 조건과 리스크 한도 내에서만 수행됩니다.',
                tone: 'from-success-500/25 to-success-400/10',
            },
            {
                icon: ShieldCheck,
                title: '방어형 제어 장치',
                description: '손실 제한, 일시중지, 연속 손실 중지 로직으로 비정상 구간을 방어합니다.',
                tone: 'from-danger-500/20 to-danger-400/8',
            },
            {
                icon: Zap,
                title: '저지연 알림',
                description: '중요 상태 변화와 시그널을 대시보드와 알림 채널로 빠르게 전달합니다.',
                tone: 'from-brand-500/18 to-signal-500/12',
            },
            {
                icon: Layers,
                title: '통합 워크스페이스',
                description: '추천, 실행, 로그, 차트가 한 화면에서 연결되어 운영 효율을 높입니다.',
                tone: 'from-ink-500/30 to-brand-500/10',
            },
        ],
    },
    en: {
        chip: 'Core capabilities',
        title: 'An AI Signal Stack',
        titleAccent: 'for Premium Automation',
        description: 'Core indicators and news sentiment are fused into a predictable execution workflow.',
        features: [
            {
                icon: Brain,
                title: 'News Sentiment Engine',
                description: 'Market-moving headlines are scored in real time to enrich each trading decision.',
                tone: 'from-brand-500/25 to-brand-400/10',
            },
            {
                icon: BarChart3,
                title: 'Technical Signal Stack',
                description: 'RSI, MACD, trend structure, and volatility filters are merged into one framework.',
                tone: 'from-signal-500/25 to-signal-400/10',
            },
            {
                icon: Bot,
                title: 'Rule-based Execution',
                description: 'Entries and exits are executed only within your predefined risk constraints.',
                tone: 'from-success-500/25 to-success-400/10',
            },
            {
                icon: ShieldCheck,
                title: 'Defensive Controls',
                description: 'Loss limits, pause triggers, and stop-chain logic guard against runaway behavior.',
                tone: 'from-danger-500/20 to-danger-400/8',
            },
            {
                icon: Zap,
                title: 'Low-latency Alerts',
                description: 'Critical state changes are delivered quickly through dashboard and alert channels.',
                tone: 'from-brand-500/18 to-signal-500/12',
            },
            {
                icon: Layers,
                title: 'Unified Workspace',
                description: 'Recommendations, execution, logs, and charts stay connected in one surface.',
                tone: 'from-ink-500/30 to-brand-500/10',
            },
        ],
    },
}

export default function FeaturesSection() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

    return (
        <section id="features" className="relative py-24 md:py-32">
            <div className="container-custom">
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="chip border-brand-400/35 text-brand-300">{copy.chip}</span>
                    <h2 className="mt-4 text-4xl font-bold leading-[1.28] text-ink-100 md:text-5xl">
                        {copy.title}
                        <span className="gradient-text block">{copy.titleAccent}</span>
                    </h2>
                    <p className="mt-5 text-base leading-[1.72] text-ink-300 md:text-lg">
                        {copy.description}
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {copy.features.map((feature, idx) => {
                        const Icon = feature.icon
                        return (
                            <article
                                key={feature.title}
                                className="glass-card glass-card-hover p-6 animate-rise"
                                style={{ animationDelay: `${idx * 0.08}s` }}
                            >
                                <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${feature.tone} p-2.5 border border-white/10`}>
                                    <Icon size={18} className="text-ink-100" />
                                </div>
                                <h3 className="text-lg font-semibold text-ink-100">{feature.title}</h3>
                                <p className="mt-3 text-[15px] leading-[1.72] text-ink-300">{feature.description}</p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

