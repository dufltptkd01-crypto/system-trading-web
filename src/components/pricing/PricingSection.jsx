import React from 'react'
import { Check, Star } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

const content = {
    ko: {
        chip: '요금제',
        title: '숨겨진 수수료 없는',
        titleAccent: '명확한 SaaS 플랜',
        description: '전략 운영 규모에 맞게 선택할 수 있도록 단순하고 투명한 구조로 설계했습니다.',
        popular: '가장 많이 선택됨',
        plans: [
            {
                name: 'Starter',
                price: '무료',
                priceSuffix: '',
                description: '자동매매 워크플로우를 검증하는 개인 사용자용 플랜',
                popular: false,
                features: [
                    '일일 AI 추천 종목',
                    '핵심 기술적 지표',
                    '모의 실행 모드',
                    '기본 알림 제공',
                    '기본 리스크 제한',
                ],
                cta: '무료로 시작하기',
                ctaClass: 'btn-secondary',
            },
            {
                name: 'Pro',
                price: 'KRW 49,000',
                priceSuffix: '/월',
                description: '실거래 자동화와 고급 리스크 제어가 필요한 액티브 트레이더용',
                popular: true,
                features: [
                    '무제한 AI 스캔',
                    '실시간 자동 실행',
                    '고급 전략 제어',
                    '백테스트 모듈',
                    '우선 알림 채널',
                    '손익 및 행동 분석',
                ],
                cta: 'Pro 시작하기',
                ctaClass: 'btn-primary',
            },
            {
                name: 'Enterprise',
                price: 'KRW 149,000',
                priceSuffix: '/월',
                description: '팀 운영과 정책 기반 통제가 필요한 조직용 플랜',
                popular: false,
                features: [
                    'Pro의 모든 기능',
                    '워크스페이스 권한 관리',
                    '전담 온보딩 지원',
                    '커스텀 연동',
                    'SLA 기반 지원',
                ],
                cta: '문의하기',
                ctaClass: 'btn-secondary',
            },
        ],
    },
    en: {
        chip: 'Pricing',
        title: 'Transparent plans',
        titleAccent: 'with no hidden execution fee',
        description: 'Simple and scalable pricing designed for serious systematic traders.',
        popular: 'Most selected',
        plans: [
            {
                name: 'Starter',
                price: 'Free',
                priceSuffix: '',
                description: 'For individuals validating an automated trading workflow.',
                popular: false,
                features: [
                    'Daily AI recommendations',
                    'Core technical indicators',
                    'Paper execution mode',
                    'Standard alerts',
                    'Basic risk limits',
                ],
                cta: 'Start free',
                ctaClass: 'btn-secondary',
            },
            {
                name: 'Pro',
                price: 'KRW 49,000',
                priceSuffix: '/month',
                description: 'For active traders who need live automation and deeper controls.',
                popular: true,
                features: [
                    'Unlimited AI scans',
                    'Live auto execution',
                    'Advanced strategy controls',
                    'Backtest module',
                    'Priority notifications',
                    'PnL and behavior analytics',
                ],
                cta: 'Try Pro',
                ctaClass: 'btn-primary',
            },
            {
                name: 'Enterprise',
                price: 'KRW 149,000',
                priceSuffix: '/month',
                description: 'For teams requiring governance and dedicated support.',
                popular: false,
                features: [
                    'Everything in Pro',
                    'Workspace-level permissions',
                    'Dedicated onboarding',
                    'Custom integrations',
                    'SLA-backed support',
                ],
                cta: 'Contact sales',
                ctaClass: 'btn-secondary',
            },
        ],
    },
}

export default function PricingSection() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

    return (
        <section id="pricing" className="relative py-24 md:py-32">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-400/10 blur-[120px]" />

            <div className="container-custom relative z-10">
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="chip border-signal-400/35 text-signal-400">{copy.chip}</span>
                    <h2 className="mt-4 text-4xl font-bold leading-[1.28] text-ink-100 md:text-5xl">
                        {copy.title}
                        <span className="gradient-text-gold block">{copy.titleAccent}</span>
                    </h2>
                    <p className="mt-5 text-base leading-[1.72] text-ink-300 md:text-lg">{copy.description}</p>
                </div>

                <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
                    {copy.plans.map((plan) => (
                        <article
                            key={plan.name}
                            className={`relative rounded-2xl p-6 ${plan.popular ? 'glass-card pricing-popular' : 'glass-card glass-card-hover'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1 rounded-full border border-brand-300/40 bg-brand-500 px-3 py-1 text-xs font-semibold text-ink-950">
                                        <Star size={12} />
                                        {copy.popular}
                                    </span>
                                </div>
                            )}

                            <h3 className="text-lg font-semibold text-ink-100">{plan.name}</h3>
                            <p className="mt-1 text-sm text-ink-400">{plan.description}</p>
                            <div className="mt-4 flex items-baseline gap-1">
                                <p className="text-3xl font-bold text-ink-100">{plan.price}</p>
                                {plan.priceSuffix && <span className="text-sm text-ink-500">{plan.priceSuffix}</span>}
                            </div>

                            <ul className="mt-5 space-y-2.5">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-2 text-sm text-ink-300">
                                        <Check size={15} className="mt-0.5 text-brand-300" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`${plan.ctaClass} mt-6 w-full`}>{plan.cta}</button>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

