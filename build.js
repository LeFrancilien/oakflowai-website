// Minification au déploiement (Vercel) — tâche SEO 2.1
// Minifie style.css et main.js EN PLACE. La source lisible reste versionnée
// dans git ; seul le sandbox de build Vercel reçoit la version minifiée.
// Local : ne pas commiter le résultat (git checkout style.css main.js pour restaurer).
const esbuild = require("esbuild");
const fs = require("fs");

const targets = [
  { file: "style.css", loader: "css" },
  { file: "main.js", loader: "js" },
];

(async () => {
  for (const { file, loader } of targets) {
    const src = fs.readFileSync(file, "utf8");
    const { code } = await esbuild.transform(src, { loader, minify: true, legalComments: "none" });
    fs.writeFileSync(file, code);
    const pct = ((1 - code.length / src.length) * 100).toFixed(1);
    console.log(`minifié ${file} : ${src.length} → ${code.length} octets (-${pct}%)`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
