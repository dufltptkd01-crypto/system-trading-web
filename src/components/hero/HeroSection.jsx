import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, Shield, Sparkles } from 'lucide-react'

const highlights = [
    { label: 'Live signal refresh', value: 'Every 30s' },
    { label: 'Risk gates per strategy', value: '12 controls' },
    { label: 'Average alert latency', value: '< 1.2s' },
]

export default function HeroSection() {
    return (
        <section id="hero" className="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-28">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-brand-400/18 blur-[120px]" />
                <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-signal-400/15 blur-[130px]" />
                <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-brand-500/14 blur-[100px]" />
            </div>

            <div className="container-custom relative z-10">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-4 py-2 text-xs font-medium text-brand-300">
                        <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse-soft" />
                        Real-time AI signal stream is active
                    </div>

                    <h1 className="animate-rise mt-6 text-4xl font-bold tracking-tight text-ink-100 sm:text-5xl lg:text-6xl" style={{ animationDelay: '0.08s' }}>
                        Trade With A
                        <span className="gradient-text"> Controlled AI Workflow</span>
                    </h1>

                    <p className="animate-rise mx-auto mt-6 max-w-2xl text-base text-ink-300 sm:text-lg" style={{ animationDelay: '0.16s' }}>
                        Alpha-ST combines market data, technical context, and news sentiment into one
                        execution flow. You define the rules, the system handles consistent actions.
                    </p>

                    <div className="animate-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: '0.24s' }}>
                        <Link to="/signup" className="btn-primary w-full sm:w-auto">
                            Start Free
                            <ArrowRight size={17} />
                        </Link>
                        <Link to="/recommendations" className="btn-secondary w-full sm:w-auto">
                            View AI Picks
                        </Link>
                    </div>

                    <div className="animate-rise mt-11 grid gap-3 sm:grid-cols-3" style={{ animationDelay: '0.32s' }}>
                        {highlights.map((item) => (
                            <div key={item.label} className="glass-card p-4 text-left sm:text-center">
                                <p className="text-xl font-semibold text-ink-100">{item.value}</p>
                                <p className="mt-1 text-xs text-ink-400">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-11 grid gap-4 md:grid-cols-3">
                    <div className="glass-card glass-card-hover animate-drift p-4" style={{ animationDelay: '0.2s' }}>
                        <div className="mb-3 inline-flex rounded-lg bg-brand-500/15 p-2 text-brand-300">
                            <BarChart3 size={16} />
                        </div>
                        <h3 className="text-sm font-semibold text-ink-100">Signal + Structure</h3>
                        <p className="mt-1 text-xs text-ink-400">News and chart signals are fused into one confidence score.</p>
                    </div>

                    <div className="glass-card glass-card-hover animate-drift p-4" style={{ animationDelay: '0.4s' }}>
                        <div className="mb-3 inline-flex rounded-lg bg-signal-500/15 p-2 text-signal-300">
                            <Sparkles size={16} />
                        </div>
                        <h3 className="text-sm font-semibold text-ink-100">Adaptive Logic</h3>
                        <p className="mt-1 text-xs text-ink-400">Strategies can switch behavior by volatility and market session.</p>
                    </div>

                    <div className="glass-card glass-card-hover animate-drift p-4" style={{ animationDelay: '0.6s' }}>
                        <div className="mb-3 inline-flex rounded-lg bg-success-500/15 p-2 text-success-400">
                            <Shield size={16} />
                        </div>
                        <h3 className="text-sm font-semibold text-ink-100">Risk First</h3>
                        <p className="mt-1 text-xs text-ink-400">Daily loss caps, stop chains, and API safeguards are built in.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
