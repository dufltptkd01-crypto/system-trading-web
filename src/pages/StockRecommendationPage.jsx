import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownRight, ArrowUpRight, BarChart2, Filter, Search, ShieldAlert, Sparkles } from 'lucide-react'
import TradingViewWidget from '../components/ui/TradingViewWidget.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

const recommendations = [
    {
        code: '005930',
        tvSymbol: 'KRX:005930',
        name: { ko: '삼성전자', en: 'Samsung Electronics' },
        score: 92,
        risk: 'low',
        price: '72,400 KRW',
        change: '+2.4%',
        changeDir: 'up',
        category: 'stocks',
        reason: {
            ko: '반도체 수요 개선과 거래량 확대가 동시에 나타나 추세 지속 가능성이 높습니다.',
            en: 'Semiconductor demand recovery and rising volume support a durable trend continuation.',
        },
    },
    {
        code: '000660',
        tvSymbol: 'KRX:000660',
        name: { ko: 'SK하이닉스', en: 'SK hynix' },
        score: 87,
        risk: 'medium',
        price: '185,600 KRW',
        change: '+1.8%',
        changeDir: 'up',
        category: 'stocks',
        reason: {
            ko: '메모리 사이클 기대감과 기술적 모멘텀이 동시 강화되고 있습니다.',
            en: 'Memory-cycle optimism and momentum indicators are strengthening together.',
        },
    },
    {
        code: 'BTC',
        tvSymbol: 'BINANCE:BTCUSDT',
        name: { ko: '비트코인', en: 'Bitcoin' },
        score: 85,
        risk: 'medium',
        price: '96,521 USD',
        change: '+3.2%',
        changeDir: 'up',
        category: 'crypto',
        reason: {
            ko: '기관 수급 흐름이 우호적으로 유지되며 주요 지지선 위에서 거래되고 있습니다.',
            en: 'Institutional flows remain constructive while price holds above key support levels.',
        },
    },
    {
        code: 'ETH',
        tvSymbol: 'BINANCE:ETHUSDT',
        name: { ko: '이더리움', en: 'Ethereum' },
        score: 81,
        risk: 'medium',
        price: '3,285 USD',
        change: '+1.5%',
        changeDir: 'up',
        category: 'crypto',
        reason: {
            ko: '네트워크 활동 증가와 기술적 추세 회복 신호가 동반되고 있습니다.',
            en: 'Network activity growth and technical trend recovery are moving in sync.',
        },
    },
]

const content = {
    ko: {
        home: '홈',
        page: 'AI 추천 종목',
        title: '프리미엄 AI 추천 보드',
        subtitle: '종목명, 추천 점수, 추천 이유, 위험도를 한 화면에서 확인하세요.',
        categories: [
            { id: 'all', label: '전체' },
            { id: 'stocks', label: '국내 주식' },
            { id: 'crypto', label: '암호화폐' },
        ],
        searchPlaceholder: '종목명/코드 검색',
        listMeta: '개 종목 · 2분 주기 업데이트',
        labels: {
            name: '종목명',
            score: '추천 점수',
            reason: '추천 이유',
            risk: '위험도',
            aiScore: 'AI 점수',
            riskLevel: '위험 수준',
            dayMove: '당일 변동',
            pickHint: '좌측에서 종목을 선택하면 상세 분석이 표시됩니다.',
        },
        riskMap: { low: '낮음', medium: '중간', high: '높음' },
    },
    en: {
        home: 'Home',
        page: 'AI Recommendations',
        title: 'Premium AI Recommendation Board',
        subtitle: 'Review symbol, score, rationale, and risk in one coherent interface.',
        categories: [
            { id: 'all', label: 'All' },
            { id: 'stocks', label: 'Korea Stocks' },
            { id: 'crypto', label: 'Crypto' },
        ],
        searchPlaceholder: 'Search symbol or code',
        listMeta: ' symbols · refresh every 2 min',
        labels: {
            name: 'Symbol',
            score: 'Recommendation score',
            reason: 'Rationale',
            risk: 'Risk',
            aiScore: 'AI score',
            riskLevel: 'Risk level',
            dayMove: 'Daily move',
            pickHint: 'Select a symbol on the left to open detailed analysis.',
        },
        riskMap: { low: 'Low', medium: 'Medium', high: 'High' },
    },
}

function riskTone(risk) {
    if (risk === 'low') return 'text-success-400 border-success-500/25 bg-success-500/10'
    if (risk === 'medium') return 'text-signal-400 border-signal-500/25 bg-signal-500/10'
    return 'text-danger-400 border-danger-500/25 bg-danger-500/10'
}

