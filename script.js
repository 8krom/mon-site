const accueil = document.getElementById("accueil");

document.getElementById("galerie").style.display = "none";
document.getElementById("galerie-videos").style.display = "none";
document.getElementById("page-services").style.display = "none";
document.getElementById("page-commande").style.display = "none";
document.getElementById("page-mentions").style.display = "none";
document.getElementById("page-cgv").style.display = "none";

document.getElementById("btn-cgv").addEventListener("click", function() {
    document.getElementById("page-cgv").style.display = "block";
    document.getElementById("galerie").style.display = "none";
    document.getElementById("galerie-videos").style.display = "none";
    document.getElementById("page-services").style.display = "none";
    document.getElementById("page-commande").style.display = "none";
    document.getElementById("page-mentions").style.display = "none";
    accueil.classList.add("cache");
    btnRetour.style.display = "block";
});

document.getElementById("btn-mentions").addEventListener("click", function() {
    document.getElementById("page-mentions").style.display = "block";
    document.getElementById("galerie").style.display = "none";
    document.getElementById("galerie-videos").style.display = "none";
    document.getElementById("page-services").style.display = "none";
    document.getElementById("page-commande").style.display = "none";
    accueil.classList.add("cache");
    btnRetour.style.display = "block";
});

document.getElementById("btn-covers").addEventListener("click", function() {
    accueil.classList.add("cache");
    document.getElementById("galerie").style.display = "block";
    document.getElementById("galerie-videos").style.display = "none";
    document.getElementById("page-commande").style.display = "none";
    document.getElementById("page-services").style.display = "none";
    document.getElementById("galerie").classList.remove("fade-in");
    setTimeout(() => document.getElementById("galerie").classList.add("fade-in"), 5);
    btnRetour.style.display = "block";
});

document.getElementById("btn-videos").addEventListener("click", function() {
    accueil.classList.add("cache");
    document.getElementById("galerie").style.display = "none";
    document.getElementById("galerie-videos").style.display = "block";
    document.getElementById("page-commande").style.display = "none";
    document.getElementById("page-services").style.display = "none";
    document.getElementById("galerie-videos").classList.remove("fade-in");
    setTimeout(() => document.getElementById("galerie-videos").classList.add("fade-in"), 5);
    btnRetour.style.display = "block";
});

document.getElementById("btn-services").addEventListener("click", function() {
    accueil.classList.add("cache");
    document.getElementById("galerie").style.display = "none";
    document.getElementById("galerie-videos").style.display = "none";
    document.getElementById("page-services").style.display = "block";
    document.getElementById("panier-icon").style.display = "block";
    document.getElementById("etape-label").style.display = "block";
    document.getElementById("etape-label").textContent = "Étape 1";
    document.getElementById("page-services").classList.remove("fade-in");
    setTimeout(() => document.getElementById("page-services").classList.add("fade-in"), 5);
    btnRetour.style.display = "block";
});

document.getElementById("btn-valider-panier").addEventListener("click", function() {
    if (panier.length === 0) return;
    
    const recap = document.getElementById("recap-commande");
    const texteCommande = panier.map(item => item.nom + " — " + item.prix + "€").join(", ");
    recap.innerHTML = panier.map(item => item.nom + " — " + item.prix + "€").join("<br>");
    document.getElementById("f-commande").value = texteCommande;
    
    document.getElementById("page-services").style.display = "none";
    document.getElementById("page-commande").style.display = "block";
    document.getElementById("panier-icon").classList.remove("ouvert");
    document.getElementById("btn-valider-panier").style.backgroundColor = "#2d6a4f";
    document.getElementById("btn-valider-panier").style.borderColor = "#2d6a4f";
    document.getElementById("btn-valider-panier").style.color = "#e8e8e8";
    document.getElementById("btn-valider-panier").textContent = "Validé ✓";
    document.getElementById("etape-label").textContent = "Étape 2";
    document.getElementById("page-commande").classList.remove("fade-in");
    setTimeout(() => document.getElementById("page-commande").classList.add("fade-in"), 5);
});

