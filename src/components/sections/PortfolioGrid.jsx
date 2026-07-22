// components/sections/PortfolioGrid.jsx
import { useTranslation } from 'react-i18next'
import PortfolioCard from '../ui/PortfolioCard'
import { PORTFOLIO_PROJECTS } from '../../constants/data'

export default function PortfolioGrid() {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-[24px] relative z-10">
      {PORTFOLIO_PROJECTS.map(({ tagColors, stat, ...project }) => {
        const card = t(`portfolioGrid.cards.${project.id}`, { returnObjects: true })
        const tags = (card.tags || []).map((label, i) => ({
          label,
          color: tagColors[i] ?? 'primary',
        }))
        return (
          <PortfolioCard
            key={project.id}
            {...project}
            title={card.title}
            subtitle={card.subtitle}
            tags={tags}
            stat={stat ? { ...stat, label: card.statLabel } : undefined}
          />
        )
      })}
    </div>
  )
}
