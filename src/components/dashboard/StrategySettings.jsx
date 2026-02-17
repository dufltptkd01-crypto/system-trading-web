import React, { useState } from 'react'
import { AlertTriangle, Ban, Clock } from 'lucide-react'

export default function StrategySettings() {
    const [holdingPeriod, setHoldingPeriod] = useState('Swing')
    const [maxOrderAmount, setMaxOrderAmount] = useState(500000)
    const [maxDailyLoss, setMaxDailyLoss] = useState(100000)
    const [consecutiveLossStop, setConsecutiveLossStop] = useState(3)

    const holdingOptions = [
        { label: 'Scalp', sub: '1-10m', desc: 'Fast entries and exits' },
        { label: 'Swing', sub: '1h-1d', desc: 'Balanced hold windows' },
        { label: 'Position', sub: '1d+', desc: 'Trend-following style' },
    ]

    return (
        <div className="space-y-7">
            <section>
                <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-ink-100">
                    <Clock size={18} className="text-brand-300" />
                    Holding Profile
                </h3>
                <p className="mb-4 text-sm text-ink-400">Select the trade tempo that matches your risk tolerance.</p>
                <div className="grid gap-3 sm:grid-cols-3">
                    {holdingOptions.map((opt) => (
                        <button
                            key={opt.label}
                            onClick={() => setHoldingPeriod(opt.label)}
                            className={`rounded-xl border p-4 text-left transition-all ${
                                holdingPeriod === opt.label
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
                    Risk Limits
                </h3>
                <p className="mb-4 text-sm text-ink-400">These limits are enforced before orders leave your account.</p>
                <div className="space-y-5">
                    <div className="glass-card p-4">
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <label className="text-ink-300">Max order amount</label>
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
                            <label className="text-ink-300">Max daily loss</label>
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
                                Consecutive loss stop
                            </label>
                            <span className="font-semibold text-ink-100">{consecutiveLossStop} losses</span>
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

            <button className="btn-primary w-full">Save strategy</button>
        </div>
    )
}
