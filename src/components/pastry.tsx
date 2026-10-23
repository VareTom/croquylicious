import { clsx } from 'clsx'
import { useId, type CSSProperties } from 'react'
import type { Product } from '../data/menu'
import { usePopover } from '../hooks/use-popover'
import { ILLUSTRATIONS } from './illustrations'
import { PastryPopup } from './pastry-popup'

type PastryProps = {
  product: Product
}

const PastryPhoto = ({ product }: PastryProps) => (
  <img
    className="pastry__photo"
    src={product.image.src}
    width={product.image.width}
    height={product.image.height}
    alt={product.name}
    loading="lazy"
    decoding="async"
  />
)

/** One pastry on its plate, with the price label set in front of it like in a shop window. */
export const Pastry = ({ product }: PastryProps) => {
  const popupId = useId()
  const { isOpen, close, rootProps, triggerProps } = usePopover<HTMLElement>()
  const Illustration = ILLUSTRATIONS[product.id]
  const frameStyle = { '--photo-width': `${product.image.width}px` } as CSSProperties

  return (
    <article className={clsx('pastry', isOpen && 'pastry--open')} {...(Illustration ? rootProps : {})}>
      <div className="pastry__stage">
        {Illustration ? (
          <button
            type="button"
            className="pastry__frame pastry__trigger"
            style={frameStyle}
            aria-controls={isOpen ? popupId : undefined}
            aria-label={`Voir ${product.name} en vrai`}
            {...triggerProps}
          >
            <Illustration label={`Illustration : ${product.name}`} />
            <span className="pastry__hint" aria-hidden="true">
              Voir en vrai
            </span>
          </button>
        ) : (
          <span className="pastry__frame" style={frameStyle}>
            <PastryPhoto product={product} />
          </span>
        )}
        {Illustration && isOpen && (
          <PastryPopup id={popupId} product={product} Illustration={Illustration} onClose={close} />
        )}
      </div>
      <div className="label">
        <h3 className="label__name">{product.name}</h3>
        <span className="label__price">{product.price}</span>
        {product.badge && <span className="label__badge">{product.badge}</span>}
        <p className="label__desc">{product.description}</p>
        {product.note && <p className="label__note">{product.note}</p>}
      </div>
    </article>
  )
}