const btnRetour = document.getElementById("btn-retour");

btnRetour.addEventListener("click", function() {
    accueil.classList.remove("cache");
    btnRetour.style.display = "none";
    document.getElementById("panier-icon").style.display = "none";
    document.getElementById("etape-label").style.display = "none";
});

const covers = [
    { type: "annee", valeur: "2026" },
    { fichier: "Sub_Med_Tape_vol1_8krom2.png", categorie: ["photomontage"], titre: "Sub.Med Tape vol.1" },
    { fichier: "Sober_JackSin_8krom.png", categorie: ["photomontage"], titre: "Sober" },
    { fichier: "panamera_chirurgy_francisjeremy_8krom.png", categorie: ["photomontage"], titre: "Panamera", lien: "https://soundcloud.com/chirurgy-beats/francis-jeremy-panamera-prod?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" },    
    { fichier: "leoewski_8krom_BandzUp.png", categorie: ["photomontage"], titre: "Bands Up", lien: "https://open.spotify.com/embed/track/72sRipt17hwBrgkxPdKFlI?utm_source=generator&theme=0" }, 
    { fichier: "leoewski_8krom_Serane_Slatt.png", categorie: ["photomontage"], titre: "Slatt", lien: "https://open.spotify.com/embed/track/3pH1ZV5pQfWBDz0VaZ7VCg?utm_source=generator" },
    { fichier: "cover1.png", categorie: ["photomontage"], titre: "Test your might" },
    { fichier: "Escalated_Flight_Stab_8krom.png", categorie: ["dessin"], titre: "Escalated flight" },
    { fichier: "Loucky_Journal_intime_2.png", categorie: ["dessin"], titre: "Journal intime 2" },
    { fichier: "shitzyloco_leoewski_soldier_8krom1.png", categorie: ["photomontage"], titre: "Soldier" },
    { fichier: "Slimeurz_Vol.1_pmoneee_8krom.png", categorie: ["dessin"], titre: "Slimeurz vol.1" },
    { fichier: "Slimeurz_Vol.1_pmoneee_tracklist_8krom.png", categorie: ["dessin", "tracklist"], titre: "Tracklist Slimeurz vol.1" },
    { fichier: "OKBET_chirurgy_JeyChris_8krom.png", categorie: ["photomontage"], titre: "OK BET" },
    { type: "annee", valeur: "2025" },
    { fichier: "Liberty_City_LeCoachhh_8krom.png", categorie: ["dessin", "photomontage"], titre: "Liberty city" },
    { fichier: "leoewski_8krom_Kinji_RDV2.png", categorie: ["photomontage"], titre: "RDV" },
    { fichier: "Sylvan_Drumkit_8krom.png", categorie: ["dessin", "photomontage"], titre: "Sylvan Drumkit" },
    { fichier: "affiche_reez_zigzag.png", categorie: ["photomontage"], titre: "Affiche MV" },
    { fichier: "cover2.png", categorie: ["dessin"], titre: "Aléas" },
    { fichier: "leoewski_8krom_rentredansl'train.png", categorie: ["photomontage"], titre: "Rentre dans l'train" },
    { fichier: "cover_pink2.png", categorie: ["photomontage"], titre: "Certified ref" },
    { fichier: "leoewski_8krom_whoufoolin_v2.png", categorie: ["photomontage"], titre: "Who u foolin ?" },
    { fichier: "leoewski_8krom_Gentlemen.png", categorie: ["photomontage"], titre: "Gentlemen" },
    { fichier: "dialryckx_8krom_2.png", categorie: ["dessin", "photomontage"], titre: "Volonté" },
    { fichier: "affiche_oney_iboat.jpg", categorie: ["photomontage"], titre: "Affiche Iboat" },
    { fichier: "AllActionJayy_Slime_Forever_8krom.jpg", categorie: ["dessin", "photomontage"], titre: "Slime forever" },
    { fichier: "Ancien_Roi_Le_Coach.jpg", categorie: ["3d"], titre: "Ancien roi" },
    { fichier: "bottombundlecover.png", categorie: ["dessin"], titre: "Bottom-ville" },
    { fichier: "CHOPERTMGFINAL.png", categorie: ["photomontage"], titre: "Merry gloxxmas" },
    { fichier: "TRACK_CHOPER_TMG.png", categorie: ["photomontage", "tracklist"], titre: "Tracklist Merry gloxxmas" },
    { fichier: "cover_on_go.png", categorie: ["dessin"], titre: "On go" },
    { fichier: "cover_pour_gros_rat.png", categorie: ["3d"], titre: "Trou à rat 2" },
    { fichier: "leoewski_8krom_Doormat.png", categorie: ["photomontage"], titre: "Doormat" },
    { fichier: "R0ckst@r_P!nkm4n_8krom.png", categorie: ["dessin", "photomontage"], titre: "Rockst@r" },
    { fichier: "leoewski_8krom_le_temps_passe.png", categorie: ["dessin", "photomontage"], titre: "Le temps passe" },
    { fichier: "dialryckx_8krom.png", categorie: ["dessin"], titre: "Paradoxale" },
    { fichier: "cover3.png", categorie: ["dessin"], titre: "Mary Jane" },
    { fichier: "processus_lecoach__krom_final.jpg.png", categorie: ["3d"], titre: "Processus" },
    { fichier: "Ghetto_Kitty_MeekoSaga_Spaced_Swag_8krom.png", categorie: ["photomontage"], titre: "Spaced swag" },
    { fichier: "ONEY_CASH OUT_8KROMFinal.png", categorie: ["photomontage"], titre: "Cash out" },
    { fichier: "SHROOMY_GHETTO_KITTY_8KROM.png", categorie: ["photomontage"], titre: "Russian/Lego" },
    { fichier: "DEEAURAx8KROM.png", categorie: ["photomontage"], titre: "Lifestyle" },
    { fichier: "only_hoes_le_coach_8krom.png", categorie: ["photomontage"], titre: "Only hoes" },
    { fichier: "Ghetto_Kitty_8krom.png", categorie: ["photomontage"], titre: "Kalis" },
    { fichier: "rx_carlos_dirty_8krom.png", categorie: ["photomontage"], titre: "RX" },
    { fichier: "MM4_8krom_Gelone.png", categorie: ["photomontage"], titre: "MM4" },
    { fichier: "S4hardt_8krom.png", categorie: ["photomontage"], titre: "Out of space" },
    { fichier: "SHROOMY_COVER.png", categorie: ["photomontage"], titre: "Shroomy shop" },
    { fichier: "Gelone_8krom_Marcheur_Mort_3.png", categorie: ["photomontage"], titre: "MM3" },
    { fichier: "AllActionJay_8krom.png", categorie: ["photomontage"], titre: "Sins of success" },
    { fichier: "Lildee28st_8krom.png", categorie: ["photomontage"], titre: "Luldee" },
    { fichier: "gelone_8krom.png", categorie: ["photomontage"], titre: "MM2" },
    { fichier: "kaziview_8krom.png", categorie: ["photomontage"], titre: "Angry kids from the brick" },
    { fichier: "lildre.png", categorie: ["photomontage"], titre: "Lildre556" },
    { fichier: "MONTAGE_8KROM.png", categorie: ["photomontage"], titre: "True or lie" },
    { fichier: "bloody_cover.png", categorie: ["dessin"], titre: "Luciano sunshine" },
    { type: "annee", valeur: "2024" },
    { fichier: "cover_louis_pinkman.png", categorie: ["3d"], titre: "Louis P!nkm4n" },
    { fichier: "cover_marc.png", categorie: ["dessin"], titre: "Still getting money" },
    { fichier: "halftone_vers.png", categorie: ["dessin"], titre: "Puff puff pass" },
    { fichier: "lilkris3000_og.png", categorie: ["dessin"], titre: "lilkris3000" },
    { fichier: "pinkman_2.png", categorie: ["dessin"], titre: "FLYY" },
    { fichier: "durkalini.png", categorie: ["dessin"], titre: "Durkalini Pyro" },
    { fichier: "BLFxK2.png", categorie: ["photomontage"], titre: "Nouveaux suspect" },
    { fichier: "lazerdim7002.png", categorie: ["dessin"], titre: "Lazerdim700" },
    { fichier: "big24final.png", categorie: ["3d"], titre: "Big24" },
    { fichier: "coverpinkman2.png", categorie: ["dessin"], titre: "In the n!ght" },
    { type: "annee", valeur: "2023" },
    { fichier: "batman_jeune_c.png", categorie: ["dessin"], titre: "Batman" },
    { fichier: "bordel_cover.png", categorie: ["dessin"], titre: "La guenda" },
    { fichier: "coverjeunec.png", categorie: ["dessin"], titre: "Jeune C" },
    { fichier: "leskafttomy.png", categorie: ["dessin"], titre: "Ski s'passe" },
    { fichier: "nonewfriendscover2.png", categorie: ["dessin"], titre: "Rose eternelle" },
    { fichier: "shitland.png", categorie: ["dessin"], titre: "Teushiland" },
    { fichier: "matrix.png", categorie: ["dessin"], titre: "Matrix" },
    { fichier: "coveryuri.png", categorie: ["dessin"], titre: "Yuri mériadeck" },
    { fichier: "leskaamorev3.png", categorie: ["dessin"], titre: "Amore" },
    { fichier: "croquinonewfriendsv1.png", categorie: ["dessin"], titre: "nonewfriends" },
    { fichier: "coverchoper50.png", categorie: ["dessin"], titre: "Play 4 keeps" },
    { fichier: "coversairbnbpinkman.png", categorie: ["dessin"], titre: "Airbnb" },
    { fichier: "croqui6pa2.png", categorie: ["dessin"], titre: "6pa" },
    { fichier: "tracklistrowjy.png", categorie: ["dessin", "tracklist"], titre: "Tracklist Random shit vol.1" },
    { fichier: "coverrowjy.png", categorie: ["dessin"], titre: "Random shit vol.1" },
    { fichier: "track_maj.png", categorie: ["dessin", "tracklist"], titre: "Tracklist La ruche" },
    { fichier: "prodige_final.jpg", categorie: ["dessin"], titre: "Prodige" },
    { fichier: "laruche3.jpg", categorie: ["dessin"], titre: "La ruche" },
    { fichier: "coffeepackfinal.png", categorie: ["dessin"], titre: "Coffee pack" },
    { fichier: "class c2.png", categorie: ["dessin"], titre: "Classe c" },
    { fichier: "trapstar.png", categorie: ["dessin"], titre: "Trapstar" }
];

