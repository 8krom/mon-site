const fs = require("fs");

// Scanner les skins
const skins = fs.readdirSync("./winamp_skin")
    .filter(f => f.endsWith(".wsz"))
    .map(f => `"winamp_skin/${f}"`)
    .join(",\n    ");

// Lire volkcorp.js
let contenu = fs.readFileSync("./volkcorp.js", "utf8");

// Remplacer le tableau skins
const nouveau = `const skins = [\n    ${skins}\n];`;
contenu = contenu.replace(/const skins = \[[\s\S]*?\];/, nouveau);

// Sauvegarder
fs.writeFileSync("./volkcorp.js", contenu, "utf8");

console.log("Skins mis à jour !");
console.log("Skins trouvés :", skins.split(",").length);