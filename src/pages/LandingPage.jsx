import React from 'react'
import HeroSection from '../components/hero/HeroSection.jsx'
import FeaturesSection from '../components/features/FeaturesSection.jsx'
import HowItWorksSection from '../components/howitworks/HowItWorksSection.jsx'
import DashboardPreview from '../components/dashboard/DashboardPreview.jsx'
import SecuritySection from '../components/security/SecuritySection.jsx'
import PricingSection from '../components/pricing/PricingSection.jsx'
import FAQSection from '../components/faq/FAQSection.jsx'

export default function LandingPage() {
    return (
        <main className="pt-[88px]">
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <DashboardPreview />
            <SecuritySection />
            <PricingSection />
            <FAQSection />
        </main>
    )
}