const coversAccueil = covers.filter(c => c.fichier);

["piste-1", "piste-2", "piste-3", "piste-4", "piste-5"].forEach(function(id) {
    const piste = document.getElementById(id);
    const selection = [...coversAccueil, ...coversAccueil];
    selection.forEach(function(cover) {
        const img = document.createElement("img");
        img.src = "images/" + cover.fichier;
        piste.appendChild(img);
    });
});

const videos = [
    { fichier: "VISU_OKBET_8krom.mp4", titre: "OK BET" },
    { fichier: "VISU_Liberty_City.mp4", titre: "Liberty city" },
    { fichier: "VISU_Slimeurz.mp4", titre: "Slimeurz vol.1" },
    { fichier: "visu_Stab_1.mp4", titre: "Escalated flight" }
];

const grille = document.querySelector(".grille");
const grilleVideos = document.querySelector(".grille-videos");
let filtreActif = "tous";

function afficherCovers() {
    grille.innerHTML = "";

    for (let i = 0; i < covers.length; i++) {
        const element = covers[i];

        if (element.type === "annee") {
            let aDesCovers = false;
            for (let j = i + 1; j < covers.length; j++) {
                if (covers[j].type === "annee") break;
                if (filtreActif === "tous" || covers[j].categorie.includes(filtreActif)) {
                    aDesCovers = true;
                    break;
                }
            }
            if (aDesCovers) {
                const separateur = document.createElement("div");
                separateur.classList.add("separateur-annee");
                separateur.textContent = element.valeur;
                grille.appendChild(separateur);
            }
        } else {
            if (filtreActif === "tous" || element.categorie.includes(filtreActif)) {
                const img = document.createElement("img");
                img.src = "images/" + element.fichier;
                img.alt = element.fichier;
                img.dataset.titre = element.titre;
                img.dataset.lien = element.lien || "";
                grille.appendChild(img);
            }
        }
    }
    const nbCovers = document.querySelectorAll(".grille img").length;
    document.getElementById("compteur").textContent = String(nbCovers).padStart(3, 0);
}
const boutons = document.querySelectorAll(".filtres button");

