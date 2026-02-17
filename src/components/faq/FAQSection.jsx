import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
    {
        question: 'How does Alpha-ST select symbols?',
        answer: 'The system combines news sentiment, momentum, structure signals, and liquidity context. It ranks candidates by confidence and risk profile.',
    },
    {
        question: 'Can I run without automatic execution?',
        answer: 'Yes. You can keep the system in recommendation-only mode and execute manually.',
    },
    {
        question: 'Which exchanges are currently supported?',
        answer: 'This build includes Upbit and Binance pages. Additional exchange adapters can be added through the same strategy layer.',
    },
    {
        question: 'How is risk controlled?',
        answer: 'Order caps, daily drawdown limits, and consecutive-loss stop logic are all enforced before order submission.',
    },
    {
        question: 'Do you charge execution commissions?',
        answer: 'No platform-side execution fee is added. Exchange-native fees still apply.',
    },
    {
        question: 'Can I backtest before going live?',
        answer: 'Yes. Pro workflows include backtest tools so you can test strategy behavior before enabling live execution.',
    },
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(0)

    return (
        <section id="faq" className="py-22 md:py-28">
            <div className="container-custom">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="chip border-brand-400/35 text-brand-300">FAQ</span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-100 md:text-4xl">
                        Common Questions,
                        <span className="gradient-text"> Clear Answers</span>
                    </h2>
                    <p className="mt-4 text-ink-300">If anything is still unclear, reach out and we can review your setup directly.</p>
                </div>

                <div className="mx-auto max-w-3xl space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index
                        return (
                            <article key={faq.question} className={`glass-card transition-colors ${isOpen ? 'border-brand-400/30' : ''}`}>
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                                >
                                    <span className={`text-sm sm:text-base ${isOpen ? 'text-ink-100' : 'text-ink-200'}`}>{faq.question}</span>
                                    <ChevronDown size={18} className={`text-ink-400 transition-transform ${isOpen ? 'rotate-180 text-brand-300' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                                    <p className="px-5 text-sm text-ink-300">{faq.answer}</p>
                                </div>
                            </article>
                        )
                    })}
                </div>

                <div className="mt-10 text-center">
                    <a href="mailto:support@alpha-st.com" className="btn-secondary">
                        Contact support
                    </a>
                </div>
            </div>
        </section>
    )
}
