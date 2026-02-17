import React from 'react'

function isIgnorableError(error) {
    const message = String(error?.message || error || '')

    return message.includes('A listener indicated an asynchronous response by returning true')
}

export default class AppErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
            info: null,
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, info) {
        if (isIgnorableError(error)) {
            this.setState({ hasError: false, error: null, info: null })
            return
        }

        this.setState({ info })
        console.error('[AppErrorBoundary] Render crash captured:', error, info)
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, info: null })
    }

    render() {
        if (!this.state.hasError) {
            return this.props.children
        }

        const isDev = import.meta.env.DEV

        return (
            <section
                style={{
                    minHeight: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                    padding: '2rem',
                    background: '#0b1322',
                    color: '#e8efff',
                    fontFamily: 'Space Grotesk, Segoe UI, sans-serif',
                }}
            >
                <div style={{ maxWidth: '720px', width: '100%', background: '#111c30', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '16px', padding: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Something went wrong</h1>
                    <p style={{ color: '#a3b3ce', marginBottom: '1rem' }}>
                        The app hit an unexpected error. Try reloading the screen.
                    </p>

                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: isDev ? '1rem' : 0 }}>
                        <button
                            type="button"
                            onClick={this.handleRetry}
                            style={{
                                padding: '0.65rem 1rem',
                                borderRadius: '10px',
                                border: '1px solid rgba(93, 230, 205, 0.5)',
                                background: 'linear-gradient(120deg, #14a696, #1ec4b4)',
                                color: '#07211d',
                                fontWeight: 700,
                                cursor: 'pointer',
                            }}
                        >
                            Retry
                        </button>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            style={{
                                padding: '0.65rem 1rem',
                                borderRadius: '10px',
                                border: '1px solid rgba(173, 189, 215, 0.4)',
                                background: 'transparent',
                                color: '#e8efff',
                                cursor: 'pointer',
                            }}
                        >
                            Reload page
                        </button>
                    </div>

                    {isDev && (
                        <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto', padding: '0.9rem', borderRadius: '10px', background: '#0a1324', color: '#f2f7ff', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.78rem', lineHeight: 1.45 }}>
                            {String(this.state.error?.stack || this.state.error || 'Unknown error')}
                            {'\n\n'}
                            {String(this.state.info?.componentStack || '')}
                        </pre>
                    )}
                </div>
            </section>
        )
    }
}
