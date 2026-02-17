import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import Logo from '../components/brand/Logo.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

const content = {
    ko: {
        title: '로그인',
        subtitle: '트레이딩 워크스페이스에 접속하세요',
        email: '이메일',
        password: '비밀번호',
        remember: '로그인 상태 유지',
        forgot: '비밀번호 찾기',
        signIn: '로그인',
        signingIn: '로그인 중...',
        or: '또는',
        newTo: 'Alpha-ST가 처음이신가요?',
        createAccount: '계정 만들기',
        emailPlaceholder: 'name@example.com',
        passwordPlaceholder: '비밀번호를 입력하세요',
        errorRequired: '이메일과 비밀번호를 모두 입력하세요.',
        demoAlert: '데모 모드: 현재 빌드는 인증 백엔드가 연결되어 있지 않습니다.',
    },
    en: {
        title: 'Sign in',
        subtitle: 'Continue to your trading workspace',
        email: 'Email',
        password: 'Password',
        remember: 'Remember me',
        forgot: 'Forgot password?',
        signIn: 'Sign in',
        signingIn: 'Signing in...',
        or: 'or',
        newTo: 'New to Alpha-ST?',
        createAccount: 'Create an account',
        emailPlaceholder: 'name@example.com',
        passwordPlaceholder: 'Enter your password',
        errorRequired: 'Please enter both email and password.',
        demoAlert: 'Demo mode: backend authentication is not connected in this build yet.',
    },
}

export default function LoginPage() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        setError('')

        if (!email || !password) {
            setError(copy.errorRequired)
            return
        }

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            alert(copy.demoAlert)
        }, 1200)
    }

    return (
        <section className="relative flex min-h-screen items-center justify-center px-4 pb-16 pt-36 md:pt-40">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-brand-400/14 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-signal-400/10 blur-[130px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="mb-7 text-center">
                    <Link to="/" className="inline-flex items-center">
                        <Logo compact />
                    </Link>
                    <h1 className="mt-5 text-3xl font-semibold text-ink-100">{copy.title}</h1>
                    <p className="mt-2 text-[15px] text-ink-400">{copy.subtitle}</p>
                </div>

                <div className="glass-card p-6 sm:p-7">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <div className="rounded-lg border border-danger-500/35 bg-danger-500/10 px-3 py-2 text-sm text-danger-400">{error}</div>}

                        <div>
                            <label className="mb-1.5 block text-sm text-ink-300">{copy.email}</label>
                            <div className="relative">
                                <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder={copy.emailPlaceholder}
                                    className="field-input pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-ink-300">{copy.password}</label>
                            <div className="relative">
                                <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder={copy.passwordPlaceholder}
                                    className="field-input pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-ink-400">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(event) => setRememberMe(event.target.checked)}
                                    className="h-4 w-4 accent-brand-500"
                                />
                                {copy.remember}
                            </label>
                            <a href="#" className="text-brand-300 hover:text-brand-200">{copy.forgot}</a>
                        </div>

                        <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-60">
                            {isLoading ? copy.signingIn : copy.signIn}
                            {!isLoading && <ArrowRight size={16} />}
                        </button>
                    </form>

                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs text-ink-500">{copy.or}</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button className="btn-secondary text-sm">Google</button>
                        <button className="btn-secondary text-sm">GitHub</button>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-ink-400">
                    {copy.newTo}{' '}
                    <Link to="/signup" className="font-medium text-brand-300 hover:text-brand-200">
                        {copy.createAccount}
                    </Link>
                </p>
            </div>
        </section>
    )
}
