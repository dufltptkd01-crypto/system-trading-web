import React from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'

export default function Logo({ compact = false, showSub = true, className = '' }) {
    const { locale } = useI18n()
    const subtitle = locale === 'ko' ? 'system trading' : 'system trading'

    return (
        <span className={`logo-mark ${compact ? 'logo-mark-sm' : ''} ${className}`.trim()}>
            <span className="logo-glyph" aria-hidden="true">A</span>
            <span>
                <span className="logo-name">
                    Alpha-<span className="logo-name-accent">ST</span>
                </span>
                {showSub && <span className="logo-sub">{subtitle}</span>}
            </span>
        </span>
    )
}
