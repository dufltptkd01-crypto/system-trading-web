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
import { useI18n } from '../i18n/I18nContext.jsx'

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

const content = {
    ko: {
        home: '홈',
        page: '바이낸스 자동매매',
        title: '바이낸스 자동매매',
        connected: 'API 연결됨',
        disconnected: '연결되지 않음',
        startBot: '봇 시작',
        stopBot: '봇 중지',
        chartTab: '실시간 차트',
        logTab: '거래 로그',
        interval: '15분 간격',
        apiConnection: 'API 연결',
        apiKey: 'API 키',
        secretKey: '시크릿 키',
        connectApi: 'API 연결하기',
        connectedStatus: '연결 완료',
        activeStatus: '바이낸스 API 활성 상태',
        disconnect: '연결 해제',
        strategyControls: '전략 제어',
        holdingStyle: '보유 스타일',
        maxOrder: '최대 주문 금액',
        maxLoss: '일일 최대 손실',
        stopAfter: '손실 n회 후 중지',
        botRunning: '봇 실행 중',
        strategy: '전략',
        pair: '종목',
        tradesToday: '오늘 거래',
        dailyPnl: '당일 손익',
        tableHeaders: ['시간', '종목', '구분', '가격', '수량', '거래금액', '손익'],
        buy: '매수',
        sell: '매도',
        warning: '암호화폐 시장은 급격하게 변동할 수 있습니다. 엄격한 비중 관리가 필요합니다.',
        connectAlert: 'API 키와 시크릿 키를 모두 입력하세요.',
        startAlert: '자동매매 시작 전 바이낸스 API를 먼저 연결하세요.',
        securityHint: 'Spot 거래 권한만 허용하고 출금 권한은 비활성화하세요.',
    },
    en: {
        home: 'Home',
        page: 'Binance Auto Trading',
        title: 'Binance Auto Trading',
        connected: 'API connected',
        disconnected: 'Not connected',
        startBot: 'Start bot',
        stopBot: 'Stop bot',
        chartTab: 'Live Chart',
        logTab: 'Trade Log',
        interval: '15m interval',
        apiConnection: 'API Connection',
        apiKey: 'API key',
        secretKey: 'Secret key',
        connectApi: 'Connect API',
        connectedStatus: 'Connected',
        activeStatus: 'Binance API is active',
        disconnect: 'Disconnect',
        strategyControls: 'Strategy Controls',
        holdingStyle: 'Holding style',
        maxOrder: 'Max order value',
        maxLoss: 'Max daily loss',
        stopAfter: 'Stop after losses',
        botRunning: 'Bot running',
        strategy: 'Strategy',
        pair: 'Pair',
        tradesToday: 'Trades today',
        dailyPnl: 'Daily PnL',
        tableHeaders: ['Time', 'Pair', 'Side', 'Price', 'Amount', 'Total', 'PnL'],
        buy: 'Buy',
        sell: 'Sell',
        warning: 'Crypto markets can move abruptly. Use strict position sizing and review execution logs.',
        connectAlert: 'Enter both API key and secret key first.',
        startAlert: 'Connect Binance API before starting auto trading.',
        securityHint: 'Use Spot trading permission only and keep withdrawals disabled.',
    },
}

