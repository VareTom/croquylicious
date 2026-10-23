import { useEffect, useState } from 'react'

/** A thin band across the middle of the viewport: the section crossing it is the one being read. */
const READING_BAND = '-45% 0px -50% 0px'

export const useActiveSection = (ids: readonly string[]) => {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: READING_BAND },
    )
    ids.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}
