import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Activity,
    AlertTriangle,
    ArrowDownRight,
    ArrowUpRight,
    BarChart2,
    Filter,
    Newspaper,
    Search,
} from 'lucide-react'
import TradingViewWidget from '../components/ui/TradingViewWidget.jsx'

const recommendations = [
    {
        name: 'Samsung Electronics',
        code: '005930',
        tvSymbol: 'KRX:005930',
        score: 92,
        risk: 'Low',
        riskColor: 'text-success-400',
        riskBg: 'bg-success-500/10',
        price: '72,400 KRW',
        change: '+2.4%',
        changeDir: 'up',
        category: 'Korea Stocks',
        reasons: [
            { icon: Newspaper, text: 'Positive AI semiconductor cycle narrative', type: 'positive' },
            { icon: BarChart2, text: 'Volume running 1.8x above baseline', type: 'positive' },
            { icon: Activity, text: 'RSI rebounded from oversold territory', type: 'positive' },
        ],
    },
    {
        name: 'SK hynix',
        code: '000660',
        tvSymbol: 'KRX:000660',
        score: 87,
        risk: 'Medium',
        riskColor: 'text-signal-400',
        riskBg: 'bg-signal-500/10',
        price: '185,600 KRW',
        change: '+1.8%',
        changeDir: 'up',
        category: 'Korea Stocks',
        reasons: [
            { icon: Newspaper, text: 'HBM demand outlook remains constructive', type: 'positive' },
            { icon: Activity, text: 'MACD bullish crossover triggered', type: 'positive' },
            { icon: BarChart2, text: 'Volume stable versus 20-day average', type: 'neutral' },
        ],
    },
    {
        name: 'Kakao',
        code: '035720',
        tvSymbol: 'KRX:035720',
        score: 74,
        risk: 'Medium',
        riskColor: 'text-signal-400',
        riskBg: 'bg-signal-500/10',
        price: '42,350 KRW',
        change: '-0.5%',
        changeDir: 'down',
        category: 'Korea Stocks',
        reasons: [
            { icon: Newspaper, text: 'Digital ad recovery remains uneven', type: 'neutral' },
            { icon: Activity, text: 'Price testing lower volatility range', type: 'positive' },
            { icon: AlertTriangle, text: 'Foreign net-selling still active', type: 'negative' },
        ],
    },
    {
        name: 'Bitcoin',
        code: 'BTC',
        tvSymbol: 'BINANCE:BTCUSDT',
        score: 85,
        risk: 'Medium',
        riskColor: 'text-signal-400',
        riskBg: 'bg-signal-500/10',
        price: '96,521 USD',
        change: '+3.2%',
        changeDir: 'up',
        category: 'Crypto',
        reasons: [
            { icon: Newspaper, text: 'Institutional flow remains supportive', type: 'positive' },
            { icon: Activity, text: 'Momentum remains above neutral threshold', type: 'positive' },
            { icon: BarChart2, text: 'Liquidity profile healthy', type: 'positive' },
        ],
    },
    {
        name: 'Ethereum',
        code: 'ETH',
        tvSymbol: 'BINANCE:ETHUSDT',
        score: 81,
        risk: 'Medium',
        riskColor: 'text-signal-400',
        riskBg: 'bg-signal-500/10',
        price: '3,285 USD',
        change: '+1.5%',
        changeDir: 'up',
        category: 'Crypto',
        reasons: [
            { icon: Newspaper, text: 'Network activity trend remains constructive', type: 'positive' },
            { icon: Activity, text: 'MACD buy signal still valid', type: 'positive' },
            { icon: AlertTriangle, text: 'Gas volatility can pressure near-term flow', type: 'negative' },
        ],
    },
]

const categories = ['All', 'Korea Stocks', 'Crypto']

function ScoreBadge({ score }) {
    const className = score >= 85
        ? 'text-success-400 bg-success-500/10 border-success-500/20'
        : score >= 70
            ? 'text-brand-300 bg-brand-500/10 border-brand-500/20'
            : 'text-signal-400 bg-signal-500/10 border-signal-500/20'

    return <span className={`rounded-lg border px-2.5 py-1 text-xs font-semibold ${className}`}>AI {score}</span>
}

