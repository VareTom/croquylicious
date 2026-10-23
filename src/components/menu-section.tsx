import { clsx } from 'clsx'
import type { Category } from '../data/menu'
import { ChouxBox } from './choux-box'
import { Pastry } from './pastry'

type MenuSectionProps = {
  category: Category
}

export const MenuSection = ({ category }: MenuSectionProps) => {
  const titleId = `${category.id}-title`
  return (
    <section id={category.id} className={clsx('menu', `menu--${category.tone}`)} aria-labelledby={titleId}>
      <div className="menu__inner">
        <header className="menu__head">
          <h2 id={titleId} className="display menu__title">
            {category.title}
          </h2>
          {category.badge && <span className="menu__badge">{category.badge}</span>}
          <p className="menu__intro">{category.intro}</p>
        </header>
        {category.display === 'box' ? (
          <ChouxBox products={category.products} />
        ) : (
          <ul className="menu__shelf">
            {category.products.map((product) => (
              <li key={product.id}>
                <Pastry product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
