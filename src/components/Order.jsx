import { restaurant } from "../data/menu";
import { useReveal } from "../utils/useReveal";

export default function Order() {
  const [ref, visible] = useReveal();

  const modes = [
    {
      icon: "🛎️",
      title: "Sur place",
      text: "Rien ne vaut une pizza qui sort du four. Quelques places au comptoir de la cabane.",
      cta: null,
    },
    {
      icon: "📞",
      title: "À emporter",
      text: "Appelez, on prépare, vous passez la chercher. Le plus rapide et sans commission.",
      cta: { label: `Appeler · ${restaurant.phone}`, href: `tel:${restaurant.phoneRaw}`, primary: true },
    },
    {
      icon: "🛵",
      title: "En livraison",
      text: "Livré chez vous dans le 77 via Uber Eats.",
      cta: { label: "Commander sur Uber Eats", href: restaurant.uberEats, primary: false, external: true },
    },
  ];

  return (
    <section id="commander" className="order">
      <div ref={ref} className={`wrap reveal ${visible ? "is-visible" : ""}`}>
        <span className="eyebrow">Commander</span>
        <h2 className="section-title">Trois façons de se régaler</h2>

        <div className="order__grid">
          {modes.map((m) => (
            <div key={m.title} className="order__card">
              <span className="order__icon" aria-hidden="true">{m.icon}</span>
              <h3 className="order__title">{m.title}</h3>
              <p className="order__text">{m.text}</p>
              {m.cta && (
                <a
                  href={m.cta.href}
                  target={m.cta.external ? "_blank" : undefined}
                  rel={m.cta.external ? "noreferrer" : undefined}
                  className={`btn ${m.cta.primary ? "btn-primary" : "btn-ghost"} order__cta`}
                >
                  {m.cta.label}
                </a>
              )}
            </div>
          ))}
        </div>

        <p className="order__backup">
          Ligne occupée ? Numéro de secours :{" "}
          <a href={`tel:${restaurant.phoneBackupRaw}`}>{restaurant.phoneBackup}</a>
        </p>
      </div>
    </section>
  );
}
