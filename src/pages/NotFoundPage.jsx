// pages/NotFoundPage.jsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useSeo from '../hooks/useSeo'

export default function NotFoundPage() {
  const { t } = useTranslation()
  useSeo('notFound')

  return (
    <main
      id="main-content"
      className="flex-grow flex items-center justify-center pt-[120px] pb-[160px] px-6"
    >
      <div className="text-center max-w-xl mx-auto">
        <span className="material-symbols-outlined text-[64px] text-[#ffb4ab] mb-4" aria-hidden="true">
          error
        </span>
        <h1 className="font-['Sora'] text-3xl font-bold text-[#e2dfff] mb-4">
          {t('notFoundPage.title')}
        </h1>
        <p className="font-['Inter'] text-[#c9c5d0] mb-8">
          {t('notFoundPage.text')}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#b7aee6] text-[#474070] font-['Geist'] text-[14px] font-semibold px-8 py-3 rounded-full hover:shadow-lg transition-all"
        >
          {t('notFoundPage.backHome')}
        </Link>
      </div>
    </main>
  )
}