export default function StockRecommendationPage() {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [selectedStock, setSelectedStock] = useState(recommendations[0])
    const [searchQuery, setSearchQuery] = useState('')

    const filtered = useMemo(
        () => recommendations.filter((item) => {
            const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory
            const query = searchQuery.toLowerCase()
            const searchMatch = item.name.toLowerCase().includes(query) || item.code.toLowerCase().includes(query)
            return categoryMatch && searchMatch
        }),
        [searchQuery, selectedCategory],
    )

    return (
        <section className="min-h-screen pb-12 pt-24">
            <div className="container-custom">
                <div className="mb-6">
                    <div className="mb-2 flex items-center gap-2 text-xs text-ink-500">
                        <Link to="/" className="hover:text-ink-300">Home</Link>
                        <span>/</span>
                        <span className="text-ink-400">AI Recommendations</span>
                    </div>
                    <h1 className="text-2xl font-semibold text-ink-100 md:text-3xl">AI Recommendation Board</h1>
                    <p className="mt-2 text-sm text-ink-400">Confidence score and risk context in one view.</p>
                </div>

                <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="flex flex-wrap items-center gap-2">
                        <Filter size={14} className="text-ink-400" />
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                                    selectedCategory === category
                                        ? 'border-brand-400/45 bg-brand-500/12 text-brand-300'
                                        : 'border-white/10 bg-ink-900/50 text-ink-400 hover:text-ink-200'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:ml-auto lg:w-[280px]">
                        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search by symbol"
                            className="field-input pl-9"
                        />
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-5">
                    <div className="xl:col-span-2 space-y-3">
                        <p className="text-xs text-ink-500">{filtered.length} symbols - data refresh 2 min</p>

                        {filtered.map((stock) => (
                            <button
                                key={stock.code}
                                onClick={() => setSelectedStock(stock)}
                                className={`w-full rounded-xl border p-4 text-left transition-colors ${
                                    selectedStock?.code === stock.code
                                        ? 'border-brand-400/40 bg-brand-500/12'
                                        : 'border-white/10 bg-ink-900/50 hover:border-white/20'
                                }`}
                            >
                                <div className="mb-3 flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-semibold text-ink-100">{stock.name}</p>
                                        <p className="text-xs text-ink-500">{stock.code}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-ink-200">{stock.price}</p>
                                        <p className={`inline-flex items-center gap-0.5 text-xs ${stock.changeDir === 'up' ? 'text-success-400' : 'text-danger-400'}`}>
                                            {stock.changeDir === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                            {stock.change}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <ScoreBadge score={stock.score} />
                                    <span className={`rounded-md px-2 py-1 text-xs font-medium ${stock.riskBg} ${stock.riskColor}`}>Risk {stock.risk}</span>
                                    <span className="rounded-md bg-ink-800/60 px-2 py-1 text-xs text-ink-400">{stock.category}</span>
                                </div>

                                <div className="space-y-1.5">
                                    {stock.reasons.slice(0, 2).map((reason) => {
                                        const Icon = reason.icon
                                        const color = reason.type === 'positive' ? 'text-success-400' : reason.type === 'negative' ? 'text-danger-400' : 'text-ink-400'
                                        return (
                                            <p key={reason.text} className="flex items-center gap-2 text-xs text-ink-300">
                                                <Icon size={12} className={color} />
                                                {reason.text}
                                            </p>
                                        )
                                    })}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="xl:col-span-3">
                        {selectedStock ? (
                            <div className="glass-card sticky top-24 p-4 sm:p-5">
                                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-lg font-semibold text-ink-100">{selectedStock.name}</p>
                                        <p className="text-sm text-ink-400">{selectedStock.code} - {selectedStock.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-ink-100">{selectedStock.price}</p>
                                        <p className={`${selectedStock.changeDir === 'up' ? 'text-success-400' : 'text-danger-400'} text-sm`}>{selectedStock.change}</p>
                                    </div>
                                </div>

                                <TradingViewWidget symbol={selectedStock.tvSymbol} height={510} />

                                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                    <div className="rounded-xl border border-white/10 bg-ink-900/55 p-3 text-center">
                                        <p className="text-xs text-ink-500">AI score</p>
                                        <p className="mt-1 text-lg font-semibold text-brand-300">{selectedStock.score}</p>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-ink-900/55 p-3 text-center">
                                        <p className="text-xs text-ink-500">Risk level</p>
                                        <p className={`mt-1 text-lg font-semibold ${selectedStock.riskColor}`}>{selectedStock.risk}</p>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-ink-900/55 p-3 text-center">
                                        <p className="text-xs text-ink-500">Daily move</p>
                                        <p className={`mt-1 text-lg font-semibold ${selectedStock.changeDir === 'up' ? 'text-success-400' : 'text-danger-400'}`}>{selectedStock.change}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="glass-card p-10 text-center">
                                <BarChart2 size={42} className="mx-auto text-ink-500" />
                                <p className="mt-3 text-ink-300">Pick a symbol to view the full analysis.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
