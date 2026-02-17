import React from 'react'
import { Eye, Globe, KeyRound, Lock, Server, ShieldAlert } from 'lucide-react'

const securityItems = [
    {
        icon: KeyRound,
        title: 'Encrypted API Storage',
        description: 'All keys are encrypted at rest and never exposed in plain text in the dashboard.',
        badge: 'AES-256',
    },
    {
        icon: Eye,
        title: 'No Withdrawal Scope',
        description: 'The platform is designed for trade permissions only, not withdrawal actions.',
        badge: 'Trade-only',
    },
    {
        icon: Globe,
        title: 'IP Restriction Friendly',
        description: 'Works cleanly with exchange IP whitelisting so account access stays narrow.',
        badge: 'IP Control',
    },
    {
        icon: ShieldAlert,
        title: 'Automatic Safety Triggers',
        description: 'Abnormal patterns can pause order flow until conditions stabilize.',
        badge: 'Auto pause',
    },
    {
        icon: Server,
        title: 'Secure Runtime Infrastructure',
        description: 'Runtime services and data paths operate over hardened TLS channels.',
        badge: 'TLS 1.3',
    },
    {
        icon: Lock,
        title: 'Account Protection',
        description: 'Supports strong authentication patterns to reduce unauthorized access risks.',
        badge: '2FA ready',
    },
]

export default function SecuritySection() {
    return (
        <section id="security" className="relative py-22 md:py-28 overflow-hidden">
            <div className="pointer-events-none absolute right-0 top-16 h-80 w-80 rounded-full bg-brand-400/10 blur-[130px]" />

            <div className="container-custom relative z-10">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="chip border-brand-400/35 text-brand-300">Security first</span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-100 md:text-4xl">
                        Guardrails Are Not Optional
                    </h2>
                    <p className="mt-4 text-ink-300">
                        Automation only works long-term when risk and key management are treated as product features.
                    </p>
                </div>

                <div className="gradient-border mb-8 rounded-2xl">
                    <div className="glass-card rounded-2xl p-6 md:p-7 text-center">
                        <p className="text-sm uppercase tracking-[0.18em] text-brand-300">Security principle</p>
                        <h3 className="mt-2 text-xl font-semibold text-ink-100">Execute trades, never custody funds.</h3>
                        <p className="mt-2 text-sm text-ink-300">
                            Alpha-ST is designed around least-privilege access to reduce damage from single-point failures.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {securityItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <article key={item.title} className="glass-card glass-card-hover p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="inline-flex rounded-lg bg-brand-500/16 p-2 text-brand-300 border border-brand-400/25">
                                        <Icon size={18} />
                                    </div>
                                    <span className="rounded-md border border-brand-400/28 bg-brand-500/10 px-2 py-1 text-[11px] text-brand-300">
                                        {item.badge}
                                    </span>
                                </div>
                                <h3 className="text-base font-semibold text-ink-100">{item.title}</h3>
                                <p className="mt-2 text-sm text-ink-300">{item.description}</p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
