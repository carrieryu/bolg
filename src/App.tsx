import { useCallback, useMemo, useState } from 'react'
import { getEffectsConfig } from './config/effects'
import { guideTips } from './data/site'
import type { SectionId } from './data/site'
import KnockGate from './components/KnockGate'
import MouseTrail from './components/MouseTrail'
import GuideAvatar from './components/GuideAvatar'
import BlogSections from './components/BlogSections'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>('hero')
  const effects = useMemo(() => getEffectsConfig(), [])

  const guideMessage = guideTips[activeSection] ?? guideTips.default

  const handleSectionChange = useCallback((sectionId: string) => {
    if (sectionId in guideTips) {
      setActiveSection(sectionId as SectionId)
    }
  }, [])

  if (!entered) {
    return (
      <KnockGate onEnter={() => setEntered(true)} />
    )
  }

  return (
    <>
      <MouseTrail config={effects} />
      <BlogSections onSectionChange={handleSectionChange} />
      <GuideAvatar config={effects} message={guideMessage} />
    </>
  )
}
