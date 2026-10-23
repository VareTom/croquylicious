import type { Product } from '../data/menu'

type ChouxBoxProps = {
  products: Product[]
}

/** The choux laid out like the real order box: one cell per flavour. */
export const ChouxBox = ({ products }: ChouxBoxProps) => (
  <div className="choux">
    <ul className="choux__box">
      {products.map((product) => (
        <li key={product.id} className="choux__cell">
          <span className="choux__hollow">
            <img
              src={product.image.src}
              width={product.image.width}
              height={product.image.height}
              alt={`Chou ${product.name.toLowerCase()}`}
              loading="lazy"
              decoding="async"
            />
          </span>
          <h3 className="choux__name">{product.name}</h3>
          <p className="choux__desc">{product.description}</p>
        </li>
      ))}
    </ul>
    <img
      className="choux__photo"
      src="/images/photo-choux.jpg"
      width={1080}
      height={510}
      alt="Une boîte de choux craquelin assortis, garnis de ganache"
      loading="lazy"
    />
  </div>
)
