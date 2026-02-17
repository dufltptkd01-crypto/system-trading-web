import React from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

const trades = [
    {
        id: 1,
        time: '15:42:31',
        stock: 'Samsung Electronics',
        code: '005930',
        type: 'buy',
        price: 72400,
        quantity: 10,
        total: 724000,
        pnl: null,
        status: 'Filled',
    },
    {
        id: 2,
        time: '15:38:12',
        stock: 'SK hynix',
        code: '000660',
        type: 'sell',
        price: 185600,
        quantity: 5,
        total: 928000,
        pnl: 45200,
        pnlPercent: '+5.12%',
        status: 'Filled',
    },
    {
        id: 3,
        time: '14:52:08',
        stock: 'SK hynix',
        code: '000660',
        type: 'buy',
        price: 176560,
        quantity: 5,
        total: 882800,
        pnl: null,
        status: 'Filled',
    },
    {
        id: 4,
        time: '14:15:33',
        stock: 'Kakao',
        code: '035720',
        type: 'sell',
        price: 42350,
        quantity: 20,
        total: 847000,
        pnl: -12400,
        pnlPercent: '-1.44%',
        status: 'Filled',
    },
]

const content = {
    ko: {
        todayPnl: '당일 손익',
        totalTrades: '총 거래 수',
        winningTrades: '수익 거래',
        losingTrades: '손실 거래',
        headers: ['시간', '종목', '구분', '가격', '수량', '거래금액', '손익', '상태'],
        buy: '매수',
        sell: '매도',
        filled: '체결',
    },
    en: {
        todayPnl: 'Today PnL',
        totalTrades: 'Total trades',
        winningTrades: 'Winning trades',
        losingTrades: 'Losing trades',
        headers: ['Time', 'Symbol', 'Side', 'Price', 'Qty', 'Value', 'PnL', 'Status'],
        buy: 'Buy',
        sell: 'Sell',
        filled: 'Filled',
    },
}

export default function TradingLog() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

    const totalPnl = trades.reduce((sum, trade) => sum + (trade.pnl || 0), 0)
    const wins = trades.filter((trade) => trade.pnl && trade.pnl > 0).length
    const losses = trades.filter((trade) => trade.pnl && trade.pnl < 0).length

    return (
        <div>
            <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="glass-card p-4">
                    <p className="text-xs text-ink-500">{copy.todayPnl}</p>
                    <p className={`mt-1 text-xl font-semibold ${totalPnl >= 0 ? 'text-success-400' : 'text-danger-400'}`}>
                        {totalPnl >= 0 ? '+' : ''}{totalPnl.toLocaleString()} KRW
                    </p>
                </div>
                <div className="glass-card p-4">
                    <p className="text-xs text-ink-500">{copy.totalTrades}</p>
                    <p className="mt-1 text-xl font-semibold text-ink-100">{trades.length}</p>
                </div>
                <div className="glass-card p-4">
                    <p className="text-xs text-ink-500">{copy.winningTrades}</p>
                    <p className="mt-1 text-xl font-semibold text-success-400">{wins}</p>
                </div>
                <div className="glass-card p-4">
                    <p className="text-xs text-ink-500">{copy.losingTrades}</p>
                    <p className="mt-1 text-xl font-semibold text-danger-400">{losses}</p>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/10 bg-ink-950/48">
                <table className="w-full min-w-[760px] text-sm">
                    <thead>
                        <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-ink-500">
                            {copy.headers.map((header) => (
                                <th
                                    key={header}
                                    className={`px-3 py-3 font-medium ${header === copy.headers[3] || header === copy.headers[4] || header === copy.headers[5] || header === copy.headers[6] ? 'text-right' : header === copy.headers[7] ? 'text-center' : 'text-left'}`}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {trades.map((trade) => (
                            <tr key={trade.id} className="border-b border-white/6 text-ink-300">
                                <td className="px-3 py-3 text-ink-400">{trade.time}</td>
                                <td className="px-3 py-3">
                                    <p className="font-medium text-ink-100">{trade.stock}</p>
                                    <p className="text-xs text-ink-500">{trade.code}</p>
                                </td>
                                <td className="px-3 py-3">
                                    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${trade.type === 'buy' ? 'bg-danger-500/14 text-danger-400' : 'bg-success-500/14 text-success-400'}`}>
                                        {trade.type === 'buy' ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                                        {trade.type === 'buy' ? copy.buy : copy.sell}
                                    </span>
                                </td>
                                <td className="px-3 py-3 text-right">{trade.price.toLocaleString()}</td>
                                <td className="px-3 py-3 text-right">{trade.quantity}</td>
                                <td className="px-3 py-3 text-right">{trade.total.toLocaleString()}</td>
                                <td className="px-3 py-3 text-right">
                                    {trade.pnl !== null ? (
                                        <div>
                                            <p className={trade.pnl > 0 ? 'text-success-400' : 'text-danger-400'}>
                                                {trade.pnl > 0 ? '+' : ''}{trade.pnl.toLocaleString()}
                                            </p>
                                            <p className={`text-xs ${trade.pnl > 0 ? 'text-success-400/70' : 'text-danger-400/70'}`}>{trade.pnlPercent}</p>
                                        </div>
                                    ) : (
                                        <span className="text-ink-500">-</span>
                                    )}
                                </td>
                                <td className="px-3 py-3 text-center">
                                    <span className="rounded-md bg-success-500/14 px-2 py-1 text-xs text-success-400">{copy.filled}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
