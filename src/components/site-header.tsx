import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'
import { NAV_ITEMS } from '../data/navigation'
import { useActiveSection } from '../hooks/use-active-section'
import { useScrolled } from '../hooks/use-scrolled'
import { InstagramLink } from './instagram-link'

const HERO_ID = 'top'
const SPY_IDS = [HERO_ID, ...NAV_ITEMS.map((item) => item.id)]
const SOLID_AFTER_PX = 8

export const SiteHeader = () => {
  const active = useActiveSection(SPY_IDS)
  const scrolled = useScrolled(SOLID_AFTER_PX)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = listRef.current
    const current = list?.querySelector<HTMLElement>('[aria-current]')
    if (!list || !current) return
    list.scrollTo({ left: current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2, behavior: 'smooth' })
  }, [active])

  return (
    <header className={clsx('site-header', scrolled && 'site-header--solid')}>
      <a className="site-header__brand" href={`#${HERO_ID}`}>
        <img src="/images/logo.png" alt="" width={285} height={249} />
        <span className="site-header__name">Croquylicious</span>
      </a>
      <nav className="site-nav" aria-label="La carte">
        <ul ref={listRef} className="site-nav__list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                className="site-nav__link"
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <InstagramLink variant="compact" label="Commander" className="site-header__cta" />
    </header>
  )
}
