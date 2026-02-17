import React from 'react'
import { Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, BarChart2, Newspaper } from 'lucide-react'

const stocks = [
    {
        name: 'Samsung Electronics',
        code: '005930',
        score: 91,
        risk: 'Low',
        riskClass: 'text-success-400 bg-success-500/10',
        change: '+2.4%',
        changeDir: 'up',
        reasons: [
            { icon: Newspaper, text: 'Positive semiconductor outlook', type: 'positive' },
            { icon: BarChart2, text: 'Volume above 20-day average', type: 'positive' },
            { icon: Activity, text: 'RSI recovered from oversold zone', type: 'positive' },
        ],
    },
    {
        name: 'SK hynix',
        code: '000660',
        score: 86,
        risk: 'Medium',
        riskClass: 'text-signal-400 bg-signal-500/10',
        change: '+1.8%',
        changeDir: 'up',
        reasons: [
            { icon: Newspaper, text: 'Memory demand momentum remains strong', type: 'positive' },
            { icon: Activity, text: 'MACD bullish crossover detected', type: 'positive' },
            { icon: BarChart2, text: 'Volume stable', type: 'neutral' },
        ],
    },
    {
        name: 'Kakao',
        code: '035720',
        score: 73,
        risk: 'Medium',
        riskClass: 'text-signal-400 bg-signal-500/10',
        change: '-0.5%',
        changeDir: 'down',
        reasons: [
            { icon: Newspaper, text: 'Ad recovery expectations are mixed', type: 'neutral' },
            { icon: Activity, text: 'Price approaching lower volatility band', type: 'positive' },
            { icon: AlertTriangle, text: 'Foreign selling pressure persists', type: 'negative' },
        ],
    },
]

function ScoreBadge({ score }) {
    const color = score >= 85
        ? 'text-success-400 bg-success-500/10 border-success-500/20'
        : score >= 70
            ? 'text-brand-300 bg-brand-500/10 border-brand-500/20'
            : 'text-signal-400 bg-signal-500/10 border-signal-500/20'

    return (
        <div className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold ${color}`}>
            AI {score}
        </div>
    )
}

export default function RecommendedStocks() {
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-ink-100">AI Ranked Symbols</h3>
                <span className="text-xs text-ink-500">Updated 2 minutes ago</span>
            </div>

            {stocks.map((stock) => (
                <article key={stock.code} className="glass-card glass-card-hover p-5">
                    <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                            <h4 className="text-base font-semibold text-ink-100">{stock.name}</h4>
                            <p className="text-xs text-ink-500">{stock.code}</p>
                        </div>
                        <div className="text-right">
                            <p className={`inline-flex items-center gap-1 text-sm font-medium ${stock.changeDir === 'up' ? 'text-success-400' : 'text-danger-400'}`}>
                                {stock.changeDir === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stock.change}
                            </p>
                            <p className="mt-0.5 text-xs text-ink-500">day move</p>
                        </div>
                    </div>

                    <div className="mb-3 flex items-center gap-2">
                        <ScoreBadge score={stock.score} />
                        <span className={`rounded-md px-2 py-1 text-xs font-medium ${stock.riskClass}`}>Risk {stock.risk}</span>
                    </div>

                    <div className="space-y-1.5">
                        {stock.reasons.map((reason) => {
                            const ReasonIcon = reason.icon
                            const color = reason.type === 'positive'
                                ? 'text-success-400'
                                : reason.type === 'negative'
                                    ? 'text-danger-400'
                                    : 'text-ink-400'

                            return (
                                <div key={reason.text} className="flex items-center gap-2 text-xs text-ink-300">
                                    <ReasonIcon size={13} className={color} />
                                    {reason.text}
                                </div>
                            )
                        })}
                    </div>
                </article>
            ))}
        </div>
    )
}
