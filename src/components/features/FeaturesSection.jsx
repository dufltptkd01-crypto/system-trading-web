import React from 'react'
import { Brain, Bot, ShieldCheck, BarChart3, Zap, Layers } from 'lucide-react'

const features = [
    {
        icon: Brain,
        title: 'News Sentiment Engine',
        description: 'The model scores market-moving articles and tracks momentum shifts in context, not just raw keywords.',
        tone: 'from-brand-500/25 to-brand-400/10',
    },
    {
        icon: BarChart3,
        title: 'Technical Signal Stack',
        description: 'RSI, MACD, moving averages, and volatility filters are combined into one decision frame.',
        tone: 'from-signal-500/25 to-signal-400/10',
    },
    {
        icon: Bot,
        title: 'Rule-Based Automation',
        description: 'Execution only happens within your size, risk, and timing constraints.',
        tone: 'from-success-500/25 to-success-400/10',
    },
    {
        icon: ShieldCheck,
        title: 'Defensive Controls',
        description: 'Loss limits, pause conditions, and consecutive-stop logic reduce runaway scenarios.',
        tone: 'from-danger-500/20 to-danger-400/8',
    },
    {
        icon: Zap,
        title: 'Low-Latency Alerts',
        description: 'Signals and state changes are delivered quickly through dashboard and messaging channels.',
        tone: 'from-brand-500/18 to-signal-500/12',
    },
    {
        icon: Layers,
        title: 'One Unified Workspace',
        description: 'Strategy setup, recommendations, logs, and charts live in one consistent interface.',
        tone: 'from-ink-500/30 to-brand-500/10',
    },
]

export default function FeaturesSection() {
    return (
        <section id="features" className="relative py-24 md:py-28">
            <div className="container-custom">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="chip border-brand-400/35 text-brand-300">Core capabilities</span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-100 md:text-4xl">
                        Built To Feel Predictable,
                        <span className="gradient-text block">Even In Fast Markets</span>
                    </h2>
                    <p className="mt-4 text-ink-300 leading-relaxed">
                        Every feature is designed around clarity: cleaner signal context, safer execution,
                        and fewer hidden behaviors.
                    </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {features.map((feature, idx) => {
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
                                <p className="mt-2 text-sm leading-relaxed text-ink-300">{feature.description}</p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

