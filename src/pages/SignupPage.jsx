import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import Logo from '../components/brand/Logo.jsx'

export default function SignupPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        agreeTerms: false,
        agreePrivacy: false,
    })

    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const updateField = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }))
        }
    }

    const validate = () => {
        const next = {}

        if (!form.name.trim()) next.name = 'Enter your name.'
        if (!form.email.trim()) next.email = 'Enter your email.'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Invalid email format.'

        if (!form.password) next.password = 'Enter a password.'
        else if (form.password.length < 8) next.password = 'Use at least 8 characters.'

        if (form.password !== form.passwordConfirm) next.passwordConfirm = 'Passwords do not match.'
        if (!form.agreeTerms) next.agreeTerms = 'You must agree to the terms.'
        if (!form.agreePrivacy) next.agreePrivacy = 'You must agree to the privacy policy.'

        return next
    }

    const getPasswordStrength = () => {
        const pwd = form.password
        if (!pwd) return { level: 0, text: '', className: '' }

        let score = 0
        if (pwd.length >= 8) score += 1
        if (pwd.length >= 12) score += 1
        if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1
        if (/\d/.test(pwd)) score += 1
        if (/[^A-Za-z0-9]/.test(pwd)) score += 1

        if (score <= 2) return { level: 1, text: 'Weak', className: 'bg-danger-500 text-danger-400' }
        if (score <= 3) return { level: 2, text: 'Medium', className: 'bg-signal-500 text-signal-400' }
        return { level: 3, text: 'Strong', className: 'bg-success-500 text-success-400' }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        const nextErrors = validate()

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors)
            return
        }

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            alert('Demo mode: signup backend is not connected in this build yet.')
        }, 1200)
    }

    const strength = getPasswordStrength()

    return (
        <section className="relative flex min-h-screen items-center justify-center px-4 pb-14 pt-32 md:pt-36">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-brand-400/14 blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-signal-400/10 blur-[130px]" />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="mb-7 text-center">
                    <Link to="/" className="inline-flex items-center">
                        <Logo compact />
                    </Link>
                    <h1 className="mt-5 text-2xl font-semibold text-ink-100">Create account</h1>
                    <p className="mt-1 text-sm text-ink-400">Build your personal AI trading workspace</p>
                </div>

                <div className="glass-card p-6 sm:p-7">
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm text-ink-300">Name</label>
                            <div className="relative">
                                <User size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(event) => updateField('name', event.target.value)}
                                    placeholder="Your name"
                                    className="field-input pl-10"
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-xs text-danger-400">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-ink-300">Email</label>
                            <div className="relative">
                                <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(event) => updateField('email', event.target.value)}
                                    placeholder="name@example.com"
                                    className="field-input pl-10"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-danger-400">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-ink-300">Password</label>
                            <div className="relative">
                                <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(event) => updateField('password', event.target.value)}
                                    placeholder="At least 8 characters"
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

                            {form.password && (
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex flex-1 gap-1">
                                        {[1, 2, 3].map((index) => (
                                            <span
                                                key={index}
                                                className={`h-1.5 flex-1 rounded-full ${
                                                    index <= strength.level ? strength.className.split(' ')[0] : 'bg-white/10'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <span className={`text-xs ${strength.className.split(' ')[1] || 'text-ink-500'}`}>{strength.text}</span>
                                </div>
                            )}
                            {errors.password && <p className="mt-1 text-xs text-danger-400">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-ink-300">Confirm password</label>
                            <div className="relative">
                                <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type="password"
                                    value={form.passwordConfirm}
                                    onChange={(event) => updateField('passwordConfirm', event.target.value)}
                                    placeholder="Re-enter your password"
                                    className="field-input pl-10 pr-10"
                                />
                                {form.passwordConfirm && form.password === form.passwordConfirm && (
                                    <Check size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-success-400" />
                                )}
                            </div>
                            {errors.passwordConfirm && <p className="mt-1 text-xs text-danger-400">{errors.passwordConfirm}</p>}
                        </div>

                        <div className="space-y-2 pt-1 text-sm text-ink-400">
                            <label className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    checked={form.agreeTerms}
                                    onChange={(event) => updateField('agreeTerms', event.target.checked)}
                                    className="mt-1 h-4 w-4 accent-brand-500"
                                />
                                <span>
                                    I agree to the <Link to="/terms" target="_blank" className="text-brand-300 hover:text-brand-200">Terms</Link>.
                                </span>
                            </label>
                            {errors.agreeTerms && <p className="ml-6 text-xs text-danger-400">{errors.agreeTerms}</p>}

                            <label className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    checked={form.agreePrivacy}
                                    onChange={(event) => updateField('agreePrivacy', event.target.checked)}
                                    className="mt-1 h-4 w-4 accent-brand-500"
                                />
                                <span>
                                    I agree to the <Link to="/privacy" target="_blank" className="text-brand-300 hover:text-brand-200">Privacy Policy</Link>.
                                </span>
                            </label>
                            {errors.agreePrivacy && <p className="ml-6 text-xs text-danger-400">{errors.agreePrivacy}</p>}
                        </div>

                        <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-60">
                            {isLoading ? 'Creating account...' : 'Create account'}
                            {!isLoading && <ArrowRight size={16} />}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-ink-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-brand-300 hover:text-brand-200">
                        Sign in
                    </Link>
                </p>
            </div>
        </section>
    )
}