boutons.forEach(function(bouton) {
    bouton.addEventListener("click", function() {
        filtreActif = bouton.dataset.categorie;
        boutons.forEach(b => b.classList.remove("actif"));
        bouton.classList.add("actif");
        afficherCovers();
    });
});

afficherCovers();

function afficherVideos() {
    const grilleVideos = document.querySelector(".grille-videos");
    grilleVideos.innerHTML = "";

    videos.forEach(function(video) {
        const v = document.createElement("video");
        v.src = "videos/" + video.fichier;
        v.dataset.titre = video.titre;
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.addEventListener("mouseenter", () => v.play());
        v.addEventListener("mouseleave", () => v.pause());
        grilleVideos.appendChild(v);
    });
}

afficherVideos();

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

grille.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        lightboxType = "image";
        lightboxImg.src = e.target.src;
        document.getElementById("lightbox-titre").textContent = e.target.dataset.titre;
        
        const player = document.getElementById("lightbox-player");
        const lien = e.target.dataset.lien;
        
        if (lien) {
    if (lien.includes("spotify")) {
        player.src = lien;
    } else {
        player.src = "https://w.soundcloud.com/player/?url=" + encodeURIComponent(lien) + "&auto_play=false&hide_related=true&show_comments=false";
    }
    player.style.display = "block";
} else {
    player.src = "";
    player.style.display = "none";
}
        
        lightbox.classList.add("actif");
    }
});

