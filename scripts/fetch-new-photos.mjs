// Remplace les photos boissons/sides par les images fournies par le client.
// Pour une URL de page produit, extrait l'og:image puis télécharge.
// Usage : node scripts/fetch-new-photos.mjs [filtre]
import fs from "node:fs";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const items = [
  ["public/drinks/coca-cola-33.jpg", "https://www.valgourmand.com/910-coca-cola-boite-33cl-ref-co003.html"],
  ["public/drinks/coca-cola-125.jpg", "https://www.bruneau.fr/product/coca-cola-classic-1-25-l-12-bouteilles/704618"],
  ["public/drinks/coca-cherry-33.jpg", "https://www.valgourmand.com/4763-coca-cola-cherry-boite-33cl-ref-co001.html"],
  ["public/drinks/coca-zero-33.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSew_bKYD3yxeBQzgg9m4TywVqsEbvQ84s8CmwS8oLF4w&s=10"],
  ["public/drinks/coca-zero-125.jpg", "https://www.lcvtraiteur.fr/wp-content/uploads/2020/09/Coca-Cola-Zero-LCV-Traiteur.jpg"],
  ["public/drinks/fanta-125.png", "https://festimoment.fr/wp-content/uploads/2024/02/Capture-decran-245-1.png"],
  ["public/drinks/oasis-tropical-33.jpg", "https://www.bruneau.fr/product/oasis-tropical-33-cl-24-canettes/773850"],
  ["public/drinks/oasis-tropical-2l.jpg", "https://www.houra.fr/oasis-boisson-aux-fruits-tropical-2l/1353799/"],
  ["public/drinks/oasis-cassis-33.jpg", "https://halalfs.com/boissons/5-oasis-pomme-cassis-framboise-24-x-33-cl.html"],
  ["public/drinks/orangina-33.jpg", "https://www.bieres64-40.fr/produit/orangina-33-cl/"],
  ["public/drinks/perrier-33.png", "https://www.bieres64-40.fr/produit/perrier-33-cl/"],
  ["public/drinks/canada-dry-33.webp", "https://goapero.fr/produit/ginger-ale-canada-dry-33cl/"],
  ["public/drinks/tropico-33.jpg", "https://www.valgourmand.com/4764-tropico-original-boite-33cl-ref-tr003.html"],
  ["public/drinks/ice-tea-33.jpg", "https://www.valgourmand.com/4026-lipton-ice-tea-peche-boite-33cl-ref-ic008.html"],
  ["public/drinks/lipton-ice-tea-125.jpg", "https://www.lcvtraiteur.fr/produit/ice-tea-1-litre/"],
  ["public/drinks/redbull-25.png", "https://toptanmarket.fr/produit/red-bull-boite-25clx24/"],
  ["public/drinks/eau-50.jpg", "https://www.manutan.fr/fr/maf/eau-de-source-cristaline-50cl"],
  ["public/drinks/eau-plate-150.webp", "https://www.fiducial-office-solutions.fr/palette-504-bouteilles-1-5-cristaline-p-132719.html"],
  ["public/sides/cheesy-bread.jpg", "https://www.dominos.fr/ManagedAssets/FR/product/EBCHE/FR_EBCHE_fr_hero_13706.png"],
  ["public/sides/chicken-wings.png", "https://www.dominos.fr/ManagedAssets/FR/product/ECBFWSF/FR_ECBFWSF_fr_hero_13706.png"],
  ["public/sides/chickeninos.jpg", "https://www.dominos.fr/ManagedAssets/FR/product/ECHIKSF/FR_ECHIKSF_fr_hero_13706.png"],
  ["public/sides/potatoes.jpg", "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600"],
  ["public/sides/brownie.jpg", "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"],
];

async function fetchUrl(url, referer) {
  return fetch(url, {
    headers: {
      "User-Agent": UA,
      Accept: "text/html,application/xhtml+xml,image/avif,image/webp,image/*,*/*;q=0.8",
      "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
      ...(referer ? { Referer: referer } : {}),
    },
    redirect: "follow",
  });
}

function extractImage(html, baseUrl) {
  const og =
    html.match(/<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
    html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
  if (og) return new URL(og[1].replace(/&amp;/g, "&"), baseUrl).href;
  return null;
}

const onlyFilter = process.argv[2];
let ok = 0,
  fail = 0;

for (const [out, url] of items) {
  if (onlyFilter && !out.includes(onlyFilter)) continue;
  try {
    let res = await fetchUrl(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const type = res.headers.get("content-type") || "";
    if (!type.startsWith("image/")) {
      const html = await res.text();
      const imgUrl = extractImage(html, res.url);
      if (!imgUrl) throw new Error("og:image introuvable dans la page");
      res = await fetchUrl(imgUrl, url);
      if (!res.ok) throw new Error(`HTTP ${res.status} sur l'image ${imgUrl}`);
      const t2 = res.headers.get("content-type") || "";
      if (!t2.startsWith("image/")) throw new Error(`pas une image (${t2}) : ${imgUrl}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) throw new Error(`fichier trop petit (${buf.length} octets)`);
    fs.writeFileSync(out, buf);
    console.log(`OK    ${out}  (${Math.round(buf.length / 1024)} Ko)`);
    ok++;
  } catch (err) {
    console.error(`ECHEC ${out}: ${err.message}`);
    fail++;
  }
  await new Promise((r) => setTimeout(r, 800));
}
console.log(`\n${ok} OK, ${fail} échec(s)`);