export default function BinanceTradingPage() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

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
            alert(copy.connectAlert)
            return
        }

        setIsConnected(true)
    }

    const toggleBot = () => {
        if (!isConnected) {
            alert(copy.startAlert)
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
                            <Link to="/" className="hover:text-ink-300">{copy.home}</Link>
                            <span>/</span>
                            <span className="text-ink-400">{copy.page}</span>
                        </div>
                        <h1 className="flex items-center gap-3 text-2xl font-semibold text-ink-100 md:text-3xl">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500 font-bold text-ink-950">B</span>
                            {copy.title}
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <span className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${isConnected ? 'border-success-500/25 bg-success-500/10 text-success-400' : 'border-white/10 bg-ink-900/55 text-ink-400'}`}>
                            {isConnected ? copy.connected : copy.disconnected}
                        </span>
                        <button
                            onClick={toggleBot}
                            className={isBotRunning ? 'btn-secondary border-danger-500/35 text-danger-400' : 'btn-primary'}
                        >
                            {isBotRunning ? <Square size={14} /> : <Play size={14} />}
                            {isBotRunning ? copy.stopBot : copy.startBot}
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
                                        {tab.id === 'chart' ? copy.chartTab : copy.logTab}
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 sm:p-5">
                                {activeTab === 'chart' && (
                                    <div>
                                        <div className="mb-3 flex items-center justify-between">
                                            <h3 className="text-base font-semibold text-ink-100">{selectedPair.name} ({selectedPair.label})</h3>
                                            <span className="chip">{copy.interval}</span>
                                        </div>
                                        <TradingViewWidget symbol={selectedPair.symbol} height={500} widgetLocale={locale === 'ko' ? 'kr' : 'en'} />
                                    </div>
                                )}

                                {activeTab === 'log' && (
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[660px] text-sm">
                                            <thead>
                                                <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-ink-500">
                                                    {copy.tableHeaders.map((header, index) => (
                                                        <th
                                                            key={header}
                                                            className={`px-3 py-2.5 font-medium ${index <= 2 ? 'text-left' : 'text-right'}`}
                                                        >
                                                            {header}
                                                        </th>
                                                    ))}
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
                                                                {trade.side === 'buy' ? copy.buy : copy.sell}
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
                                {copy.apiConnection}
                            </h3>

                            {!isConnected ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="mb-1 block text-xs text-ink-400">{copy.apiKey}</label>
                                        <input type="text" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="Binance API key" className="field-input" />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs text-ink-400">{copy.secretKey}</label>
                                        <input type="password" value={secretKey} onChange={(event) => setSecretKey(event.target.value)} placeholder="Binance secret key" className="field-input" />
                                    </div>
                                    <div className="rounded-lg border border-white/10 bg-ink-900/55 p-3 text-xs text-ink-400">
                                        <p className="flex items-start gap-2">
                                            <Shield size={14} className="mt-0.5 text-signal-400" />
                                            {copy.securityHint}
                                        </p>
                                    </div>
                                    <button onClick={connectApi} className="btn-primary w-full">{copy.connectApi}</button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="mx-auto mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-success-500/14 text-success-400">
                                        <Shield size={18} />
                                    </div>
                                    <p className="text-sm font-medium text-success-400">{copy.connectedStatus}</p>
                                    <p className="mt-1 text-xs text-ink-500">{copy.activeStatus}</p>
                                    <button onClick={() => setIsConnected(false)} className="mt-3 text-xs text-ink-400 hover:text-danger-400">{copy.disconnect}</button>
                                </div>
                            )}
                        </div>

                        <div className="glass-card p-5">
                            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-100">
                                <Settings size={16} className="text-brand-300" />
                                {copy.strategyControls}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-xs text-ink-400">{copy.holdingStyle}</label>
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
                                        <span>{copy.maxOrder}</span>
                                        <span className="text-brand-300">{maxOrder.toLocaleString()} USDT</span>
                                    </div>
                                    <input type="range" min={100} max={10000} step={100} value={maxOrder} onChange={(event) => setMaxOrder(Number(event.target.value))} className="w-full accent-brand-500" />
                                </div>

                                <div>
                                    <div className="mb-1 flex items-center justify-between text-xs text-ink-400">
                                        <span>{copy.maxLoss}</span>
                                        <span className="text-danger-400">{maxDailyLoss.toLocaleString()} USDT</span>
                                    </div>
                                    <input type="range" min={50} max={2000} step={50} value={maxDailyLoss} onChange={(event) => setMaxDailyLoss(Number(event.target.value))} className="w-full accent-danger-500" />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between text-xs text-ink-400">
                                        <span className="flex items-center gap-1"><Ban size={12} />{copy.stopAfter}</span>
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
                                    <span className="text-sm font-semibold">{copy.botRunning}</span>
                                </div>
                                <div className="space-y-1.5 text-xs text-ink-400">
                                    <p className="flex justify-between"><span>{copy.strategy}</span><span className="text-ink-100">{strategy}</span></p>
                                    <p className="flex justify-between"><span>{copy.pair}</span><span className="text-ink-100">{selectedPair.label}</span></p>
                                    <p className="flex justify-between"><span>{copy.tradesToday}</span><span className="text-ink-100">8</span></p>
                                    <p className="flex justify-between"><span>{copy.dailyPnl}</span><span className="text-success-400">+243.00 USDT</span></p>
                                </div>
                            </div>
                        )}

                        <div className="rounded-xl border border-signal-500/25 bg-signal-500/7 p-4 text-xs text-ink-300">
                            <p className="flex items-start gap-2">
                                <AlertTriangle size={14} className="mt-0.5 text-signal-400" />
                                {copy.warning}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