grilleVideos.addEventListener("click", function(e) {
    if (e.target.tagName === "VIDEO") {
        lightboxType = "video";
        indexActuel = Array.from(document.querySelectorAll(".grille-videos video")).indexOf(e.target);
        const lightboxVideo = document.getElementById("lightbox-video");
        const lightboxImg = document.getElementById("lightbox-img");
        
        lightboxImg.style.display = "none";
        lightboxVideo.style.display = "block";
        lightboxVideo.src = e.target.src;
        lightboxVideo.play();
        document.getElementById("lightbox-titre").textContent = e.target.dataset.titre;
        document.getElementById("lightbox-player").style.display = "none";
        lightbox.classList.add("actif");
    }
});

lightbox.addEventListener("click", function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove("actif");
        lightboxImg.style.display = "block";
        const lightboxVideo = document.getElementById("lightbox-video");
        lightboxVideo.pause();
        lightboxVideo.src = "";
        lightboxVideo.style.display = "none";
        lightboxImg.src = "";
    }
});

const bwToggle = document.getElementById("bw-toggle");

bwToggle.addEventListener("change", function() {
    const images = document.querySelectorAll(".grille img");
    images.forEach(function(img) {
        img.classList.toggle("noir-blanc", bwToggle.checked);
    });
});

