// App.jsx — root layout wrapper
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ScrollToTop from './components/layout/ScrollToTop'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
// Code-split: the case study experience (incl. framer-motion) loads on demand
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'))

export default function App() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden antialiased">
      {/* Skip-to-main for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#b7aee6] focus:text-[#474070] focus:rounded-lg focus:text-sm focus:font-medium"
      >
        {t('nav.skipToMain')}
      </a>

      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route
          path="/portfolio/:projectId"
          element={
            <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
              <CaseStudyPage />
            </Suspense>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
