import { INFO_SECTION_ID } from '../data/navigation'
import { PRACTICAL_INFO } from '../data/site'

export const PracticalInfo = () => (
  <section className="info" id={INFO_SECTION_ID} aria-labelledby="info-title">
    <img
      className="info__photo"
      src="/images/photo-commandes-large.jpg"
      width={1220}
      height={410}
      alt="Des commandes prêtes à partir : choux, carrés chocolat, tarte meringuée et bûches dans leurs boîtes"
      loading="lazy"
    />
    <div className="info__body">
      <h2 id="info-title" className="display info__title">
        Avant de commander
      </h2>
      <dl className="info__list">
        {PRACTICAL_INFO.map((item) => (
          <div key={item.title} className="info__item">
            <dt>{item.title}</dt>
            <dd>{item.body}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
)
