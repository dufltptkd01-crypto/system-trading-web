import React from 'react'
import { SlidersHorizontal, Cpu, Rocket } from 'lucide-react'

const steps = [
    {
        number: '01',
        icon: SlidersHorizontal,
        title: 'Set Your Boundaries',
        description: 'Choose holding period, max order size, and daily drawdown limits.',
        points: ['Manual or auto mode', 'Pair/category filters', 'Loss and stop rules'],
    },
    {
        number: '02',
        icon: Cpu,
        title: 'AI Ranks Opportunities',
        description: 'Sentiment and chart structure are scored together into clear candidate lists.',
        points: ['Live confidence score', 'Context tags', 'Risk class per symbol'],
    },
    {
        number: '03',
        icon: Rocket,
        title: 'Execute and Track',
        description: 'Orders follow your rules, then logs and metrics update immediately.',
        points: ['Order feed + status', 'PnL timeline', 'Behavior audit trail'],
    },
]

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="relative py-22 md:py-28">
            <div className="container-custom">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="chip border-signal-400/40 text-signal-400">Workflow</span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-100 md:text-4xl">
                        Three Steps,
                        <span className="gradient-text-gold"> One Repeatable Process</span>
                    </h2>
                    <p className="mt-4 text-ink-300">
                        The product is opinionated by design: fewer knobs, safer defaults, and a process you can review.
                    </p>
                </div>

                <div className="relative grid gap-5 lg:grid-cols-3">
                    <div className="pointer-events-none absolute left-[16.8%] right-[16.8%] top-20 hidden h-px bg-gradient-to-r from-brand-500/10 via-brand-400/40 to-signal-400/25 lg:block" />

                    {steps.map((step, index) => {
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
                                <p className="mt-2 text-sm text-ink-300">{step.description}</p>

                                <ul className="mt-4 space-y-2">
                                    {step.points.map((point) => (
                                        <li key={point} className="flex items-center gap-2 text-xs text-ink-300">
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
