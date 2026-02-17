import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import TermsPage from './pages/TermsPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import UpbitTradingPage from './pages/UpbitTradingPage.jsx'
import BinanceTradingPage from './pages/BinanceTradingPage.jsx'
import StockRecommendationPage from './pages/StockRecommendationPage.jsx'

function App() {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    return (
        <div className={`min-h-screen bg-ink-950 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/trading/upbit" element={<UpbitTradingPage />} />
                <Route path="/trading/binance" element={<BinanceTradingPage />} />
                <Route path="/recommendations" element={<StockRecommendationPage />} />
                <Route path="/dashboard" element={<LandingPage />} />
                <Route path="*" element={<LandingPage />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
