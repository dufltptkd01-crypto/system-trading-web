import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    AlertTriangle,
    Ban,
    BarChart2,
    Clock,
    Key,
    Play,
    RefreshCw,
    Settings,
    Shield,
    Square,
    TrendingDown,
    TrendingUp,
} from 'lucide-react'
import TradingViewWidget from '../components/ui/TradingViewWidget.jsx'

const marketPairs = [
    { symbol: 'BINANCE:BTCUSDT', label: 'BTC/USDT', name: 'Bitcoin' },
    { symbol: 'BINANCE:ETHUSDT', label: 'ETH/USDT', name: 'Ethereum' },
    { symbol: 'BINANCE:SOLUSDT', label: 'SOL/USDT', name: 'Solana' },
    { symbol: 'BINANCE:BNBUSDT', label: 'BNB/USDT', name: 'BNB' },
]

const trades = [
    { id: 1, time: '15:42:31', pair: 'BTC/USDT', side: 'buy', price: '96,521.40', amount: '0.012', total: '1,158.26', pnl: null },
    { id: 2, time: '15:38:12', pair: 'ETH/USDT', side: 'sell', price: '3,285.60', amount: '1.50', total: '4,928.40', pnl: '+285.00' },
    { id: 3, time: '14:52:08', pair: 'ETH/USDT', side: 'buy', price: '3,095.60', amount: '1.50', total: '4,643.40', pnl: null },
    { id: 4, time: '14:15:33', pair: 'SOL/USDT', side: 'sell', price: '198.45', amount: '10', total: '1,984.50', pnl: '-42.00' },
]

const tabs = [
    { id: 'chart', label: 'Live Chart', icon: BarChart2 },
    { id: 'log', label: 'Trade Log', icon: Clock },
]

