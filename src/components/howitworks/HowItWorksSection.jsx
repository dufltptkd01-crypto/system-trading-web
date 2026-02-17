import React from 'react'
import { SlidersHorizontal, Cpu, Rocket } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

const content = {
    ko: {
        chip: '운영 프로세스',
        title: '복잡함은 줄이고',
        titleAccent: '반복 가능한 실행만 남깁니다',
        description: '설정, 추천, 실행, 검토가 한 사이클로 이어지도록 사용자 여정을 단순화했습니다.',
        steps: [
            {
                number: '01',
                icon: SlidersHorizontal,
                title: '리스크 경계 설정',
                description: '보유 기간, 주문 한도, 일일 손실 한도를 먼저 설정합니다.',
                points: ['수동/자동 모드 선택', '종목군 필터', '손절 및 중지 규칙'],
            },
            {
                number: '02',
                icon: Cpu,
                title: 'AI 기회 탐색',
                description: '뉴스 감성과 차트 구조를 통합 점수로 계산해 우선순위를 제시합니다.',
                points: ['실시간 신뢰도 점수', '상황 태그', '종목별 위험 등급'],
            },
            {
                number: '03',
                icon: Rocket,
                title: '자동 실행 및 리포트',
                description: '규칙에 맞는 실행만 진행하고 로그와 성과 지표를 즉시 기록합니다.',
                points: ['주문 상태 피드', '손익 타임라인', '행동 감사 로그'],
            },
        ],
    },
    en: {
        chip: 'Workflow',
        title: 'Cut the noise',
        titleAccent: 'Keep a repeatable process',
        description: 'Setup, recommendation, execution, and review are streamlined into one loop.',
        steps: [
            {
                number: '01',
                icon: SlidersHorizontal,
                title: 'Define risk boundaries',
                description: 'Set holding horizon, max order size, and daily drawdown limits first.',
                points: ['Manual or auto mode', 'Asset filters', 'Stop and pause rules'],
            },
            {
                number: '02',
                icon: Cpu,
                title: 'AI ranks opportunities',
                description: 'News sentiment and chart structure are fused into a single priority score.',
                points: ['Live confidence score', 'Context tags', 'Risk class by symbol'],
            },
            {
                number: '03',
                icon: Rocket,
                title: 'Execute and review',
                description: 'Only valid setups execute, then logs and performance metrics update instantly.',
                points: ['Order status feed', 'PnL timeline', 'Behavior audit trail'],
            },
        ],
    },
}

export default function HowItWorksSection() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

    return (
        <section id="how-it-works" className="relative py-24 md:py-32">
            <div className="container-custom">
                <div className="mx-auto mb-14 max-w-3xl text-center">
                    <span className="chip border-signal-400/40 text-signal-400">{copy.chip}</span>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink-100 md:text-5xl">
                        {copy.title}
                        <span className="gradient-text-gold block">{copy.titleAccent}</span>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-ink-300 md:text-lg">
                        {copy.description}
                    </p>
                </div>

                <div className="relative grid gap-5 lg:grid-cols-3">
                    <div className="pointer-events-none absolute left-[16.8%] right-[16.8%] top-20 hidden h-px bg-gradient-to-r from-brand-500/10 via-brand-400/40 to-signal-400/25 lg:block" />

                    {copy.steps.map((step, index) => {
                        const Icon = step.icon
                        return (
                            <article
                                key={step.number}
                                className="glass-card glass-card-hover relative p-7"
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                <span className="absolute right-5 top-4 text-4xl font-bold text-ink-700/35">{step.number}</span>
                                <div className="mb-4 inline-flex rounded-xl bg-brand-500/18 p-2.5 text-brand-300 border border-brand-400/25">
                                    <Icon size={18} />
                                </div>
                                <h3 className="text-lg font-semibold text-ink-100">{step.title}</h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-ink-300">{step.description}</p>

                                <ul className="mt-4 space-y-2">
                                    {step.points.map((point) => (
                                        <li key={point} className="flex items-center gap-2 text-sm text-ink-300">
                                            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