function ScoreBadge({ score }) {
    return (
        <span className="inline-flex items-center rounded-lg border border-brand-500/25 bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-300">
            AI {score}
        </span>
    )
}

export default function StockRecommendationPage() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedStock, setSelectedStock] = useState(recommendations[0])
    const [searchQuery, setSearchQuery] = useState('')

    const filtered = useMemo(
        () => recommendations.filter((item) => {
            const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
            const query = searchQuery.toLowerCase()
            const localName = item.name[locale].toLowerCase()
            const searchMatch = localName.includes(query) || item.code.toLowerCase().includes(query)
            return categoryMatch && searchMatch
        }),
        [locale, searchQuery, selectedCategory],
    )

    return (
        <section className="min-h-screen pb-16 pt-28">
            <div className="container-custom">
                <div className="mb-8">
                    <div className="mb-2 flex items-center gap-2 text-xs text-ink-500">
                        <Link to="/" className="hover:text-ink-300">{copy.home}</Link>
                        <span>/</span>
                        <span className="text-ink-400">{copy.page}</span>
                    </div>
                    <h1 className="text-3xl font-semibold text-ink-100 md:text-4xl">{copy.title}</h1>
                    <p className="mt-3 text-base text-ink-400">{copy.subtitle}</p>
                </div>

                <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="flex flex-wrap items-center gap-2">
                        <Filter size={14} className="text-ink-400" />
                        {copy.categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                                    selectedCategory === category.id
                                        ? 'border-brand-400/45 bg-brand-500/12 text-brand-300'
                                        : 'border-white/10 bg-ink-900/50 text-ink-400 hover:text-ink-200'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:ml-auto lg:w-[320px]">
                        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder={copy.searchPlaceholder}
                            className="field-input pl-9"
                        />
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-5">
                    <div className="space-y-3 xl:col-span-2">
                        <p className="text-sm text-ink-500">{filtered.length}{copy.listMeta}</p>

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
                                        <p className="text-xs uppercase tracking-[0.14em] text-ink-500">{copy.labels.name}</p>
                                        <p className="mt-1 text-lg font-semibold text-ink-100">{stock.name[locale]}</p>
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
                                    <span className={`rounded-md border px-2 py-1 text-xs font-medium ${riskTone(stock.risk)}`}>
                                        {copy.labels.risk} {copy.riskMap[stock.risk]}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-xs uppercase tracking-[0.14em] text-ink-500">{copy.labels.reason}</p>
                                    <p className="mt-2 text-sm leading-relaxed text-ink-300">{stock.reason[locale]}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="xl:col-span-3">
                        {selectedStock ? (
                            <div className="glass-card sticky top-24 p-4 sm:p-5">
                                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xl font-semibold text-ink-100">{selectedStock.name[locale]}</p>
                                        <p className="text-sm text-ink-400">{selectedStock.code}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-ink-100">{selectedStock.price}</p>
                                        <p className={`${selectedStock.changeDir === 'up' ? 'text-success-400' : 'text-danger-400'} text-sm`}>{selectedStock.change}</p>
                                    </div>
                                </div>

                                <TradingViewWidget symbol={selectedStock.tvSymbol} height={510} widgetLocale={locale === 'ko' ? 'kr' : 'en'} />

                                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                    <div className="rounded-xl border border-white/10 bg-ink-900/55 p-3 text-center">
                                        <p className="text-xs text-ink-500">{copy.labels.aiScore}</p>
                                        <p className="mt-1 text-lg font-semibold text-brand-300">{selectedStock.score}</p>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-ink-900/55 p-3 text-center">
                                        <p className="text-xs text-ink-500">{copy.labels.riskLevel}</p>
                                        <p className={`mt-1 text-lg font-semibold ${riskTone(selectedStock.risk).split(' ')[0]}`}>{copy.riskMap[selectedStock.risk]}</p>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-ink-900/55 p-3 text-center">
                                        <p className="text-xs text-ink-500">{copy.labels.dayMove}</p>
                                        <p className={`mt-1 text-lg font-semibold ${selectedStock.changeDir === 'up' ? 'text-success-400' : 'text-danger-400'}`}>{selectedStock.change}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="glass-card p-10 text-center">
                                <BarChart2 size={42} className="mx-auto text-ink-500" />
                                <p className="mt-3 text-ink-300">{copy.labels.pickHint}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