export default function BinanceTradingPage() {
    const [selectedPair, setSelectedPair] = useState(marketPairs[0])
    const [apiKey, setApiKey] = useState('')
    const [secretKey, setSecretKey] = useState('')
    const [isConnected, setIsConnected] = useState(false)
    const [isBotRunning, setIsBotRunning] = useState(false)
    const [activeTab, setActiveTab] = useState('chart')

    const [strategy, setStrategy] = useState('Swing')
    const [maxOrder, setMaxOrder] = useState(1000)
    const [maxDailyLoss, setMaxDailyLoss] = useState(200)
    const [stopAfter, setStopAfter] = useState(3)

    const connectApi = () => {
        if (!apiKey || !secretKey) {
            alert('Enter both API key and secret key first.')
            return
        }

        setIsConnected(true)
    }

    const toggleBot = () => {
        if (!isConnected) {
            alert('Connect Binance API before starting auto trading.')
            return
        }

        setIsBotRunning((prev) => !prev)
    }

    return (
        <section className="min-h-screen pb-12 pt-24">
            <div className="container-custom">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs text-ink-500">
                            <Link to="/" className="hover:text-ink-300">Home</Link>
                            <span>/</span>
                            <span className="text-ink-400">Binance Auto Trading</span>
                        </div>
                        <h1 className="flex items-center gap-3 text-2xl font-semibold text-ink-100 md:text-3xl">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500 font-bold text-ink-950">B</span>
                            Binance Auto Trading
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${isConnected ? 'border-success-500/25 bg-success-500/10 text-success-400' : 'border-white/10 bg-ink-900/55 text-ink-400'}`}>
                            {isConnected ? 'API connected' : 'Not connected'}
                        </span>
                        <button
                            onClick={toggleBot}
                            className={isBotRunning ? 'btn-secondary border-danger-500/35 text-danger-400' : 'btn-primary'}
                        >
                            {isBotRunning ? <Square size={14} /> : <Play size={14} />}
                            {isBotRunning ? 'Stop bot' : 'Start bot'}
                        </button>
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-4">
                    <div className="xl:col-span-3 space-y-5">
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {marketPairs.map((pair) => (
                                <button
                                    key={pair.symbol}
                                    onClick={() => setSelectedPair(pair)}
                                    className={`rounded-lg border px-3.5 py-2 text-sm whitespace-nowrap ${
                                        selectedPair.symbol === pair.symbol
                                            ? 'border-brand-400/45 bg-brand-500/12 text-brand-300'
                                            : 'border-white/10 bg-ink-900/50 text-ink-400'
                                    }`}
                                >
                                    {pair.label}
                                </button>
                            ))}
                        </div>

                        <div className="glass-card overflow-hidden">
                            <div className="flex border-b border-white/10">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-5 py-3 text-sm ${activeTab === tab.id ? 'tab-active text-ink-100' : 'text-ink-400 hover:text-ink-200'}`}
                                    >
                                        <tab.icon size={15} />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 sm:p-5">
                                {activeTab === 'chart' && (
                                    <div>
                                        <div className="mb-3 flex items-center justify-between">
                                            <h3 className="text-base font-semibold text-ink-100">{selectedPair.name} ({selectedPair.label})</h3>
                                            <span className="chip">15m interval</span>
                                        </div>
                                        <TradingViewWidget symbol={selectedPair.symbol} height={500} />
                                    </div>
                                )}

                                {activeTab === 'log' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[660px] text-sm">
                                            <thead>
                                                <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-ink-500">
                                                    <th className="px-3 py-2.5 text-left font-medium">Time</th>
                                                    <th className="px-3 py-2.5 text-left font-medium">Pair</th>
                                                    <th className="px-3 py-2.5 text-left font-medium">Side</th>
                                                    <th className="px-3 py-2.5 text-right font-medium">Price</th>
                                                    <th className="px-3 py-2.5 text-right font-medium">Amount</th>
                                                    <th className="px-3 py-2.5 text-right font-medium">Total</th>
                                                    <th className="px-3 py-2.5 text-right font-medium">PnL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {trades.map((trade) => (
                                                    <tr key={trade.id} className="border-b border-white/6 text-ink-300">
                                                        <td className="px-3 py-2.5 text-ink-400">{trade.time}</td>
                                                        <td className="px-3 py-2.5 text-ink-100">{trade.pair}</td>
                                                        <td className="px-3 py-2.5">
                                                            <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${trade.side === 'buy' ? 'bg-danger-500/15 text-danger-400' : 'bg-success-500/15 text-success-400'}`}>
                                                                {trade.side === 'buy' ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                                                                {trade.side}
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-2.5 text-right">{trade.price}</td>
                                                        <td className="px-3 py-2.5 text-right">{trade.amount}</td>
                                                        <td className="px-3 py-2.5 text-right">{trade.total}</td>
                                                        <td className="px-3 py-2.5 text-right">
                                                            {trade.pnl ? <span className={trade.pnl.startsWith('+') ? 'text-success-400' : 'text-danger-400'}>{trade.pnl}</span> : <span className="text-ink-500">-</span>}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="glass-card p-5">
                            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-100">
                                <Key size={16} className="text-signal-400" />
                                API Connection
                            </h3>

                            {!isConnected ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="mb-1 block text-xs text-ink-400">API key</label>
                                        <input type="text" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="Binance API key" className="field-input" />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs text-ink-400">Secret key</label>
                                        <input type="password" value={secretKey} onChange={(event) => setSecretKey(event.target.value)} placeholder="Binance secret key" className="field-input" />
                                    </div>
                                    <div className="rounded-lg border border-white/10 bg-ink-900/55 p-3 text-xs text-ink-400">
                                        <p className="flex items-start gap-2">
                                            <Shield size={14} className="mt-0.5 text-signal-400" />
                                            Use Spot trading permission only and keep withdrawals disabled.
                                        </p>
                                    </div>
                                    <button onClick={connectApi} className="btn-primary w-full">Connect API</button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-success-500/14 text-success-400">
                                        <Shield size={18} />
                                    </div>
                                    <p className="text-sm font-medium text-success-400">Connected</p>
                                    <p className="mt-1 text-xs text-ink-500">Binance API is active</p>
                                    <button onClick={() => setIsConnected(false)} className="mt-3 text-xs text-ink-400 hover:text-danger-400">Disconnect</button>
                                </div>
                            )}
                        </div>

                        <div className="glass-card p-5">
                            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-100">
                                <Settings size={16} className="text-brand-300" />
                                Strategy Controls
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-xs text-ink-400">Holding style</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Scalp', 'Swing', 'Position'].map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => setStrategy(item)}
                                                className={`rounded-md py-2 text-xs ${strategy === item ? 'bg-brand-500 text-ink-950' : 'bg-ink-900/65 text-ink-400'}`}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-1 flex items-center justify-between text-xs text-ink-400">
                                        <span>Max order value</span>
                                        <span className="text-brand-300">{maxOrder.toLocaleString()} USDT</span>
                                    </div>
                                    <input type="range" min={100} max={10000} step={100} value={maxOrder} onChange={(event) => setMaxOrder(Number(event.target.value))} className="w-full accent-brand-500" />
                                </div>

                                <div>
                                    <div className="mb-1 flex items-center justify-between text-xs text-ink-400">
                                        <span>Max daily loss</span>
                                        <span className="text-danger-400">{maxDailyLoss.toLocaleString()} USDT</span>
                                    </div>
                                    <input type="range" min={50} max={2000} step={50} value={maxDailyLoss} onChange={(event) => setMaxDailyLoss(Number(event.target.value))} className="w-full accent-danger-500" />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between text-xs text-ink-400">
                                        <span className="flex items-center gap-1"><Ban size={12} />Stop after losses</span>
                                        <span className="text-ink-100">{stopAfter}</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {[2, 3, 4, 5].map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => setStopAfter(item)}
                                                className={`rounded-md py-1.5 text-xs ${stopAfter === item ? 'bg-brand-500 text-ink-950' : 'bg-ink-900/65 text-ink-400'}`}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isBotRunning && (
                            <div className="glass-card border-success-500/25 p-5">
                                <div className="mb-3 flex items-center gap-2 text-success-400">
                                    <RefreshCw size={14} className="animate-spin" />
                                    <span className="text-sm font-semibold">Bot running</span>
                                </div>
                                <div className="space-y-1.5 text-xs text-ink-400">
                                    <p className="flex justify-between"><span>Strategy</span><span className="text-ink-100">{strategy}</span></p>
                                    <p className="flex justify-between"><span>Pair</span><span className="text-ink-100">{selectedPair.label}</span></p>
                                    <p className="flex justify-between"><span>Trades today</span><span className="text-ink-100">8</span></p>
                                    <p className="flex justify-between"><span>Daily PnL</span><span className="text-success-400">+243.00 USDT</span></p>
                                </div>
                            </div>
                        )}

                        <div className="rounded-xl border border-signal-500/25 bg-signal-500/7 p-4 text-xs text-ink-300">
                            <p className="flex items-start gap-2">
                                <AlertTriangle size={14} className="mt-0.5 text-signal-400" />
                                Crypto markets can move abruptly. Use strict position sizing and review execution logs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
