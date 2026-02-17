import React, { useState } from 'react'
import RecommendedStocks from './RecommendedStocks.jsx'
import StrategySettings from './StrategySettings.jsx'
import TradingChart from './TradingChart.jsx'
import TradingLog from './TradingLog.jsx'
import { useI18n } from '../../i18n/I18nContext.jsx'

const content = {
    ko: {
        chip: '대시보드 미리보기',
        title: '시그널과 실행을',
        titleAccent: '하나의 콘솔에서 관리하세요',
        description: '추천 종목, 리스크 설정, 실행 로그를 같은 맥락에서 확인해 의사결정 속도를 높입니다.',
        tabs: [
            { id: 'chart', label: '실시간 차트' },
            { id: 'recommendations', label: 'AI 추천 종목' },
            { id: 'strategy', label: '전략 제어' },
            { id: 'log', label: '거래 로그' },
        ],
    },
    en: {
        chip: 'Dashboard preview',
        title: 'Manage signal and execution',
        titleAccent: 'from one premium console',
        description: 'Recommendations, risk controls, and execution logs stay in one coherent context.',
        tabs: [
            { id: 'chart', label: 'Live Chart' },
            { id: 'recommendations', label: 'AI Picks' },
            { id: 'strategy', label: 'Strategy Controls' },
            { id: 'log', label: 'Trade Log' },
        ],
    },
}

export default function DashboardPreview() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko
    const [activeTab, setActiveTab] = useState('chart')

    return (
        <section id="dashboard" className="py-24 md:py-32">
            <div className="container-custom">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <span className="chip border-brand-400/35 text-brand-300">{copy.chip}</span>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink-100 md:text-5xl">
                        {copy.title}
                        <span className="gradient-text block">{copy.titleAccent}</span>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-ink-300 md:text-lg">
                        {copy.description}
                    </p>
                </div>

                <div className="glass-card overflow-hidden">
                    <div className="flex flex-wrap items-center gap-1 border-b border-white/10 p-2">
                        {copy.tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`rounded-lg px-3.5 py-2 text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? 'tab-active text-ink-100 bg-ink-800/70'
                                        : 'text-ink-400 hover:text-ink-200'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-5 md:p-7 min-h-[520px]">
                        {activeTab === 'chart' && <TradingChart />}
                        {activeTab === 'recommendations' && <RecommendedStocks />}
                        {activeTab === 'strategy' && <StrategySettings />}
                        {activeTab === 'log' && <TradingLog />}
                    </div>
                </div>
            </div>
        </section>
    )
}

