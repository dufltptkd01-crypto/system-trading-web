import React, { useState } from 'react'
import { AlertTriangle, Ban, Clock } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

const content = {
    ko: {
        profileTitle: '보유 전략',
        profileDesc: '리스크 성향에 맞는 거래 템포를 선택하세요.',
        riskTitle: '리스크 한도',
        riskDesc: '아래 한도는 주문 실행 전에 자동으로 검증됩니다.',
        save: '전략 저장',
        holdingOptions: [
            { label: '초단타', key: 'Scalp', sub: '1-10분', desc: '빠른 진입과 청산' },
            { label: '스윙', key: 'Swing', sub: '1시간-1일', desc: '균형 잡힌 보유 구간' },
            { label: '포지션', key: 'Position', sub: '1일+', desc: '추세 추종 중심' },
        ],
        maxOrder: '최대 주문 금액',
        maxLoss: '일일 최대 손실',
        stopLabel: '연속 손실 중지',
        losses: '회 손실',
    },
    en: {
        profileTitle: 'Holding Profile',
        profileDesc: 'Select the trading tempo that matches your risk tolerance.',
        riskTitle: 'Risk Limits',
        riskDesc: 'These limits are enforced before any order is sent.',
        save: 'Save strategy',
        holdingOptions: [
            { label: 'Scalp', key: 'Scalp', sub: '1-10m', desc: 'Fast entries and exits' },
            { label: 'Swing', key: 'Swing', sub: '1h-1d', desc: 'Balanced hold windows' },
            { label: 'Position', key: 'Position', sub: '1d+', desc: 'Trend-following style' },
        ],
        maxOrder: 'Max order amount',
        maxLoss: 'Max daily loss',
        stopLabel: 'Consecutive loss stop',
        losses: 'losses',
    },
}

export default function StrategySettings() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

    const [holdingPeriod, setHoldingPeriod] = useState('Swing')
    const [maxOrderAmount, setMaxOrderAmount] = useState(500000)
    const [maxDailyLoss, setMaxDailyLoss] = useState(100000)
    const [consecutiveLossStop, setConsecutiveLossStop] = useState(3)

    return (
        <div className="space-y-7">
            <section>
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-ink-100">
                    <Clock size={18} className="text-brand-300" />
                    {copy.profileTitle}
                </h3>
                <p className="mb-4 text-sm text-ink-400">{copy.profileDesc}</p>
                <div className="grid gap-3 sm:grid-cols-3">
                    {copy.holdingOptions.map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => setHoldingPeriod(opt.key)}
                            className={`rounded-xl border p-4 text-left transition-all ${
                                holdingPeriod === opt.key
                                    ? 'border-brand-400/45 bg-brand-500/12'
                                    : 'border-white/10 bg-ink-900/50 hover:border-white/20'
                            }`}
                        >
                            <p className="text-sm font-semibold text-ink-100">{opt.label}</p>
                            <p className="text-xs text-brand-300">{opt.sub}</p>
                            <p className="mt-1 text-xs text-ink-400">{opt.desc}</p>
                        </button>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-ink-100">
                    <AlertTriangle size={18} className="text-signal-400" />
                    {copy.riskTitle}
                </h3>
                <p className="mb-4 text-sm text-ink-400">{copy.riskDesc}</p>
                <div className="space-y-5">
                    <div className="glass-card p-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <label className="text-ink-300">{copy.maxOrder}</label>
                            <span className="font-semibold text-brand-300">{maxOrderAmount.toLocaleString()} KRW</span>
                        </div>
                        <input
                            type="range"
                            min={100000}
                            max={5000000}
                            step={100000}
                            value={maxOrderAmount}
                            onChange={(e) => setMaxOrderAmount(Number(e.target.value))}
                            className="w-full accent-brand-500"
                        />
                    </div>

                    <div className="glass-card p-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <label className="text-ink-300">{copy.maxLoss}</label>
                            <span className="font-semibold text-danger-400">{maxDailyLoss.toLocaleString()} KRW</span>
                        </div>
                        <input
                            type="range"
                            min={50000}
                            max={1000000}
                            step={50000}
                            value={maxDailyLoss}
                            onChange={(e) => setMaxDailyLoss(Number(e.target.value))}
                            className="w-full accent-danger-500"
                        />
                    </div>

                    <div className="glass-card p-4">
                        <div className="mb-3 flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-ink-300">
                                <Ban size={14} className="text-danger-400" />
                                {copy.stopLabel}
                            </label>
                            <span className="font-semibold text-ink-100">{consecutiveLossStop} {copy.losses}</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {[2, 3, 4, 5].map((count) => (
                                <button
                                    key={count}
                                    onClick={() => setConsecutiveLossStop(count)}
                                    className={`rounded-lg py-2 text-sm font-medium transition-colors ${
                                        consecutiveLossStop === count
                                            ? 'bg-brand-500 text-ink-950'
                                            : 'bg-ink-900/70 text-ink-300 hover:bg-ink-800/70'
                                    }`}
                                >
                                    {count}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <button className="btn-primary w-full">{copy.save}</button>
        </div>
    )
}
