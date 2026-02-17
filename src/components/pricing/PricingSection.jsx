import React from 'react'
import { Check, Star } from 'lucide-react'

const plans = [
    {
        name: 'Starter',
        price: 'Free',
        priceSuffix: '',
        description: 'For validating workflows with basic automation.',
        popular: false,
        features: [
            'Daily AI recommendations',
            'Core technical indicators',
            'Paper execution mode',
            'Standard alert delivery',
            'Basic risk limits',
        ],
        cta: 'Start free',
        ctaClass: 'btn-secondary',
    },
    {
        name: 'Pro',
        price: 'KRW 49,000',
        priceSuffix: '/month',
        description: 'For active traders who need faster loops and deeper control.',
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
        description: 'For teams requiring managed support and custom policy layers.',
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
]

export default function PricingSection() {
    return (
        <section id="pricing" className="relative py-22 md:py-28">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal-400/10 blur-[120px]" />

            <div className="container-custom relative z-10">
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="chip border-signal-400/35 text-signal-400">Pricing</span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-100 md:text-4xl">
                        Clear Plans,
                        <span className="gradient-text-gold"> No Hidden Execution Fee</span>
                    </h2>
                    <p className="mt-4 text-ink-300">Choose by depth of control, not by arbitrary feature walls.</p>
                </div>

                <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <article
                            key={plan.name}
                            className={`relative rounded-2xl p-6 ${plan.popular ? 'glass-card pricing-popular' : 'glass-card glass-card-hover'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex items-center gap-1 rounded-full border border-brand-300/40 bg-brand-500 px-3 py-1 text-xs font-semibold text-ink-950">
                                        <Star size={12} />
                                        Most selected
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
