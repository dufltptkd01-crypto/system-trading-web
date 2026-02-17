import React from 'react'

export default function Logo({ compact = false, showSub = true, className = '' }) {
    return (
        <span className={`logo-mark ${compact ? 'logo-mark-sm' : ''} ${className}`.trim()}>
            <span className="logo-glyph" aria-hidden="true">A</span>
            <span>
                <span className="logo-name">
                    Alpha-<span className="logo-name-accent">ST</span>
                </span>
                {showSub && <span className="logo-sub">system trading</span>}
            </span>
        </span>
    )
}
