import { useEffect, useRef, useState } from "react";

// Révèle un élément quand il entre dans le viewport (respecte prefers-reduced-motion)
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    // threshold 0 + rootMargin : se déclenche dès que le haut de l'élément
    // entre dans le viewport, même si la section est plus haute que l'écran
    // (sinon une section très haute n'atteint jamais un seuil élevé et reste
    // invisible).
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}
