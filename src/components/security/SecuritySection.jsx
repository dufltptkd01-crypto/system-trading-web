import React from 'react'
import { Eye, Globe, KeyRound, ShieldAlert } from 'lucide-react'
import { useI18n } from '../../i18n/I18nContext.jsx'

const content = {
    ko: {
        chip: '보안 신뢰',
        title: '신뢰는 기술이 아니라',
        titleAccent: '기본 설계에서 시작됩니다',
        description: 'Alpha-ST는 자동매매 편의성보다 자산 보호를 우선하는 금융 서비스 기준을 따릅니다.',
        principleLabel: 'Security Principle',
        principleTitle: '거래 권한만 사용하고 출금 권한은 허용하지 않습니다.',
        principleDescription: '최소 권한 원칙으로 설계하여 계정 노출 리스크를 구조적으로 줄입니다.',
        items: [
            {
                icon: KeyRound,
                title: 'API 키 암호화 저장',
                description: 'API 키와 시크릿은 저장 시점부터 암호화되며 평문으로 노출되지 않습니다.',
                badge: 'AES-256',
            },
            {
                icon: Eye,
                title: '출금 권한 불필요',
                description: '시스템은 매매 권한만 필요로 하며 출금 권한을 요구하지 않습니다.',
                badge: 'Trade-only',
            },
            {
                icon: Globe,
                title: 'IP 제한 권장',
                description: '거래소 IP 화이트리스트 설정과 함께 사용할 때 보안 수준이 크게 향상됩니다.',
                badge: 'IP Guard',
            },
            {
                icon: ShieldAlert,
                title: '리스크 관리 기능',
                description: '일일 손실 제한, 연속 손실 중지, 자동 일시정지 등 방어 기능이 기본 제공됩니다.',
                badge: 'Risk Engine',
            },
        ],
    },
    en: {
        chip: 'Security trust',
        title: 'Trust starts from',
        titleAccent: 'secure-by-default architecture',
        description: 'Alpha-ST follows financial-grade controls where capital protection comes before convenience.',
        principleLabel: 'Security Principle',
        principleTitle: 'Trade permission only. Withdrawal permission is never required.',
        principleDescription: 'Least-privilege access reduces account exposure and limits blast radius.',
        items: [
            {
                icon: KeyRound,
                title: 'Encrypted API key storage',
                description: 'API credentials are encrypted at rest and are never exposed as plaintext.',
                badge: 'AES-256',
            },
            {
                icon: Eye,
                title: 'No withdrawal scope',
                description: 'The system only needs trading permission and does not require withdrawal rights.',
                badge: 'Trade-only',
            },
            {
                icon: Globe,
                title: 'IP restriction recommended',
                description: 'Works cleanly with exchange IP allowlists for tighter account-level security.',
                badge: 'IP Guard',
            },
            {
                icon: ShieldAlert,
                title: 'Built-in risk controls',
                description: 'Daily loss caps, consecutive-stop logic, and automatic pauses are included by default.',
                badge: 'Risk Engine',
            },
        ],
    },
}

export default function SecuritySection() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

    return (
        <section id="security" className="relative overflow-hidden py-24 md:py-32">
            <div className="pointer-events-none absolute right-0 top-16 h-80 w-80 rounded-full bg-brand-400/10 blur-[130px]" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-72 w-72 rounded-full bg-signal-400/10 blur-[120px]" />

            <div className="container-custom relative z-10">
                <div className="mx-auto mb-12 max-w-3xl text-center">
                    <span className="chip border-brand-400/35 text-brand-300">{copy.chip}</span>
                    <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink-100 md:text-5xl">
                        {copy.title}
                        <span className="gradient-text block">{copy.titleAccent}</span>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-ink-300 md:text-lg">
                        {copy.description}
                    </p>
                </div>

                <div className="gradient-border mb-8 rounded-2xl">
                    <div className="glass-card rounded-2xl p-6 text-center md:p-8">
                        <p className="text-xs uppercase tracking-[0.2em] text-brand-300">{copy.principleLabel}</p>
                        <h3 className="mt-3 text-2xl font-semibold text-ink-100">{copy.principleTitle}</h3>
                        <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-300">
                            {copy.principleDescription}
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    {copy.items.map((item) => {
                        const Icon = item.icon
                        return (
                            <article key={item.title} className="glass-card glass-card-hover p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="inline-flex rounded-lg bg-brand-500/16 p-2 text-brand-300 border border-brand-400/25">
                                        <Icon size={18} />
                                    </div>
                                    <span className="rounded-md border border-brand-400/28 bg-brand-500/10 px-2 py-1 text-[11px] text-brand-300">
                                        {item.badge}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-ink-100">{item.title}</h3>
                                <p className="mt-2 text-[15px] leading-relaxed text-ink-300">{item.description}</p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

