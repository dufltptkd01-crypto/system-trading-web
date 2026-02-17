import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

const content = {
    ko: {
        chip: 'FAQ',
        title: '도입 전 자주 묻는 질문',
        titleAccent: '핵심만 빠르게 확인하세요',
        description: '운영 방식, 보안, 요금 정책에 대한 질문을 가장 많이 받은 순서로 정리했습니다.',
        contact: '지원팀 문의하기',
        faqs: [
            {
                question: 'Alpha-ST는 어떤 방식으로 종목을 추천하나요?',
                answer: '뉴스 감성, 모멘텀, 기술적 구조, 유동성 지표를 결합해 종목별 신뢰도 점수를 계산합니다.',
            },
            {
                question: '자동 실행 없이 추천 기능만 사용할 수 있나요?',
                answer: '가능합니다. 추천 전용 모드에서 시그널만 확인하고 수동으로 주문할 수 있습니다.',
            },
            {
                question: '현재 지원되는 거래소는 어디인가요?',
                answer: '현재 빌드에서는 Upbit와 Binance를 지원하며 동일한 전략 레이어로 확장 가능합니다.',
            },
            {
                question: '리스크 관리는 어떤 방식으로 동작하나요?',
                answer: '주문 한도, 일일 손실 제한, 연속 손실 중지 규칙이 주문 실행 전 단계에서 검사됩니다.',
            },
            {
                question: '플랫폼이 별도 실행 수수료를 부과하나요?',
                answer: '플랫폼 실행 수수료는 없으며, 거래소 기본 수수료만 적용됩니다.',
            },
            {
                question: '실거래 전 백테스트가 가능한가요?',
                answer: '가능합니다. Pro 플랜에서 전략 시나리오를 백테스트로 검증할 수 있습니다.',
            },
        ],
    },
    en: {
        chip: 'FAQ',
        title: 'Questions before you launch',
        titleAccent: 'clear answers for every step',
        description: 'The most common questions on workflow, security, and pricing are answered below.',
        contact: 'Contact support',
        faqs: [
            {
                question: 'How does Alpha-ST pick symbols?',
                answer: 'News sentiment, momentum, technical structure, and liquidity are fused into one confidence score.',
            },
            {
                question: 'Can I use recommendations without auto execution?',
                answer: 'Yes. You can stay in recommendation-only mode and place orders manually.',
            },
            {
                question: 'Which exchanges are supported right now?',
                answer: 'This build supports Upbit and Binance, with a shared strategy layer for future adapters.',
            },
            {
                question: 'How is risk managed?',
                answer: 'Order caps, daily drawdown limits, and consecutive-loss stop logic are checked before execution.',
            },
            {
                question: 'Do you charge extra execution commissions?',
                answer: 'No platform-side execution fee is added. Exchange-native fees still apply.',
            },
            {
                question: 'Can I backtest before going live?',
                answer: 'Yes. Pro workflows include backtest tools before enabling live automation.',
            },
        ],
    },
}

export default function FAQSection() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko
    const [openIndex, setOpenIndex] = useState(0)

    return (
        <section id="faq" className="py-24 md:py-32">
            <div className="container-custom">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <span className="chip border-brand-400/35 text-brand-300">{copy.chip}</span>
                    <h2 className="mt-4 text-4xl font-bold leading-[1.24] tracking-tight text-ink-100 md:text-5xl">
                        {copy.title}
                        <span className="gradient-text block">{copy.titleAccent}</span>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-ink-300 md:text-lg">{copy.description}</p>
                </div>

                <div className="mx-auto max-w-3xl space-y-3">
                    {copy.faqs.map((faq, index) => {
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
                        {copy.contact}
                    </a>
                </div>
            </div>
        </section>
    )
}

