// compresser.js — recompresse toutes les images de "images/" pour alléger le site
// -----------------------------------------------------------------------------
// Ce que fait le script :
//   1. Sauvegarde chaque image originale dans "images_originaux/" (on ne perd rien)
//   2. Réduit les images trop grandes à 1600px de large max
//   3. Réencode en gardant le MÊME format et le MÊME nom de fichier
//      => aucun lien dans ton code ne casse, rien à modifier ailleurs
//
// Installation (une seule fois) :  npm install sharp
// Lancement :                      node compresser.js
// -----------------------------------------------------------------------------

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// ---- Réglages (tu peux ajuster) --------------------------------------------
const DOSSIER       = "images";            // dossier à compresser
const BACKUP        = "images_originaux";  // où sont copiées les originales
const LARGEUR_MAX   = 1600;                // largeur max en pixels
const QUALITE       = 80;                  // qualité (0-100), 80 = bon compromis
const SEUIL_KO      = 300;                 // on ignore les fichiers déjà < 300 Ko
// ----------------------------------------------------------------------------

const EXTENSIONS = [".png", ".jpg", ".jpeg"];

// Récupère récursivement tous les fichiers image du dossier
function listerImages(dossier) {
    let resultats = [];
    for (const nom of fs.readdirSync(dossier)) {
        const chemin = path.join(dossier, nom);
        const infos = fs.statSync(chemin);
        if (infos.isDirectory()) {
            resultats = resultats.concat(listerImages(chemin));
        } else if (EXTENSIONS.includes(path.extname(nom).toLowerCase())) {
            resultats.push(chemin);
        }
    }
    return resultats;
}

function ko(octets) {
    return (octets / 1024).toFixed(0);
}

async function compresser() {
    if (!fs.existsSync(DOSSIER)) {
        console.log(`❌ Dossier "${DOSSIER}" introuvable. Lance le script depuis la racine du projet.`);
        return;
    }

    const images = listerImages(DOSSIER);
    console.log(`📂 ${images.length} images trouvées dans "${DOSSIER}/"\n`);

    let totalAvant = 0, totalApres = 0, traitees = 0, ignorees = 0;

    for (const chemin of images) {
        const tailleAvant = fs.statSync(chemin).size;

        // On ignore les petits fichiers (logos, icônes, favicon...) déjà légers
        if (tailleAvant / 1024 < SEUIL_KO) {
            ignorees++;
            continue;
        }

        try {
            const ext = path.extname(chemin).toLowerCase();
            const image = sharp(chemin, { failOn: "none" });
            const meta = await image.metadata();

            // Sauvegarde de l'originale (en gardant l'arborescence)
            const cheminBackup = path.join(BACKUP, path.relative(DOSSIER, chemin));
            fs.mkdirSync(path.dirname(cheminBackup), { recursive: true });
            if (!fs.existsSync(cheminBackup)) {
                fs.copyFileSync(chemin, cheminBackup);
            }

            // On redimensionne seulement si l'image est plus large que la limite
            let pipeline = image.rotate(); // respecte l'orientation EXIF
            if (meta.width && meta.width > LARGEUR_MAX) {
                pipeline = pipeline.resize({ width: LARGEUR_MAX, withoutEnlargement: true });
            }

            // Réencodage dans le même format
            let buffer;
            if (ext === ".png") {
                buffer = await pipeline
                    .png({ quality: QUALITE, compressionLevel: 9, palette: true, effort: 8 })
                    .toBuffer();
            } else {
                buffer = await pipeline
                    .jpeg({ quality: QUALITE, mozjpeg: true })
                    .toBuffer();
            }

            // On n'écrase que si on a vraiment gagné de la place
            if (buffer.length < tailleAvant) {
                fs.writeFileSync(chemin, buffer);
            }

            const tailleApres = fs.statSync(chemin).size;
            totalAvant += tailleAvant;
            totalApres += tailleApres;
            traitees++;

            const gain = (100 - (tailleApres / tailleAvant) * 100).toFixed(0);
            console.log(`✅ ${path.basename(chemin).padEnd(45)} ${ko(tailleAvant).padStart(6)} Ko → ${ko(tailleApres).padStart(6)} Ko  (-${gain}%)`);
        } catch (e) {
            console.log(`⚠️  ${path.basename(chemin)} ignorée (${e.message})`);
            ignorees++;
        }
    }

    console.log("\n" + "─".repeat(60));
    console.log(`✨ ${traitees} images compressées, ${ignorees} ignorées (déjà légères)`);
    console.log(`📦 Total : ${(totalAvant / 1048576).toFixed(1)} Mo → ${(totalApres / 1048576).toFixed(1)} Mo`);
    if (totalAvant > 0) {
        console.log(`🪶 Gain : -${(100 - (totalApres / totalAvant) * 100).toFixed(0)}% sur les images traitées`);
    }
    console.log(`💾 Originales sauvegardées dans "${BACKUP}/" (tu peux les supprimer une fois vérifié)`);
    console.log("─".repeat(60));
}

compresser();
