import { MENU } from './menu'

export type NavItem = {
  id: string
  label: string
}

export const INFO_SECTION_ID = 'infos'

export const NAV_ITEMS: NavItem[] = [
  ...MENU.map((category) => ({ id: category.id, label: category.shortTitle })),
  { id: INFO_SECTION_ID, label: 'Infos' },
]
