import { FinalCall } from './components/final-call'
import { Hero } from './components/hero'
import { MenuSection } from './components/menu-section'
import { PracticalInfo } from './components/practical-info'
import { SiteHeader } from './components/site-header'
import { MENU } from './data/menu'

export const App = () => (
  <>
    <a className="skip-link" href="#entremets">
      Aller à la carte
    </a>
    <SiteHeader />
    <main>
      <Hero />
      {MENU.map((category) => (
        <MenuSection key={category.id} category={category} />
      ))}
      <PracticalInfo />
    </main>
    <FinalCall />
  </>
)