const panier = [];

document.querySelectorAll(".btn-ajouter").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
        e.stopPropagation();
        const carte = btn.closest(".carte-tarif");
        const nom = carte.dataset.nom;
        const prix = parseInt(carte.dataset.prix);

        panier.push({ nom, prix });
        mettreAJourPanier();
    });
});

document.querySelectorAll(".btn-exemple").forEach(function(btn) {
    btn.addEventListener("click", function(e) {
        e.stopPropagation();
        const carte = btn.closest(".carte-tarif");
        const filtre = carte.dataset.filtre;

        if (filtre === "video") {
            accueil.classList.add("cache");
            document.getElementById("page-services").style.display = "none";
            document.getElementById("galerie-videos").style.display = "block";
            document.getElementById("galerie").style.display = "none";
            document.getElementById("galerie-videos").classList.remove("fade-in");
            setTimeout(() => document.getElementById("galerie-videos").classList.add("fade-in"), 5);
        } else {
            accueil.classList.add("cache");
            document.getElementById("page-services").style.display = "none";
            document.getElementById("galerie").style.display = "block";
            document.getElementById("galerie-videos").style.display = "none";
            document.getElementById("galerie").classList.remove("fade-in");
            setTimeout(() => document.getElementById("galerie").classList.add("fade-in"), 5);

            if (filtre === "mixte") {
                filtreActif = "tous";
            } else {
                filtreActif = filtre;
            }

            boutons.forEach(b => b.classList.remove("actif"));
            const boutonCible = document.querySelector(`.filtres button[data-categorie="${filtreActif}"]`);
            if (boutonCible) boutonCible.classList.add("actif");
            afficherCovers();
        }
    });
});

function mettreAJourPanier() {
    const liste = document.getElementById("panier-liste");
    const total = document.getElementById("panier-total");
    const badge = document.getElementById("panier-badge");
    liste.innerHTML = "";

    let somme = 0;
    panier.forEach(function(item, index) {
        const li = document.createElement("li");
        li.innerHTML = item.nom + " — " + item.prix + "€ <span class='supprimer' data-index='" + index + "'>✕</span>";
        liste.appendChild(li);
        somme += item.prix;
    });

    total.textContent = "Total : " + somme + "€";
    badge.textContent = panier.length;

    document.querySelectorAll(".supprimer").forEach(function(btn) {
        btn.addEventListener("click", function() {
            panier.splice(parseInt(btn.dataset.index), 1);
            mettreAJourPanier();
        });
    });
}

const lightboxService = document.getElementById("lightbox-service");

document.querySelectorAll(".carte-tarif").forEach(function(carte) {
    carte.addEventListener("click", function(e) {
        if (e.target.classList.contains("btn-ajouter")) return;
        
        document.getElementById("ls-titre").textContent = carte.dataset.nom;
        document.getElementById("ls-description").textContent = carte.querySelector("p").textContent;
        document.getElementById("ls-prix").textContent = carte.querySelector(".prix").textContent;
        
        const nom = carte.dataset.nom;
        const prix = parseInt(carte.dataset.prix);
        
        document.getElementById("ls-ajouter").onclick = function() {
            panier.push({ nom, prix });
            mettreAJourPanier();
            lightboxService.classList.remove("actif");
        };
        
        lightboxService.classList.add("actif");
    });
});

lightboxService.addEventListener("click", function(e) {
    if (e.target === lightboxService) {
        lightboxService.classList.remove("actif");
    }
});

document.getElementById("panier-icon").addEventListener("click", function() {
    this.classList.toggle("ouvert");
});

const codes = {
    "8KROM10": 10,
    "NEWCLIENT": 15
};

let reductionPromo = 0;
let reductionFidelite = 0;

