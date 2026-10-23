import { InstagramLink } from './instagram-link'

export const Hero = () => (
  <section className="hero" id="top" aria-labelledby="hero-title">
    <div className="hero__copy">
      <h1 id="hero-title" className="display hero__title">
        <span>Croquy</span>
        <span>licious</span>
      </h1>
      <p className="hero__lede">
        Pâtisserie maison à Mons. Entremets, tartes, choux et bûches de saison, préparés le week-end sur commande.
      </p>
      <div className="hero__actions">
        <a className="btn btn--ghost" href="#entremets">
          Voir la carte
        </a>
        <InstagramLink />
      </div>
    </div>
    <figure className="hero__visual">
      <img
        className="hero__photo"
        src="/images/photo-tarte-citron.jpg"
        width={1080}
        height={710}
        alt="Tarte citron meringuée, meringue italienne en vagues et zestes de citron vert"
        fetchPriority="high"
      />
      <figcaption className="hero__stamp">
        <span>Ma signature</span>
        <strong>Citron meringuée</strong>
      </figcaption>
      <img className="hero__cat" src="/images/logo.png" alt="" width={285} height={249} />
    </figure>
  </section>
)
