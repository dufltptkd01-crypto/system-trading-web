import React from 'react'
import { ShieldAlert, Sparkles, TrendingUp } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

const content = {
    ko: {
        title: 'AI 추천 종목',
        updated: '2분 전 업데이트',
        labels: {
            name: '종목명',
            score: '추천 점수',
            reason: '추천 이유',
            risk: '위험도',
        },
        cards: [
            {
                name: '삼성전자',
                symbol: '005930',
                score: 94,
                reason: '반도체 업황 개선 신호와 거래량 확대로 추세 지속 가능성이 높습니다.',
                risk: '낮음',
                riskClass: 'text-success-400 bg-success-500/10 border-success-500/25',
            },
            {
                name: 'SK하이닉스',
                symbol: '000660',
                score: 88,
                reason: '메모리 업사이클 기대와 모멘텀 지표가 동시 강화되고 있습니다.',
                risk: '중간',
                riskClass: 'text-signal-400 bg-signal-500/10 border-signal-500/25',
            },
            {
                name: 'BTC/USDT',
                symbol: 'BTC',
                score: 84,
                reason: '거래대금이 안정적으로 유지되며 주요 추세선 위에서 변동성이 축소 중입니다.',
                risk: '중간',
                riskClass: 'text-signal-400 bg-signal-500/10 border-signal-500/25',
            },
        ],
    },
    en: {
        title: 'AI Ranked Picks',
        updated: 'Updated 2 minutes ago',
        labels: {
            name: 'Symbol',
            score: 'Score',
            reason: 'Why now',
            risk: 'Risk',
        },
        cards: [
            {
                name: 'Samsung Electronics',
                symbol: '005930',
                score: 94,
                reason: 'Semiconductor momentum and expanding volume support a durable trend setup.',
                risk: 'Low',
                riskClass: 'text-success-400 bg-success-500/10 border-success-500/25',
            },
            {
                name: 'SK hynix',
                symbol: '000660',
                score: 88,
                reason: 'Memory-cycle optimism aligns with strengthening momentum indicators.',
                risk: 'Medium',
                riskClass: 'text-signal-400 bg-signal-500/10 border-signal-500/25',
            },
            {
                name: 'BTC/USDT',
                symbol: 'BTC',
                score: 84,
                reason: 'Liquidity remains stable while volatility compresses above key trend support.',
                risk: 'Medium',
                riskClass: 'text-signal-400 bg-signal-500/10 border-signal-500/25',
            },
        ],
    },
}

function ScoreMeter({ score }) {
    return (
        <div>
            <div className="mb-1 flex items-center justify-between text-xs text-ink-500">
                <span>AI</span>
                <span className="font-semibold text-brand-300">{score}/100</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/8">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 via-brand-300 to-signal-400"
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    )
}

export default function RecommendedStocks() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-ink-100">
                    <Sparkles size={18} className="text-brand-300" />
                    {copy.title}
                </h3>
                <span className="text-sm text-ink-500">{copy.updated}</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {copy.cards.map((stock) => (
                    <article key={stock.symbol} className="glass-card glass-card-hover p-5">
                        <dl className="space-y-4">
                            <div>
                                <dt className="text-xs uppercase tracking-[0.14em] text-ink-500">{copy.labels.name}</dt>
                                <dd className="mt-1 flex items-center justify-between">
                                    <p className="text-lg font-semibold text-ink-100">{stock.name}</p>
                                    <span className="rounded-md border border-white/10 bg-ink-900/70 px-2 py-1 text-xs text-ink-400">{stock.symbol}</span>
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs uppercase tracking-[0.14em] text-ink-500">{copy.labels.score}</dt>
                                <dd className="mt-2">
                                    <ScoreMeter score={stock.score} />
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs uppercase tracking-[0.14em] text-ink-500">{copy.labels.reason}</dt>
                                <dd className="mt-2 flex items-start gap-2 text-[15px] leading-[1.72] text-ink-300">
                                    <TrendingUp size={16} className="mt-0.5 shrink-0 text-brand-300" />
                                    {stock.reason}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-xs uppercase tracking-[0.14em] text-ink-500">{copy.labels.risk}</dt>
                                <dd className="mt-2">
                                    <span className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-sm font-medium ${stock.riskClass}`}>
                                        <ShieldAlert size={14} />
                                        {stock.risk}
                                    </span>
                                </dd>
                            </div>
                        </dl>
                    </article>
                ))}
            </div>
        </div>
    )
}