document.getElementById("btn-promo").addEventListener("click", function() {
    const code = document.getElementById("f-promo").value.toUpperCase();
    const message = document.getElementById("promo-message");

    if (codes[code]) {
        reductionPromo = codes[code];
        message.textContent = "Code appliqué — " + reductionPromo + "% de réduction";
        message.style.color = "#e8e8e8";
    } else {
        reductionPromo = 0;
        message.textContent = "Code invalide";
        message.style.color = "#555555";
    }
    calculerTotal();
});

document.getElementById("f-fidelite").addEventListener("change", function() {
    const message = document.getElementById("fidelite-message");
    if (this.checked) {
        reductionFidelite = 10;
        message.textContent = "Réduction client fidèle appliquée — 10%";
        message.style.color = "#e8e8e8";
    } else {
        reductionFidelite = 0;
        message.textContent = "";
    }
    calculerTotal();
});

function calculerTotal() {
    const sousTotal = panier.reduce((acc, item) => acc + item.prix, 0);
    const reduction = Math.min(reductionPromo + reductionFidelite, 100);
    const total = Math.round(sousTotal * (1 - reduction / 100));
    document.getElementById("panier-total").textContent = "Total : " + total + "€";
}

let indexActuel = -1;
const imagesGrille = () => Array.from(document.querySelectorAll(".grille img"));

grille.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        indexActuel = imagesGrille().indexOf(e.target);
    }
});

let navigationEnCours = false;
let lightboxType = "image";

document.addEventListener("keydown", function(e) {
    if (!lightbox.classList.contains("actif")) return;
    if (navigationEnCours) return;
    navigationEnCours = true;
    setTimeout(() => navigationEnCours = false, 250);

    if (lightboxType === "video") {
        const vids = Array.from(document.querySelectorAll(".grille-videos video"));
        if (e.key === "ArrowRight") {
            indexActuel = (indexActuel + 1) % vids.length;
        } else if (e.key === "ArrowLeft") {
            indexActuel = (indexActuel - 1 + vids.length) % vids.length;
        } else if (e.key === "Escape") {
            lightbox.classList.remove("actif");
            const lightboxVideo = document.getElementById("lightbox-video");
            lightboxVideo.pause();
            lightboxVideo.src = "";
            lightboxVideo.style.display = "none";
            lightboxImg.style.display = "block";
            return;
        } else {
            return;
        }
        const vid = vids[indexActuel];
        changerLightbox(vid.src, vid.dataset.titre, null, "video");
        return;
    }

    const imgs = imagesGrille();
    if (e.key === "ArrowRight") {
        indexActuel = (indexActuel + 1) % imgs.length;
    } else if (e.key === "ArrowLeft") {
        indexActuel = (indexActuel - 1 + imgs.length) % imgs.length;
    } else if (e.key === "Escape") {
        lightbox.classList.remove("actif");
        return;
    } else {
        return;
    }
    const img = imgs[indexActuel];
    changerLightbox(img.src, img.dataset.titre, img.dataset.lien, "image");
});

function changerLightbox(src, titre, lien, type) {
    const img = document.getElementById("lightbox-img");
    const vid = document.getElementById("lightbox-video");
    const player = document.getElementById("lightbox-player");
    const el = type === "video" ? vid : img;

    el.style.opacity = "0";

    setTimeout(() => {
        if (type === "video") {
            vid.src = src;
            vid.play();
        } else {
            img.src = src;
            if (lien) {
                if (lien.includes("spotify")) {
                    player.src = lien;
                } else {
                    player.src = "https://w.soundcloud.com/player/?url=" + encodeURIComponent(lien) + "&auto_play=false&hide_related=true&show_comments=false";
                }
                player.style.display = "block";
            } else {
                player.src = "";
                player.style.display = "none";
            }
        }
        document.getElementById("lightbox-titre").textContent = titre;
        el.style.opacity = "1";
    }, 200);
}



