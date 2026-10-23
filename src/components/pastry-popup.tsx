import { useLayoutEffect, useRef, type ComponentType } from 'react'
import type { Product } from '../data/menu'
import type { IllustrationProps } from './illustrations/parts'

const VIEWPORT_MARGIN = 12

type PastryPopupProps = {
  id: string
  product: Product
  Illustration: ComponentType<IllustrationProps>
  onClose: () => void
}

/** The real photo next to its drawing, so the illustration on the shelf can be matched with the actual cake. */
export const PastryPopup = ({ id, product, Illustration, onClose }: PastryPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const popup = popupRef.current
    if (!popup) return
    popup.style.setProperty('--shift', '0px')
    const { left, right } = popup.getBoundingClientRect()
    const overflowLeft = VIEWPORT_MARGIN - left
    const overflowRight = right - (window.innerWidth - VIEWPORT_MARGIN)
    const shift = overflowLeft > 0 ? overflowLeft : overflowRight > 0 ? -overflowRight : 0
    popup.style.setProperty('--shift', `${shift}px`)
  }, [])

  const { image } = product
  return (
    <div ref={popupRef} id={id} className="popup" role="group" aria-label={`${product.name} en vrai`}>
      <div className="popup__visuals">
        <figure className="popup__tile popup__tile--photo">
          <img src={image.src} width={image.width} height={image.height} alt={`Photo : ${product.name}`} />
          <figcaption>En vrai</figcaption>
        </figure>
        <figure className="popup__tile">
          <Illustration label={`Illustration : ${product.name}`} />
          <figcaption>En dessin</figcaption>
        </figure>
      </div>
      <div className="popup__text">
        <h4 className="popup__name">{product.name}</h4>
        <span className="popup__price">{product.price}</span>
      </div>
      <p className="popup__desc">{product.description}</p>
      <button type="button" className="popup__close" onClick={onClose} aria-label="Fermer">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  )
}
