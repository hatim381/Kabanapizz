import { hours } from "../data/menu";

// Convertit "HH:MM" en minutes depuis minuit
function toMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// Renvoie l'état d'ouverture en fonction de l'heure locale du visiteur
export function getOpenStatus(now = new Date()) {
  const dayIndex = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const today = hours.find((h) => h.index === dayIndex);

  if (!today) return { open: false, label: "Fermé aujourd'hui", next: null };

  const slots = [
    today.open && today.close ? [toMinutes(today.open), toMinutes(today.close)] : null,
    today.open2 && today.close2 ? [toMinutes(today.open2), toMinutes(today.close2)] : null,
  ].filter(Boolean);

  for (const [start, end] of slots) {
    if (minutes >= start && minutes < end) {
      const closingSoon = end - minutes <= 45;
      return {
        open: true,
        label: closingSoon ? "Ferme bientôt" : "Ouvert",
        until: minutesToLabel(end),
        closingSoon,
        prepTime: "15-20 min",
      };
    }
  }

  // Pas ouvert maintenant : trouver le prochain créneau aujourd'hui
  for (const [start] of slots) {
    if (minutes < start) {
      return { open: false, label: "Fermé", opensAt: minutesToLabel(start) };
    }
  }

  return { open: false, label: "Fermé", opensAt: null };
}

function minutesToLabel(m) {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${h}h${min.toString().padStart(2, "0")}`;
}
