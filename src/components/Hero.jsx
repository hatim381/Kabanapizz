import { restaurant, pizzaSizes } from "../data/menu";
import { getOpenStatus } from "../utils/hours";
import { useCart } from "../cart/CartContext";

export default function Hero() {
  const status = getOpenStatus();
  const { toggleCart } = useCart();
  const fromPrice = pizzaSizes[0].price.toFixed(2).replace(".", ",") + " €";

  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="wrap hero__inner">
        <div className="hero__content">
          <span className="eyebrow">Kiosque à pizza · Brie-Comte-Robert</span>
          <h1 className="hero__title">
            La pizza qui enflamme <span className="hero__accent">le 77</span>.
          </h1>
          <p className="hero__lead hero__lead--lg">
            Pâte fraîche pétrie le jour même. 22 recettes à emporter dès {fromPrice}.
          </p>

          <div className="hero__actions">
            <a href="#carte" className="btn btn-primary">
              Voir la carte →
            </a>
            <button type="button" className="btn btn-ghost" onClick={toggleCart}>
              Commander
            </button>
          </div>

          <div className="hero__stats">
            <span className={`status-pill ${status.open ? "status-pill--open" : "status-pill--closed"}`}>
              <span className="status-dot" aria-hidden="true" />
              {status.open
                ? `${status.label} · jusqu'à ${status.until} · prêt en ${status.prepTime}`
                : status.opensAt
                ? `Fermé · ouvre à ${status.opensAt}`
                : status.label}
            </span>
            <span className="hero__stat">
              <strong>4,8/5</strong> <em>120+ avis</em>
            </span>
            <span className="hero__stat">
              <strong>15-20 min</strong> <em>préparation</em>
            </span>
            <span className="hero__stat">
              <strong>77170</strong> <em>Brie-Comte-Robert</em>
            </span>
          </div>

          <p className="hero__hint">
            Menu, panier et commande WhatsApp ci-dessous ↓
          </p>
        </div>

        <div className="hero__card">
          <div className="hero__photo">
            <div className="hero__pizza-glow" aria-hidden="true" />
            <img
              src={restaurant.heroImage}
              alt="Le kiosque Kabana Pizz et son enseigne orange à Brie-Comte-Robert"
              className="hero__img"
              loading="eager"
            />
          </div>
          <div className="hero__price-tag" aria-hidden="true">
            <span>dès</span>
            <strong>{fromPrice}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
