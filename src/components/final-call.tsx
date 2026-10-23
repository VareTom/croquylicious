import { INSTAGRAM_HANDLE } from '../data/site'
import { InstagramLink } from './instagram-link'

export const FinalCall = () => (
  <footer className="final">
    <div className="final__inner">
      <img className="final__cat" src="/images/logo.png" alt="" width={285} height={249} loading="lazy" />
      <h2 className="display final__title">Une envie ?</h2>
      <p>
        Toutes les commandes passent par message privé sur {INSTAGRAM_HANDLE}. Dites-moi ce qui vous fait envie, pour
        combien de personnes et pour quel week-end.
      </p>
      <InstagramLink />
    </div>
    <p className="final__legal">Croquylicious, pâtisserie maison à Mons</p>
  </footer>
)
