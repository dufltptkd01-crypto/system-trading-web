import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AppErrorBoundary from './components/common/AppErrorBoundary.jsx'
import { I18nProvider } from './i18n/I18nContext.jsx'
import './index.css'

function getBasename() {
    const base = import.meta.env.BASE_URL || '/'
    if (base === './' || base === '.') {
        return '/'
    }

    return base
}

function isIgnorableAsyncError(reason) {
    const message = String(reason?.message || reason || '')
    return message.includes('A listener indicated an asynchronous response by returning true')
}

function renderFatalFallback(root, error) {
    console.error('[bootstrap] Fatal mount error:', error)
    root.innerHTML = `
      <section style="min-height:100vh;display:grid;place-items:center;padding:2rem;background:#0b1322;color:#e8efff;font-family:'Noto Sans KR','Segoe UI',sans-serif;">
        <div style="max-width:720px;width:100%;background:#111c30;border:1px solid rgba(255,255,255,0.14);border-radius:16px;padding:1.5rem;">
          <h1 style="font-size:1.4rem;margin-bottom:0.5rem;">App failed to start</h1>
          <p style="color:#a3b3ce;margin-bottom:1rem;">The app could not mount. Try refreshing the page.</p>
          <button onclick="window.location.reload()" style="padding:0.65rem 1rem;border-radius:10px;border:1px solid rgba(93,230,205,0.5);background:linear-gradient(120deg,#14a696,#1ec4b4);color:#07211d;font-weight:700;cursor:pointer;">Reload page</button>
        </div>
      </section>
    `
}

window.addEventListener('error', (event) => {
    if (isIgnorableAsyncError(event.error || event.message)) return
    console.error('[window.error]', event.error || event.message)
})

window.addEventListener('unhandledrejection', (event) => {
    if (isIgnorableAsyncError(event.reason)) return
    console.error('[unhandledrejection]', event.reason)
})

const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element "#root" was not found.')
}

try {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <AppErrorBoundary>
                <BrowserRouter basename={getBasename()}>
                    <I18nProvider>
                        <App />
                    </I18nProvider>
                </BrowserRouter>
            </AppErrorBoundary>
        </React.StrictMode>,
    )
} catch (error) {
    renderFatalFallback(rootElement, error)
}
