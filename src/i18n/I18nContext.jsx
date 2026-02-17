import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const I18nContext = createContext(null)

const STORAGE_KEY = 'alpha-st-locale'
const SUPPORTED_LOCALES = ['ko', 'en']

function getInitialLocale() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED_LOCALES.includes(stored)) {
        return stored
    }
    return 'ko'
}

export function I18nProvider({ children }) {
    const [locale, setLocale] = useState(getInitialLocale)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, locale)
        document.documentElement.lang = locale
    }, [locale])

    const value = useMemo(() => ({
        locale,
        setLocale,
        t: (dictionary) => dictionary?.[locale] ?? dictionary?.ko ?? dictionary?.en ?? '',
    }), [locale])

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    const context = useContext(I18nContext)
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider.')
    }
    return context
}
