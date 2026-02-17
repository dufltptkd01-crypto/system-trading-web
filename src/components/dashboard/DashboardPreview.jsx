import React, { useState } from 'react'
import RecommendedStocks from './RecommendedStocks.jsx'
import StrategySettings from './StrategySettings.jsx'
import TradingChart from './TradingChart.jsx'
import TradingLog from './TradingLog.jsx'

const tabs = [
    { id: 'chart', label: 'Live Chart' },
    { id: 'recommendations', label: 'AI Picks' },
    { id: 'strategy', label: 'Strategy Controls' },
    { id: 'log', label: 'Trade Log' },
]

export default function DashboardPreview() {
    const [activeTab, setActiveTab] = useState('chart')

    return (
        <section id="dashboard" className="py-22 md:py-28">
            <div className="container-custom">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="chip border-brand-400/35 text-brand-300">Dashboard preview</span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-100 md:text-4xl">
                        One Surface For Signal,
                        <span className="gradient-text"> Strategy, and Execution</span>
                    </h2>
                    <p className="mt-4 text-ink-300">
                        Switch context without losing flow. Everything updates inside the same workspace.
                    </p>
                </div>

                <div className="glass-card overflow-hidden">
                    <div className="flex flex-wrap items-center gap-1 border-b border-white/10 p-2">
                        {tabs.map((tab) => (
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
