import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import Logo from '../components/brand/Logo.jsx'
import { useI18n } from '../i18n/I18nContext.jsx'

const content = {
    ko: {
        title: '계정 만들기',
        subtitle: '개인 맞춤형 AI 자동매매 워크스페이스를 시작하세요',
        name: '이름',
        email: '이메일',
        password: '비밀번호',
        confirmPassword: '비밀번호 확인',
        submit: '계정 생성',
        submitting: '계정 생성 중...',
        agreeTermsPrefix: '',
        agreeTermsSuffix: '에 동의합니다.',
        agreePrivacyPrefix: '',
        agreePrivacySuffix: '에 동의합니다.',
        terms: '이용약관',
        privacy: '개인정보처리방침',
        already: '이미 계정이 있으신가요?',
        signIn: '로그인',
        namePlaceholder: '이름을 입력하세요',
        emailPlaceholder: 'name@example.com',
        passwordPlaceholder: '최소 8자 이상',
        confirmPlaceholder: '비밀번호를 다시 입력하세요',
        weak: '약함',
        medium: '보통',
        strong: '강함',
        errors: {
            name: '이름을 입력하세요.',
            emailRequired: '이메일을 입력하세요.',
            emailInvalid: '이메일 형식이 올바르지 않습니다.',
            passwordRequired: '비밀번호를 입력하세요.',
            passwordShort: '비밀번호는 8자 이상이어야 합니다.',
            passwordMismatch: '비밀번호가 일치하지 않습니다.',
            terms: '이용약관에 동의해야 합니다.',
            privacy: '개인정보처리방침에 동의해야 합니다.',
        },
        demoAlert: '데모 모드: 현재 빌드는 가입 백엔드가 연결되어 있지 않습니다.',
    },
    en: {
        title: 'Create account',
        subtitle: 'Build your personal AI trading workspace',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm password',
        submit: 'Create account',
        submitting: 'Creating account...',
        agreeTermsPrefix: 'I agree to the ',
        agreeTermsSuffix: '.',
        agreePrivacyPrefix: 'I agree to the ',
        agreePrivacySuffix: '.',
        terms: 'Terms',
        privacy: 'Privacy Policy',
        already: 'Already have an account?',
        signIn: 'Sign in',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'name@example.com',
        passwordPlaceholder: 'At least 8 characters',
        confirmPlaceholder: 'Re-enter your password',
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
        errors: {
            name: 'Enter your name.',
            emailRequired: 'Enter your email.',
            emailInvalid: 'Invalid email format.',
            passwordRequired: 'Enter a password.',
            passwordShort: 'Use at least 8 characters.',
            passwordMismatch: 'Passwords do not match.',
            terms: 'You must agree to the terms.',
            privacy: 'You must agree to the privacy policy.',
        },
        demoAlert: 'Demo mode: signup backend is not connected in this build yet.',
    },
}

export default function SignupPage() {
    const { locale } = useI18n()
    const copy = content[locale] || content.ko

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

        if (!form.name.trim()) next.name = copy.errors.name
        if (!form.email.trim()) next.email = copy.errors.emailRequired
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = copy.errors.emailInvalid

        if (!form.password) next.password = copy.errors.passwordRequired
        else if (form.password.length < 8) next.password = copy.errors.passwordShort

        if (form.password !== form.passwordConfirm) next.passwordConfirm = copy.errors.passwordMismatch
        if (!form.agreeTerms) next.agreeTerms = copy.errors.terms
        if (!form.agreePrivacy) next.agreePrivacy = copy.errors.privacy

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

        if (score <= 2) return { level: 1, text: copy.weak, className: 'bg-danger-500 text-danger-400' }
        if (score <= 3) return { level: 2, text: copy.medium, className: 'bg-signal-500 text-signal-400' }
        return { level: 3, text: copy.strong, className: 'bg-success-500 text-success-400' }
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
            alert(copy.demoAlert)
        }, 1200)
    }

    const strength = getPasswordStrength()

    return (
        <section className="relative flex min-h-screen items-center justify-center px-4 pb-16 pt-36 md:pt-40">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-brand-400/14 blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-signal-400/10 blur-[130px]" />
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
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm text-ink-300">{copy.name}</label>
                            <div className="relative">
                                <User size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(event) => updateField('name', event.target.value)}
                                    placeholder={copy.namePlaceholder}
                                    className="field-input pl-10"
                                />
                            </div>
                            {errors.name && <p className="mt-1 text-xs text-danger-400">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-ink-300">{copy.email}</label>
                            <div className="relative">
                                <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(event) => updateField('email', event.target.value)}
                                    placeholder={copy.emailPlaceholder}
                                    className="field-input pl-10"
                                />
                            </div>
                            {errors.email && <p className="mt-1 text-xs text-danger-400">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm text-ink-300">{copy.password}</label>
                            <div className="relative">
                                <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(event) => updateField('password', event.target.value)}
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
                            <label className="mb-1.5 block text-sm text-ink-300">{copy.confirmPassword}</label>
                            <div className="relative">
                                <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
                                <input
                                    type="password"
                                    value={form.passwordConfirm}
                                    onChange={(event) => updateField('passwordConfirm', event.target.value)}
                                    placeholder={copy.confirmPlaceholder}
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
                                    {copy.agreeTermsPrefix}
                                    <Link to="/terms" target="_blank" className="text-brand-300 hover:text-brand-200">{copy.terms}</Link>
                                    {copy.agreeTermsSuffix}
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
                                    {copy.agreePrivacyPrefix}
                                    <Link to="/privacy" target="_blank" className="text-brand-300 hover:text-brand-200">{copy.privacy}</Link>
                                    {copy.agreePrivacySuffix}
                                </span>
                            </label>
                            {errors.agreePrivacy && <p className="ml-6 text-xs text-danger-400">{errors.agreePrivacy}</p>}
                        </div>

                        <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-60">
                            {isLoading ? copy.submitting : copy.submit}
                            {!isLoading && <ArrowRight size={16} />}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-sm text-ink-400">
                    {copy.already}{' '}
                    <Link to="/login" className="font-medium text-brand-300 hover:text-brand-200">
                        {copy.signIn}
                    </Link>
                </p>
            </div>
        </section>
    )
}
