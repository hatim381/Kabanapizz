import { restaurant, hours } from "../data/menu";
import { getOpenStatus } from "../utils/hours";
import { useReveal } from "../utils/useReveal";

function slot(h) {
  const parts = [];
  if (h.open && h.close) parts.push(`${h.open.replace(":", "h")} – ${h.close.replace(":", "h")}`);
  if (h.open2 && h.close2) parts.push(`${h.open2.replace(":", "h")} – ${h.close2.replace(":", "h")}`);
  return parts.length ? parts.join(" · ") : "Fermé";
}

export default function Info() {
  const [ref, visible] = useReveal();
  const status = getOpenStatus();
  const todayIndex = new Date().getDay();
  const mapSrc = `https://maps.google.com/maps?output=embed&q=${encodeURIComponent(
    restaurant.mapsQuery
  )}&z=15&t=m`;

  return (
    <section id="infos" className="info">
      <div ref={ref} className={`wrap reveal ${visible ? "is-visible" : ""}`}>
        <span className="eyebrow">Infos pratiques</span>
        <h2 className="section-title">Passez nous voir</h2>

        <div className="info__grid">
          <div className="info__hours">
            <div className="info__hours-head">
              <h3>Horaires</h3>
              <span className={`status-pill ${status.open ? "status-pill--open" : "status-pill--closed"}`}>
                <span className="status-dot" aria-hidden="true" />
                {status.label}
              </span>
            </div>
            <ul>
              {hours.map((h) => (
                <li key={h.day} className={h.index === todayIndex ? "info__today" : ""}>
                  <span className="info__day">{h.day}</span>
                  <span className="info__slot">{slot(h)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="info__contact">
            <h3>Adresse &amp; contact</h3>
            <address className="info__address">
              <strong>{restaurant.name}</strong>
              <br />
              {restaurant.address.street}
              <br />
              {restaurant.address.zip} {restaurant.address.city}
            </address>
            <div className="info__links">
              <a href={`tel:${restaurant.phoneRaw}`} className="btn btn-primary">
                📞 {restaurant.phone}
              </a>
              <a
                href={`https://maps.google.com/maps?q=${encodeURIComponent(restaurant.mapsQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                Itinéraire
              </a>
            </div>
            <div className="info__map">
              <iframe
                title="Carte Kabana Pizz"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
