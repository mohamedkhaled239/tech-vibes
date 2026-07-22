// components/casestudy/web/WebShowcase.tsx
// Orchestrates the immersive web-project presentation. Rendered ONLY for
// web-category case studies that carry `web` showcase data — mobile,
// branding and marketing projects keep their own experiences untouched.
//
//   FloatingScene      — browser windows at depth, cursor parallax
//   SectionJourney     — the site's sections as a scrolling story
//   ScrollThroughSite  — pinned browser that scrolls the site with you
//   CinematicHotspots  — keynote split with on-screen feature hotspots
//   WorkspaceScene     — editorial desk: palette, type, grid, code
//   DeviceMorph        — desktop → laptop → tablet → mobile morph
//   PerformancePanel   — animated Lighthouse scorecard

import type { CaseStudy } from '../../../types/caseStudy'
import FloatingScene from './FloatingScene'
import SectionJourney from './SectionJourney'
import ScrollThroughSite from './ScrollThroughSite'
import CinematicHotspots from './CinematicHotspots'
import WorkspaceScene from './WorkspaceScene'
import DeviceMorph from './DeviceMorph'
import PerformancePanel from './PerformancePanel'

export default function WebShowcase({ study }: { study: CaseStudy }) {
  return (
    <>
      <FloatingScene study={study} />
      <SectionJourney study={study} />
      <ScrollThroughSite study={study} />
      <CinematicHotspots study={study} />
      <WorkspaceScene study={study} />
      <DeviceMorph study={study} />
      <PerformancePanel study={study} />
    </>
  )
}
