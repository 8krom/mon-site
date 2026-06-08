const fs = require("fs");

// Scanner les skins
const skins = fs.readdirSync("./winamp_skin")
    .filter(f => f.endsWith(".wsz"))
    .map(f => `"winamp_skin/${f}"`)
    .join(",\n    ");

// Scanner les MP3
const tracks = fs.readdirSync("./radio_moelleuse")
    .filter(f => f.endsWith(".mp3"))
    .map(f => {
        const nom = f.replace(".mp3", "").replace(/_/g, " ");
        return `            { metaData: { artist: "Radio Moelleuse", title: "${nom}" }, url: "radio_moelleuse/${f}" }`;
    })
    .join(",\n");

// Lire volkcorp.js
let contenu = fs.readFileSync("./volkcorp.js", "utf8");

// Remplacer skins
const nouveauSkins = `const skins = [\n    ${skins}\n];`;
contenu = contenu.replace(/const skins = \[[\s\S]*?\];/, nouveauSkins);

// Remplacer playlist — trouver le début et la fin manuellement
const debut = contenu.indexOf("webamp.appendTracks([");
const fin = contenu.indexOf("\n        ]);", debut) + 12;
const nouveauTracks = `webamp.appendTracks([\n${tracks}\n        ]);`;
contenu = contenu.substring(0, debut) + nouveauTracks + contenu.substring(fin);
// Sauvegarder
fs.writeFileSync("./volkcorp.js", contenu, "utf8");

console.log("Skins mis à jour !");
console.log("Playlist mise à jour !");
console.log("Tracks trouvés :", fs.readdirSync("./radio_moelleuse").filter(f => f.endsWith(".mp3")).length);