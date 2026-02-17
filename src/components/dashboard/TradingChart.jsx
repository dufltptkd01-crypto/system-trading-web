import React, { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'

function generateCandleData(count = 64) {
    const data = []
    let price = 72400

    for (let i = 0; i < count; i += 1) {
        const move = (Math.random() - 0.46) * 940
        const open = price
        const close = price + move
        const high = Math.max(open, close) + Math.random() * 520
        const low = Math.min(open, close) - Math.random() * 520
        const volume = 50000 + Math.random() * 120000
        data.push({ open, close, high, low, volume })
        price = close
    }

    return data
}

const content = {
    ko: {
        name: '삼성전자',
        open: '시가',
        high: '고가',
        low: '저가',
        close: '종가',
        ema: 'EMA 20',
        bull: '양봉',
        bear: '음봉',
    },
    en: {
        name: 'Samsung Electronics',
        open: 'Open',
        high: 'High',
        low: 'Low',
        close: 'Close',
        ema: 'EMA 20',
        bull: 'Bull candle',
        bear: 'Bear candle',
    },
}

export default function TradingChart() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

    const canvasRef = useRef(null)
    const [data] = useState(() => generateCandleData())
    const [hoveredCandle, setHoveredCandle] = useState(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return undefined

        const ctx = canvas.getContext('2d')

        const draw = () => {
            const dpr = window.devicePixelRatio || 1
            const width = canvas.offsetWidth
            const height = canvas.offsetHeight

            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            ctx.clearRect(0, 0, width, height)

            const padding = { top: 22, right: 20, bottom: 26, left: 66 }
            const chartHeight = height * 0.72
            const volumeHeight = height * 0.16
            const volumeTop = chartHeight + 18

            const chartWidth = width - padding.left - padding.right
            const candleWidth = chartWidth / data.length
            const bodyWidth = candleWidth * 0.58

            const allPrices = data.flatMap((d) => [d.high, d.low])
            const minPrice = Math.min(...allPrices)
            const maxPrice = Math.max(...allPrices)
            const priceRange = Math.max(maxPrice - minPrice, 1)
            const maxVolume = Math.max(...data.map((d) => d.volume))

            const priceToY = (price) => padding.top + (1 - (price - minPrice) / priceRange) * (chartHeight - padding.top - 10)
            const volumeToHeight = (volume) => (volume / maxVolume) * volumeHeight

            ctx.strokeStyle = 'rgba(170, 190, 219, 0.14)'
            ctx.lineWidth = 1

            for (let i = 0; i <= 5; i += 1) {
                const y = padding.top + ((chartHeight - padding.top - 10) / 5) * i
                ctx.beginPath()
                ctx.moveTo(padding.left, y)
                ctx.lineTo(width - padding.right, y)
                ctx.stroke()

                const label = maxPrice - (priceRange / 5) * i
                ctx.fillStyle = 'rgba(190, 205, 229, 0.45)'
                ctx.font = '10px "JetBrains Mono"'
                ctx.textAlign = 'right'
                ctx.fillText(`${Math.round(label).toLocaleString()} KRW`, padding.left - 9, y + 4)
            }

            const ema = []
            let emaPrev = data[0].close
            const smoothing = 2 / (20 + 1)

            data.forEach((candle) => {
                emaPrev = candle.close * smoothing + emaPrev * (1 - smoothing)
                ema.push(emaPrev)
            })

            ctx.beginPath()
            ema.forEach((val, index) => {
                const x = padding.left + index * candleWidth + candleWidth / 2
                const y = priceToY(val)
                if (index === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            })
            ctx.strokeStyle = 'rgba(58, 213, 193, 0.62)'
            ctx.lineWidth = 1.4
            ctx.stroke()

            data.forEach((candle, index) => {
                const x = padding.left + index * candleWidth + (candleWidth - bodyWidth) / 2
                const wickX = padding.left + index * candleWidth + candleWidth / 2
                const isUp = candle.close >= candle.open
                const candleColor = isUp ? '#27b36f' : '#ef5350'
                const alphaColor = isUp ? 'rgba(39, 179, 111, 0.2)' : 'rgba(239, 83, 80, 0.2)'

                ctx.strokeStyle = candleColor
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(wickX, priceToY(candle.high))
                ctx.lineTo(wickX, priceToY(candle.low))
                ctx.stroke()

                const bodyTop = priceToY(Math.max(candle.open, candle.close))
                const bodyBottom = priceToY(Math.min(candle.open, candle.close))
                const bodyHeight = Math.max(bodyBottom - bodyTop, 1)
                ctx.fillStyle = candleColor
                ctx.fillRect(x, bodyTop, bodyWidth, bodyHeight)

                const volumeBarHeight = volumeToHeight(candle.volume)
                ctx.fillStyle = alphaColor
                ctx.fillRect(x, volumeTop + volumeHeight - volumeBarHeight, bodyWidth, volumeBarHeight)
            })

            if (hoveredCandle !== null && data[hoveredCandle]) {
                const candle = data[hoveredCandle]
                const cursorX = padding.left + hoveredCandle * candleWidth + candleWidth / 2
                const labelY = priceToY(candle.close)

                ctx.setLineDash([4, 4])
                ctx.strokeStyle = 'rgba(255,255,255,0.2)'
                ctx.beginPath()
                ctx.moveTo(cursorX, padding.top)
                ctx.lineTo(cursorX, volumeTop + volumeHeight)
                ctx.stroke()
                ctx.setLineDash([])

                ctx.fillStyle = candle.close >= candle.open ? '#27b36f' : '#ef5350'
                ctx.fillRect(0, labelY - 10, padding.left - 5, 20)
                ctx.fillStyle = '#f8fbff'
                ctx.textAlign = 'right'
                ctx.font = 'bold 10px "JetBrains Mono"'
                ctx.fillText(`${Math.round(candle.close).toLocaleString()} KRW`, padding.left - 8, labelY + 3.5)
            }
        }

        draw()
        window.addEventListener('resize', draw)
        return () => window.removeEventListener('resize', draw)
    }, [data, hoveredCandle])

    const onMouseMove = (event) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left - 66
        const chartWidth = rect.width - 86
        const candleWidth = chartWidth / data.length
        const index = Math.floor(x / candleWidth)

        setHoveredCandle(index >= 0 && index < data.length ? index : null)
    }

    const activeCandle = hoveredCandle !== null && data[hoveredCandle]
        ? data[hoveredCandle]
        : data[data.length - 1]

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-center gap-5 text-sm">
                <div>
                    <p className="text-base font-semibold text-ink-100">{copy.name}</p>
                    <p className="text-xs text-ink-500">005930</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
                    <p className="text-ink-400">{copy.open} <span className="text-ink-200">{Math.round(activeCandle.open).toLocaleString()}</span></p>
                    <p className="text-ink-400">{copy.high} <span className="text-success-400">{Math.round(activeCandle.high).toLocaleString()}</span></p>
                    <p className="text-ink-400">{copy.low} <span className="text-danger-400">{Math.round(activeCandle.low).toLocaleString()}</span></p>
                    <p className="text-ink-400">{copy.close} <span className={activeCandle.close >= activeCandle.open ? 'text-success-400' : 'text-danger-400'}>{Math.round(activeCandle.close).toLocaleString()}</span></p>
                </div>
            </div>

            <canvas
                ref={canvasRef}
                className="w-full rounded-xl border border-white/10 bg-ink-950/58 cursor-crosshair"
                style={{ height: '430px' }}
                onMouseMove={onMouseMove}
                onMouseLeave={() => setHoveredCandle(null)}
            />

            <div className="mt-3 flex items-center gap-4 text-xs text-ink-500">
                <div className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-brand-400" />{copy.ema}</div>
                <div className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-success-500" />{copy.bull}</div>
                <div className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-danger-500" />{copy.bear}</div>
            </div>
        </div>
    )
}
