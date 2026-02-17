import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function LoginPage() {
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
            setError('Please enter both email and password.')
            return
        }

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            alert('Demo mode: backend authentication is not connected in this build yet.')
        }, 1200)
    }

    return (
        <section className="relative flex min-h-screen items-center justify-center px-4 pb-14 pt-28">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-brand-400/14 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-signal-400/10 blur-[130px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="mb-7 text-center">
                    <Link to="/" className="inline-flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-signal-500 text-xs font-bold text-ink-950">ST</div>
                        <div className="text-left">
                            <p className="text-base font-semibold text-ink-100 leading-none">Alpha-ST</p>
                            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-500">system trading</p>
                        </div>
                    </Link>
                    <h1 className="mt-5 text-2xl font-semibold text-ink-100">Sign in</h1>
                    <p className="mt-1 text-sm text-ink-400">Continue to your trading workspace</p>
                </div>

                <div className="glass-card p-6 sm:p-7">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && <div className="rounded-lg border border-danger-500/35 bg-danger-500/10 px-3 py-2 text-sm text-danger-400">{error}</div>}

                        <div>
                            <label className="mb-1.5 block text-sm text-ink-300">Email</label>
                            <div className="relative">
                                <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="name@example.com"
                                    className="field-input pl-10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-ink-300">Password</label>
                            <div className="relative">
                                <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Enter your password"
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
                                Remember me
                            </label>
                            <a href="#" className="text-brand-300 hover:text-brand-200">Forgot password?</a>
                        </div>

                        <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-60">
                            {isLoading ? 'Signing in...' : 'Sign in'}
                            {!isLoading && <ArrowRight size={16} />}
                        </button>
                    </form>

                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-xs text-ink-500">or</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button className="btn-secondary text-sm">Google</button>
                        <button className="btn-secondary text-sm">GitHub</button>
                    </div>
                </div>

                <p className="mt-6 text-center text-sm text-ink-400">
                    New to Alpha-ST?{' '}
                    <Link to="/signup" className="font-medium text-brand-300 hover:text-brand-200">
                        Create an account
                    </Link>
                </p>
            </div>
        </section>
    )
}
