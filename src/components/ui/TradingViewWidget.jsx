import React, { useEffect, useRef } from 'react'

export default function TradingViewWidget({ symbol = 'BINANCE:BTCUSDT', height = 500, theme = 'dark' }) {
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return

        containerRef.current.innerHTML = ''

        const script = document.createElement('script')
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
        script.type = 'text/javascript'
        script.async = true
        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: symbol,
            interval: '15',
            timezone: 'Asia/Seoul',
            theme: theme,
            style: '1',
            locale: 'kr',
            enable_publishing: false,
            allow_symbol_change: true,
            hide_side_toolbar: false,
            studies: ['RSI@tv-basicstudies', 'MASimple@tv-basicstudies', 'MACD@tv-basicstudies'],
            support_host: 'https://www.tradingview.com',
        })

        containerRef.current.appendChild(script)

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = ''
            }
        }
    }, [symbol, theme])

    return (
        <div className="tradingview-widget-container rounded-xl overflow-hidden border border-white/5" style={{ height: `${height}px` }}>
            <div ref={containerRef} style={{ height: '100%', width: '100%' }} className="tradingview-widget-container__widget" />
        </div>
    )
}
