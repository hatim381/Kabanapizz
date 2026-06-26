import { restaurant } from "../data/menu";
import { getOpenStatus } from "../utils/hours";

export default function Hero() {
  const status = getOpenStatus();

  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="wrap hero__inner">
        <div className="hero__content">
          <span className="eyebrow">Kiosque à pizza · Brie-Comte-Robert</span>
          <h1 className="hero__title">
            La pizza<br />
            de la <span className="hero__accent">cabane</span>,<br />
            cuite au feu.
          </h1>
          <p className="hero__lead">{restaurant.description}</p>

          <div className="hero__actions">
            <a href={`tel:${restaurant.phoneRaw}`} className="btn btn-primary">
              📞 {restaurant.phone}
            </a>
            <a href="#menu" className="btn btn-ghost">
              Voir la carte
            </a>
          </div>

          <div className="hero__meta">
            <span className={`status-pill ${status.open ? "status-pill--open" : "status-pill--closed"}`}>
              <span className="status-dot" aria-hidden="true" />
              {status.open ? `${status.label} · jusqu'à ${status.until}` : status.opensAt ? `Ferme · ouvre à ${status.opensAt}` : status.label}
            </span>
            <span className="hero__rating">★★★★★ <em>· avis vérifiés Google &amp; Facebook</em></span>
          </div>
        </div>

        <div className="hero__card" aria-hidden="true">
          <div className="hero__pizza">
            <div className="hero__pizza-glow" />
            <span className="hero__pizza-emoji">🍕</span>
          </div>
          <div className="hero__price-tag">
            <span>dès</span>
            <strong>9,50 €</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
