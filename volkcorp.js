// Sound Design
const sons = {
    fond: new Audio("Sounddesign site/Sound Background site.wav"),
    demarrage: new Audio("Sounddesign site/démarrage.wav"),
    bull: [
        new Audio("Sounddesign site/bull 1.wav"),
        new Audio("Sounddesign site/bull 2.wav"),
        new Audio("Sounddesign site/bull 3.wav"),
        new Audio("Sounddesign site/bull 4.wav")
    ],
    hover: [
        new Audio("Sounddesign site/passage souris 1.wav"),
        new Audio("Sounddesign site/passage souris 2.wav"),
        new Audio("Sounddesign site/passage souris 3.wav"),
        new Audio("Sounddesign site/passage souris 4.wav")
    ],
    clik: new Audio("Sounddesign site/clik 1.wav"),
    retour: new Audio("Sounddesign site/clik retour 1.wav")
};

sons.fond.loop = true;
sons.fond.volume = 0.15;
sons.demarrage.volume = 0.4;
sons.bull.forEach(s => s.volume = 0.3);
sons.hover.forEach(s => s.volume = 0.2);
sons.clik.volume = 0.3;
sons.retour.volume = 0.3;

document.getElementById("intro-screen").addEventListener("click", function() {
    sons.demarrage.play();
    const intro = document.getElementById("intro-screen");
    intro.style.opacity = "0";
    setTimeout(() => {
        intro.style.display = "none";
        sons.fond.play();
    }, sons.demarrage.duration * 1000 || 2000);
});

function onYouTubeIframeAPIReady() {}

const bullesData = [
    { nom: "8krom", lien: "index.html" },
    { nom: "Itsdie4u", lien: "#" },
    { nom: "Lecoachhh", lien: "#" },
    { nom: "Partage", lien: "#" },
    { nom: "?", lien: "#" },
    { nom: "?", lien: "#" }
];

const centreX = window.innerWidth / 2;
const centreY = window.innerHeight / 2;
const rayon = 250;
const rayonBulle = 45;

const bulles = bullesData.map(function(data, i) {
    const div = document.createElement("div");
    div.classList.add("bulle");
    div.textContent = data.nom;
    div.addEventListener("mouseenter", function() {
    const hoverSon = sons.hover[Math.floor(Math.random() * 4)];
    hoverSon.currentTime = 0;
    hoverSon.play();
});

    div.addEventListener("click", function() {
    const bullSon = sons.bull[Math.floor(Math.random() * 4)];
    bullSon.currentTime = 0;
    bullSon.play();

    if (data.nom === "Partage") {
        const fp = document.getElementById("fenetre-partage");
        fp.style.display = "block";
        fp.classList.remove("fenetre-visible");
        setTimeout(() => fp.classList.add("fenetre-visible"), 10);
    } else if (data.lien !== "#") {
        window.location.href = data.lien;
    }

    if (data.nom === "Lecoachhh") {
        ouvrirRadio();
    }
});

    document.getElementById("bulles").appendChild(div);

    return {
        el: div,
        angle: (i / bullesData.length) * Math.PI * 2,
        vitesse: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
        offset: Math.random() * 40 - 20,
        offsetVitesse: Math.random() * 0.008 + 0.003,
        offsetTemps: Math.random() * Math.PI * 2,
        x: 0,
        y: 0
    };
});

function animer() {
    const now = Date.now() / 1000;

    bulles.forEach(function(bulle) {
        bulle.angle += bulle.vitesse;
        const offsetActuel = Math.sin(now * bulle.offsetVitesse + bulle.offsetTemps) * bulle.offset;
        const rayonActuel = rayon + offsetActuel;
        bulle.x = centreX + Math.cos(bulle.angle) * rayonActuel;
        bulle.y = centreY + Math.sin(bulle.angle) * rayonActuel;
    });

    for (let i = 0; i < bulles.length; i++) {
        for (let j = i + 1; j < bulles.length; j++) {
            const dx = bulles[i].x - bulles[j].x;
            const dy = bulles[i].y - bulles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < rayonBulle * 2) {
                if (Math.random() < 0.001) {
                    bulles[i].vitesse *= -1;
                    bulles[j].vitesse *= -1;
                }
            }
        }
    }

    bulles.forEach(function(bulle) {
        bulle.el.style.left = (bulle.x - rayonBulle) + "px";
        bulle.el.style.top = (bulle.y - rayonBulle) + "px";
    });

    requestAnimationFrame(animer);
}

animer();

function mettreAJourHeure() {
    const now = new Date();
    const heures = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const secondes = String(now.getSeconds()).padStart(2, "0");
    const jour = String(now.getDate()).padStart(2, "0");
    const mois = String(now.getMonth() + 1).padStart(2, "0");
    const annee = now.getFullYear();
    document.getElementById("heure-volkcorp").textContent =
        annee + "." + mois + "." + jour + " — " + heures + ":" + minutes + ":" + secondes;
}

mettreAJourHeure();
setInterval(mettreAJourHeure, 1000);

const coverartists = [
    { pseudo: "kanakgotswag", style: "", description: "", reseaux: { instagram: "kanakgotswag" }, liens: [], covers: ["kanakgotswag_1.png", "kanakgotswag_2.png", "kanakgotswag_3.png"] },
    { pseudo: "savi_ink", style: "", description: "", reseaux: { instagram: "savi_ink" }, liens: [{ label: "Portfolio", url: "https://saviink.com/" }], covers: ["saviink_1.png", "saviink_2.png", "saviink_3.png"] },
    { pseudo: "snuffcountry", style: "", description: "", reseaux: { instagram: "snuffcountry" }, liens: [], covers: ["snuffcountry_1.png", "snuffcountry_2.png", "snuffcountry_3.png"] },
    { pseudo: "brokelifephet", style: "", description: "", reseaux: { instagram: "brokelifephet" }, liens: [], covers: ["brokelife_1.png", "brokelife_2.png", "brokelife_3.png"] },
    { pseudo: "jglowiththeswitch", style: "", description: "", reseaux: { instagram: "jglowiththeswitch" }, liens: [], covers: ["jglo_1.png", "jglo_2.png", "jglo_3.png"] },
    { pseudo: "timing_santos", style: "", description: "", reseaux: { instagram: "timing_santos" }, liens: [], covers: ["timingsantos_1.png", "timingsantos_2.png", "timingsantos_3.png"] },
    { pseudo: "roxx1__", style: "", description: "", reseaux: { instagram: "roxx1__" }, liens: [], covers: ["roxxx_1.png", "roxxx_2.png", "roxxx_3.png"] },
    { pseudo: "editedbytucha", style: "", description: "", reseaux: { instagram: "editedbytucha" }, liens: [], covers: ["editedbytucha_1.png", "editedbytucha_2.png", "editedbytucha_3.png"] },
    { pseudo: "wasscoast", style: "", description: "", reseaux: { instagram: "wasscoast" }, liens: [], covers: ["wasscoast_1.png", "wasscoast_2.png", "wasscoast_3.png"] },
    { pseudo: "graffitibg_7", style: "", description: "", reseaux: { instagram: "graffitibg_7" }, liens: [], covers: ["graffitibg_1.png", "graffitibg_2.png", "graffitibg_3.png"] },
    { pseudo: "nightfall.network", style: "", description: "", reseaux: { instagram: "nightfall.network" }, liens: [], covers: ["nightfall_1.png", "nightfall_2.png", "nightfall_3.png"] },
    { pseudo: "pun.bizarre.adventure", style: "", description: "", reseaux: { instagram: "pun.bizarre.adventure" }, liens: [], covers: ["punbizarre_1.png", "punbizarre_2.png", "punbizarre_3.png"] },
    { pseudo: "sergeant_cash_critter", style: "", description: "", reseaux: { instagram: "sergeant_cash_critter" }, liens: [], covers: ["sergeantcash_1.png", "sergeantcash_2.png", "sergeantcash_3.png"] },
    { pseudo: "killkamau", style: "", description: "", reseaux: { instagram: "killkamau" }, liens: [], covers: ["killkamau_1.png", "killkamau_2.png", "killkamau_3.png"] },
    { pseudo: "nasuumi", style: "", description: "", reseaux: { instagram: "nasuumi" }, liens: [], covers: ["nasuumi_1.png", "nasuumi_2.png", "nasuumi_3.png"] },
    { pseudo: "rackzsaggin", style: "", description: "", reseaux: { instagram: "rackzsaggin" }, liens: [], covers: ["rackzsaggin_1.png", "rackzsaggin_2.png", "rackzsaggin_3.png"] },
    { pseudo: "djforeignmoney", style: "", description: "", reseaux: { instagram: "djforeignmoney" }, liens: [], covers: ["foreignmoney_1.png", "foreignmoney_2.png", "foreignmoney_3.png"] },
    { pseudo: "mikulasmaster", style: "", description: "", reseaux: { instagram: "mikulasmaster" }, liens: [], covers: ["mikulasmaster_1.png", "mikulasmaster_2.png", "mikulasmaster_3.png"] },
    { pseudo: "tseytlintseytlin", style: "", description: "", reseaux: { instagram: "tseytlintseytlin" }, liens: [], covers: ["tseytlin_1.png", "tseytlin_2.png", "tseytlin_3.png"] },
    { pseudo: "louisotd", style: "", description: "", reseaux: { instagram: "louisotd" }, liens: [], covers: ["louisotd_1.png", "louisotd_2.png", "louisotd_3.png"] },
    { pseudo: "lockedonmelrose", style: "", description: "", reseaux: { instagram: "lockedonmelrose" }, liens: [], covers: ["lockedonmelrose_1.png", "lockedonmelrose_2.png", "lockedonmelrose_3.png"] },
    { pseudo: "froiddenombre", style: "", description: "", reseaux: { instagram: "froiddenombre" }, liens: [], covers: ["froid2novembre_1.png", "froid2novembre_2.png", "froid2novembre_3.png"] },
    { pseudo: "artbynobart", style: "", description: "", reseaux: { instagram: "artbynobart" }, liens: [], covers: ["nobart_1.png", "nobart_2.png", "nobart_3.png"] },
    { pseudo: "p111nk", style: "", description: "", reseaux: { instagram: "p111nk" }, liens: [], covers: ["p1111nk_1.png", "p1111nk_2.png", "p1111nk_3.png"] },
    { pseudo: "vim.mania", style: "", description: "", reseaux: { instagram: "vim.mania" }, liens: [], covers: ["vim_mania_1.png", "vim_mania_2.png", "vim_mania_3.png"] },
    { pseudo: "8.8.8.8_8k", style: "", description: "", reseaux: { instagram: "8.8.8.8_8k" }, liens: [], covers: ["8888_1.png", "8888_2.png", "8888_3.png"] },
    { pseudo: "326moe", style: "", description: "", reseaux: { instagram: "326moe" }, liens: [], covers: ["326moe_1.png", "326moe_2.png", "326moe_3.png"] },
    { pseudo: "bye.miles", style: "", description: "", reseaux: { instagram: "bye.miles" }, liens: [], covers: ["byemiles_1.png", "byemiles_2.png", "byemiles_3.png"] },
    { pseudo: "solomgrund", style: "", description: "", reseaux: { instagram: "solomgrund" }, liens: [], covers: ["solomgrund_1.png", "solomgrund_2.png", "solomgrund_3.png"] },
    { pseudo: "v4mp1ric_", style: "", description: "", reseaux: { instagram: "v4mp1ric_" }, liens: [], covers: ["v4mp1r1c_1.png", "v4mp1r1c_2.png", "v4mp1r1c_3.png"] },
    { pseudo: "xnigxlnigxl", style: "", description: "", reseaux: { instagram: "xnigxlnigxl" }, liens: [], covers: ["nxglnxgl_1.png", "nxglnxgl_2.png", "nxglnxgl_3.png"] },
    { pseudo: "beam.portfolio", style: "", description: "", reseaux: { instagram: "beam.portfolio" }, liens: [], covers: ["beam_1.png", "beam_2.png", "beam_3.png"] },
    { pseudo: "hell.i.ot", style: "", description: "", reseaux: { instagram: "hell.i.ot" }, liens: [], covers: ["helliot_1.png", "helliot_2.png", "helliot_3.png"] },
    { pseudo: "crtr249", style: "", description: "", reseaux: { instagram: "crtr249" }, liens: [], covers: ["crtr_249_1.png", "crtr_249_2.png","crtr_249_3.png"] },
    { pseudo: "myleshcgrady", style: "", description: "", reseaux: { instagram: "myleshcgrady" }, liens: [], covers: ["mylesmcgrady_1.png", "mylesmcgrady_2.png", "mylesmcgrady_3.png"] },
    { pseudo: "snowinglondon", style: "", description: "", reseaux: { instagram: "snowinglondon" }, liens: [], covers: ["snowinginglondon_1.png", "snowinginglondon_2.png", "snowinginglondon_3.png"] },
    { pseudo: "borguimo", style: "", description: "", reseaux: { instagram: "borguimo" }, liens: [], covers: ["borguimo_1.png", "borguimo_2.png", "borguimo_3.png"] },
    { pseudo: "amari_oo", style: "", description: "", reseaux: { instagram: "amari_oo" }, liens: [], covers: ["amari_1.png", "amari_2.png", "amari_3.png"] },
    { pseudo: "scotttaylor_art", style: "", description: "", reseaux: { instagram: "scotttaylor_art" }, liens: [], covers: ["scotttaylor_1.png", "scotttaylor_2.png", "scotttaylor_3.png"] },
    { pseudo: "meonni__", style: "", description: "", reseaux: { instagram: "meonni__" }, liens: [], covers: ["meonni_1.png", "meonni_2.png", "meonni_3.png"] },
    { pseudo: "cincoflare", style: "", description: "", reseaux: { instagram: "cincoflare" }, liens: [], covers: ["cincoflare_1.png", "cincoflare_2.png", "cincoflare_3.png"] },
    { pseudo: "markusloewe_art", style: "", description: "", reseaux: { instagram: "markusloewe_art" }, liens: [], covers: ["markus_1.png", "markus_2.png", "markus_3.png"] },
    { pseudo: "feverdrive", style: "", description: "", reseaux: { instagram: "feverdrive" }, liens: [], covers: ["feverdrive_1.png", "feverdrive_2.png", "feverdrive_3.png"] },
    { pseudo: "spyrvl", style: "", description: "", reseaux: { instagram: "spyrvl" }, liens: [], covers: ["spyrvl_1.png", "spyrvl_2.png", "spyrvl_3.png"] },
    { pseudo: "gallery_provence", style: "", description: "", reseaux: { instagram: "gallery_provence" }, liens: [], covers: ["galleryprovence_1.png", "galleryprovence_2.png", "galleryprovence_3.png"] },
    { pseudo: "fritzsito", style: "", description: "", reseaux: { instagram: "fritzsito" }, liens: [], covers: ["fritzsito_1.png", "fritzsito_2.png", "fritzsito_3.png"] },
    { pseudo: "crocopolo", style: "", description: "", reseaux: { instagram: "crocopolo" }, liens: [], covers: ["crocopolo_1.png", "crocopolo_2.png", "crocopolo_3.png"] },
    { pseudo: "bleinbleinblein.xyz", style: "", description: "", reseaux: { instagram: "bleinbleinblein.xyz" }, liens: [], covers: ["blein_1.png", "blein_2.png", "blein_3.png"] },
    { pseudo: "youngpolyanagwap", style: "", description: "", reseaux: { instagram: "youngpolyanagwap" }, liens: [], covers: ["youngpolyana_1.png", "youngpolyana_2.png", "youngpolyana_3.png"] },
    { pseudo: "rejuz", style: "", description: "", reseaux: { instagram: "rejuz" }, liens: [], covers: ["rejuz_1.png","rejuz_2.png","rejuz_3.png"] },
    { pseudo: "absrdflexxedup", style: "", description: "", reseaux: { instagram: "absrdflexxedup" }, liens: [], covers: ["absrdflexxedup_1.png","absrdflexxedup_2.png","absrdflexxedup_3.png"] },
    { pseudo: "jahvelot", style: "", description: "", reseaux: { instagram: "jahvelot" }, liens: [], covers: ["jahvelot_1.png","jahvelot_2.png","jahvelot_3.png"] },
    { pseudo: "b4kedboy", style: "", description: "", reseaux: { instagram: "b4kedboy" }, liens: [], covers: ["b4kedboy_1.png","b4kedboy_2.png","b4kedboy_3.png"] },
    { pseudo: "plpvp", style: "", description: "", reseaux: { instagram: "plpvp" }, liens: [], covers: ["plpvp_1.png","plpvp_2.png","plpvp_3.png"] },
    { pseudo: "fsm_hollow", style: "", description: "", reseaux: { instagram: "fsm_hollow" }, liens: [], covers: ["fsmhollow_1.png","fsmhollow_2.png","fsmhollow_3.png"] },
    { pseudo: "coltonartt", style: "dessin numérique", description: "", reseaux: { instagram: "coltonartt" }, liens: [], covers: ["coltonartt_1.png","coltonartt_2.png","coltonartt_3.png"] },
    { pseudo: "deejayxen", style: "", description: "", reseaux: { instagram: "deejayxen" }, liens: [], covers: ["deejayxen_1.png","deejayxen_2.png","deejayxen_3.png"] }
];

const beatmakers = [
    { pseudo: "riversek", style: "crazy bouncy", description: "J'ai découvert grâce à Dialryckx, sur le morceau Marrgiela puis Circus flow m'a fait comprendre que je devais aller voir le profil et je n'est pas était déçu ! J'aime trop ses 808 grasses mélangé à des ambiances céleste vraiment j'adore !", reseaux: { instagram: "riverseksek" }, liens: [{ label: "YouTube", url: "https://www.youtube.com/@riverseksek/videos" }], youtube_id: "zyhI5Zhb3rc" },
    { pseudo: "fillette.318", style: "", description: "", reseaux: { instagram: "fillette.318" }, liens: [], youtube_id: "" },
    { pseudo: "prodpmoneee", style: "", description: "", reseaux: { instagram: "prodpmoneee" }, liens: [], youtube_id: "" },
    { pseudo: "prod.5petsnazgdz", style: "", description: "", reseaux: { instagram: "prod.5petsnazgdz" }, liens: [], youtube_id: "" },
    { pseudo: "countlittfroy", style: "", description: "", reseaux: { instagram: "countlittfroy" }, liens: [], youtube_id: "" },
    { pseudo: "yxngwaga", style: "", description: "", reseaux: { instagram: "yxngwaga" }, liens: [], youtube_id: "" },
    { pseudo: "noautospaz", style: "", description: "", reseaux: { instagram: "noautospaz" }, liens: [], youtube_id: "" },
    { pseudo: "ncxtzxstr1", style: "", description: "", reseaux: { instagram: "ncxtzxstr1" }, liens: [], youtube_id: "" },
    { pseudo: "ninagen", style: "", description: "", reseaux: { instagram: "ninagen" }, liens: [], youtube_id: "" },
    { pseudo: "flatoutflatoutflatout", style: "", description: "", reseaux: { instagram: "flatoutflatoutflatout" }, liens: [], youtube_id: "" },
    { pseudo: "lonelaflare", style: "", description: "", reseaux: { instagram: "lonelaflare" }, liens: [], youtube_id: "" },
    { pseudo: "whyfiveee", style: "", description: "", reseaux: { instagram: "whyfiveee" }, liens: [], youtube_id: "" },
    { pseudo: "prodkip", style: "", description: "", reseaux: { instagram: "prodkip" }, liens: [], youtube_id: "" },
    { pseudo: "gen6", style: "", description: "", reseaux: { instagram: "gen6" }, liens: [], youtube_id: "" },
    { pseudo: "chirurgyyy", style: "", description: "", reseaux: { instagram: "chirurgyyy" }, liens: [], youtube_id: "" },
    { pseudo: "1ballonboy", style: "", description: "", reseaux: { instagram: "1ballonboy" }, liens: [], youtube_id: "" },
    { pseudo: "mercizealest", style: "", description: "", reseaux: { instagram: "mercizealest" }, liens: [], youtube_id: "" },
    { pseudo: "esabekayoe", style: "", description: "", reseaux: { instagram: "esabekayoe" }, liens: [], youtube_id: "" },
    { pseudo: "1yungvalentino", style: "", description: "", reseaux: { instagram: "1yungvalentino" }, liens: [], youtube_id: "" },
    { pseudo: "slym3typhoon", style: "", description: "", reseaux: { instagram: "slym3typhoon" }, liens: [], youtube_id: "" },
    { pseudo: "blkoloup", style: "", description: "", reseaux: { instagram: "blkoloup" }, liens: [], youtube_id: "" },
    { pseudo: "prodjudah", style: "", description: "", reseaux: { instagram: "prodjudah" }, liens: [], youtube_id: "" },
    { pseudo: "prodwexszn", style: "", description: "", reseaux: { instagram: "prodwexszn" }, liens: [], youtube_id: "" },
    { pseudo: "ffolio", style: "", description: "", reseaux: { instagram: "ffolio" }, liens: [], youtube_id: "" },
    { pseudo: "yannoski_3", style: "", description: "", reseaux: { instagram: "yannoski_3" }, liens: [], youtube_id: "" },
    { pseudo: "sylvan_dekens", style: "", description: "", reseaux: { instagram: "sylvan_dekens" }, liens: [], youtube_id: "" },
    { pseudo: "perc40", style: "", description: "", reseaux: { instagram: "perc40" }, liens: [], youtube_id: "" },
    { pseudo: "yungstxxzy", style: "", description: "", reseaux: { instagram: "yungstxxzy" }, liens: [], youtube_id: "" },
    { pseudo: "glozula", style: "", description: "", reseaux: { instagram: "glozula" }, liens: [], youtube_id: "" },
    { pseudo: "stabneez", style: "", description: "", reseaux: { instagram: "stabneez" }, liens: [], youtube_id: "" },
    { pseudo: "itz36", style: "", description: "", reseaux: { instagram: "itz36" }, liens: [], youtube_id: "" },
    { pseudo: "bricksy2x", style: "", description: "", reseaux: { instagram: "bricksy2x" }, liens: [], youtube_id: "" },
    { pseudo: "medams.mp3", style: "", description: "", reseaux: { instagram: "medams.mp3" }, liens: [], youtube_id: "" },
    { pseudo: "nyli2b", style: "", description: "", reseaux: { instagram: "nyli2b" }, liens: [], youtube_id: "" },
    { pseudo: "fuckkashemir", style: "", description: "", reseaux: { instagram: "fuckkashemir" }, liens: [], youtube_id: "" },
    { pseudo: "1percshawty", style: "", description: "", reseaux: { instagram: "1percshawty" }, liens: [], youtube_id: "" },
    { pseudo: "_1paymels_", style: "", description: "", reseaux: { instagram: "_1paymels_" }, liens: [], youtube_id: "" },
    { pseudo: "milanezie", style: "", description: "", reseaux: { instagram: "milanezie" }, liens: [], youtube_id: "" },
    { pseudo: "ttdafool", style: "", description: "", reseaux: { instagram: "ttdafool" }, liens: [], youtube_id: "" },
    { pseudo: "jus8x", style: "", description: "", reseaux: { instagram: "jus8x" }, liens: [], youtube_id: "" },
    { pseudo: "prod.oxead", style: "", description: "", reseaux: { instagram: "prod.oxead" }, liens: [], youtube_id: "" },
    { pseudo: "xantosbeatz", style: "", description: "", reseaux: { instagram: "xantosbeatz" }, liens: [], youtube_id: "" },
    { pseudo: "pes020k", style: "", description: "", reseaux: { instagram: "pes020k" }, liens: [], youtube_id: "" },
    { pseudo: "_v900_", style: "", description: "", reseaux: { instagram: "_v900_" }, liens: [], youtube_id: "" },
    { pseudo: "tay20k", style: "", description: "", reseaux: { instagram: "tay20k" }, liens: [], youtube_id: "" },
    { pseudo: "1deejaysammy", style: "", description: "", reseaux: { instagram: "1deejaysammy" }, liens: [], youtube_id: "" },
    { pseudo: "mexikodro", style: "", description: "", reseaux: { instagram: "mexikodro" }, liens: [], youtube_id: "" },
    { pseudo: "zaytoven", style: "", description: "", reseaux: { instagram: "zaytoven" }, liens: [], youtube_id: "" },
    { pseudo: "dbglokk", style: "", description: "", reseaux: { instagram: "dbglokk" }, liens: [], youtube_id: "" },
    { pseudo: "1freaky", style: "", description: "", reseaux: { instagram: "1freaky" }, liens: [], youtube_id: "" },
    { pseudo: "mag.nis", style: "", description: "", reseaux: { instagram: "mag.nis" }, liens: [], youtube_id: "" },
    { pseudo: "xemarax", style: "", description: "", reseaux: { instagram: "xemarax" }, liens: [], youtube_id: "" },
    { pseudo: "prodhh", style: "", description: "", reseaux: { instagram: "prodhh" }, liens: [], youtube_id: "" },
    { pseudo: "20xx_01", style: "", description: "", reseaux: { instagram: "20xx_01" }, liens: [], youtube_id: "" },
    { pseudo: "leshee___", style: "", description: "", reseaux: { instagram: "leshee___" }, liens: [], youtube_id: "" },
    { pseudo: "aghstt", style: "", description: "", reseaux: { instagram: "aghstt" }, liens: [], youtube_id: "" },
    { pseudo: "sytruzbeats", style: "", description: "", reseaux: { instagram: "sytruzbeats" }, liens: [], youtube_id: "" },
    { pseudo: "evilgiane", style: "", description: "", reseaux: { instagram: "evilgiane" }, liens: [], youtube_id: "" },
    { pseudo: "stoopidxool", style: "", description: "", reseaux: { instagram: "stoopidxool" }, liens: [], youtube_id: "" },
    { pseudo: "lilskamx", style: "", description: "", reseaux: { instagram: "lilskamx" }, liens: [], youtube_id: "" },
    { pseudo: "gspmain", style: "", description: "", reseaux: { instagram: "gspmain" }, liens: [], youtube_id: "" },
    { pseudo: "cashcache", style: "", description: "", reseaux: { instagram: "cashcache" }, liens: [], youtube_id: "" },
    { pseudo: "sxprano", style: "", description: "", reseaux: { instagram: "sxprano" }, liens: [], youtube_id: "" },
    { pseudo: "1globalk", style: "", description: "", reseaux: { instagram: "1globalk" }, liens: [], youtube_id: "" },
    { pseudo: "shxytsu", style: "", description: "", reseaux: { instagram: "shxytsu" }, liens: [], youtube_id: "" },
    { pseudo: "1ksensai", style: "", description: "", reseaux: { instagram: "1ksensai" }, liens: [], youtube_id: "" },
    { pseudo: "13thall_", style: "", description: "", reseaux: { instagram: "13thall_" }, liens: [], youtube_id: "" },
    { pseudo: "prodkanser", style: "", description: "", reseaux: { instagram: "prodkanser" }, liens: [], youtube_id: "" },
    { pseudo: "6pa___", style: "", description: "", reseaux: { instagram: "6pa___" }, liens: [], youtube_id: "" },
    { pseudo: "1prodbytn", style: "", description: "", reseaux: { instagram: "1prodbytn" }, liens: [], youtube_id: "" },
    { pseudo: "emcccee", style: "", description: "", reseaux: { instagram: "emcccee" }, liens: [], youtube_id: "" },
    { pseudo: "c4000plug", style: "", description: "", reseaux: { instagram: "c4000plug" }, liens: [], youtube_id: "" },
    { pseudo: "gustavio_topman", style: "", description: "", reseaux: { instagram: "gustavio_topman" }, liens: [], youtube_id: "" },
    { pseudo: "prodkache", style: "", description: "", reseaux: { instagram: "prodkache" }, liens: [], youtube_id: "" },
    { pseudo: "prod.r888", style: "", description: "", reseaux: { instagram: "prod.r888" }, liens: [], youtube_id: "" },
    { pseudo: "1demna", style: "", description: "", reseaux: { instagram: "1demna" }, liens: [], youtube_id: "" },
    { pseudo: "fenka213", style: "", description: "", reseaux: { instagram: "fenka213" }, liens: [], youtube_id: "" },
    { pseudo: "1terror", style: "", description: "", reseaux: { instagram: "1terror" }, liens: [], youtube_id: "" },
    { pseudo: "prodby.014", style: "", description: "", reseaux: { instagram: "prodby.014" }, liens: [], youtube_id: "" },
    { pseudo: "gapebrazy", style: "", description: "", reseaux: { instagram: "gapebrazy" }, liens: [], youtube_id: "" },
    { pseudo: "djcodeinwar", style: "", description: "", reseaux: { instagram: "djcodeinwar" }, liens: [], youtube_id: "" },
    { pseudo: "used2that", style: "", description: "", reseaux: { instagram: "used2that" }, liens: [], youtube_id: "" },
    { pseudo: "nathanroyt_roy", style: "", description: "", reseaux: { instagram: "nathanroyt_roy" }, liens: [], youtube_id: "" },
    { pseudo: "1voido", style: "", description: "", reseaux: { instagram: "1voido" }, liens: [], youtube_id: "" },
    { pseudo: "kamanugue", style: "", description: "", reseaux: { instagram: "kamanugue" }, liens: [], youtube_id: "" },
    { pseudo: "vlash4ever", style: "", description: "", reseaux: { instagram: "vlash4ever" }, liens: [], youtube_id: "" },
    { pseudo: "444.jet", style: "", description: "", reseaux: { instagram: "444.jet" }, liens: [], youtube_id: "" },
    { pseudo: "cruwiththe2", style: "", description: "", reseaux: { instagram: "cruwiththe2" }, liens: [], youtube_id: "" },
    { pseudo: "407krxxk", style: "", description: "", reseaux: { instagram: "407krxxk" }, liens: [], youtube_id: "" },
    { pseudo: "louisbrodinski", style: "", description: "", reseaux: { instagram: "louisbrodinski" }, liens: [], youtube_id: "" }
];
const alaune = [
    {
        titre: "Incurable",
        artiste: "Dialryckx",
        credits: "",
        description: "Dernier projet de Dialryckx",
        spotify: "https://open.spotify.com/embed/album/0LRqvzb0xDvIxPhRZfiw5s?utm_source=generator",
        soundcloud: "lien soundcloud",
        youtube_id: "ID YouTube",
        lien: "lien externe"
    },

    {
    titre: "goƪ(˘⌣˘)ʃne",
    artiste: "gone",
    credits: "",
    description: "",
    spotify: "https://open.spotify.com/embed/album/1THNgUYAqMLjEvBmLKtRio?utm_source=generator",
    soundcloud: "",
    youtube_id: "",
    lien: ""
},

{
    titre: "Archives Vol. 1",
    artiste: "Floki",
    credits: "",
    description: "",
    spotify:"https://open.spotify.com/embed/album/6Q6SyS0DRh3vRjnS3jTOAr?utm_source=generator",
    soundcloud: "",
    youtube_id: "",
    lien: ""
}
];

coverartists.forEach(function(artiste) {
    const tag = document.createElement("div");
    tag.classList.add("ref-tag");
    tag.textContent = artiste.pseudo;
    tag.addEventListener("click", function(e) {
        sons.clik.currentTime = 0;
        sons.clik.play();
        e.stopPropagation();
        ouvrirCarteArtiste(artiste, "cover");
    });
    document.getElementById("liste-graphistes").appendChild(tag);
});

beatmakers.forEach(function(artiste) {
    const tag = document.createElement("div");
    tag.classList.add("ref-tag");
    tag.textContent = artiste.pseudo;
    tag.addEventListener("click", function(e) {
        sons.clik.currentTime = 0;
        sons.clik.play();
        e.stopPropagation();
        ouvrirCarteArtiste(artiste, "beatmaker");
    });
    document.getElementById("liste-beatmakers").appendChild(tag);
});

alaune.forEach(function(projet) {
    const carte = document.createElement("div");
    carte.classList.add("alaune-carte");
    carte.innerHTML = "<strong>" + projet.titre + "</strong><br>" + projet.artiste;
    carte.addEventListener("click", function() {
        sons.clik.currentTime = 0;
        sons.clik.play();
        ouvrirFicheAlaune(projet);
    });
    document.getElementById("liste-alaune").appendChild(carte);
});

document.querySelectorAll(".ref-header").forEach(function(header) {
    header.addEventListener("click", function() {
        const liste = header.nextElementSibling.nextElementSibling;
        const description = header.nextElementSibling;
        const fleche = header.querySelector(".ref-fleche");
        if (liste.classList.contains("ref-fermee")) {
            liste.classList.remove("ref-fermee");
            description.style.display = "block";
            fleche.textContent = "▼";
        } else {
            liste.classList.add("ref-fermee");
            description.style.display = "none";
            fleche.textContent = "▶";
        }
    });
});

document.querySelector("#fenetre-partage .fenetre-fermer").addEventListener("click", function() {
    sons.retour.currentTime = 0;
    sons.retour.play();
    document.getElementById("fenetre-partage").style.display = "none";
});

document.querySelector("#fenetre-partage .fenetre-reduire").addEventListener("click", function() {
    const contenu = document.querySelector("#fenetre-partage .fenetre-contenu");
    contenu.style.display = contenu.style.display === "none" ? "block" : "none";
});

const fenetreBarre = document.querySelector("#fenetre-partage .fenetre-barre");
let isDragging = false;
let startX, startY, startLeft, startTop;

fenetreBarre.addEventListener("mousedown", function(e) {
    isDragging = true;
    const fenetre = document.getElementById("fenetre-partage");
    startX = e.clientX;
    startY = e.clientY;
    startLeft = fenetre.offsetLeft;
    startTop = fenetre.offsetTop;
});

document.addEventListener("mousemove", function(e) {
    if (!isDragging) return;
    const fenetre = document.getElementById("fenetre-partage");
    fenetre.style.left = (startLeft + e.clientX - startX) + "px";
    fenetre.style.top = (startTop + e.clientY - startY) + "px";
});

document.addEventListener("mouseup", function() {
    isDragging = false;
});

function ouvrirCarteArtiste(artiste, type) {
    let carte = document.getElementById("fenetre-carte-artiste");
    let playerCree = false;
    if (!carte) {
        carte = document.createElement("div");
        carte.id = "fenetre-carte-artiste";
        carte.classList.add("fenetre");
        carte.style.width = "600px";
        carte.style.minHeight = "auto";
        carte.style.left = "720px";
        carte.style.top = "100px";
        carte.innerHTML = `
            <div class="fenetre-barre" id="barre-carte">
                <span class="fenetre-titre">Profil</span>
                <div class="fenetre-controls">
                    <button class="fenetre-fermer-carte">✕</button>
                </div>
            </div>
            <div id="visualiseur-bg"></div>
            <div class="fenetre-contenu" id="carte-contenu"></div>
            
        `;
        document.body.appendChild(carte);
        const visu = carte.querySelector("#visualiseur-bg");
for (let i = 0; i < 40; i++) {
    const barre = document.createElement("div");
    barre.classList.add("visu-barre");
    const hauteur = Math.floor(Math.random() * 90 + 20) + "px";
    const duree = (Math.random() * 0.8 + 0.3).toFixed(2) + "s";
    barre.style.setProperty("--hauteur", hauteur);
    barre.style.setProperty("--duree", duree);
    barre.style.animationDelay = (Math.random() * 0.5).toFixed(2) + "s";
    visu.appendChild(barre);
}

        carte.querySelector(".fenetre-fermer-carte").addEventListener("click", function() {
            sons.retour.currentTime = 0;
            sons.retour.play();
            carte.style.display = "none";
        });

        const barre = carte.querySelector("#barre-carte");
        let drag = false, sx, sy, sl, st;
        barre.addEventListener("mousedown", function(e) {
            drag = true;
            sx = e.clientX; sy = e.clientY;
            sl = carte.offsetLeft; st = carte.offsetTop;
        });
        document.addEventListener("mousemove", function(e) {
            if (!drag) return;
            carte.style.left = (sl + e.clientX - sx) + "px";
            carte.style.top = (st + e.clientY - sy) + "px";
        });
        document.addEventListener("mouseup", function() { drag = false; });
    }

    const contenu = carte.querySelector("#carte-contenu");
    const sectionDroite = type === "beatmaker" ? `
    ${artiste.youtube_id ? `
    <div style="display:flex; flex-direction:column; gap:8px; border-left:1px solid #808080; padding-left:16px;">
        <div style="font-size:9px; letter-spacing:3px; color:#808080; text-transform:uppercase;">Écouter</div>
        <div id="yt-player-${artiste.pseudo}"></div>
    </div>` : ""}
` : `
    ${artiste.covers && artiste.covers.length ? `
    <div style="display:flex; flex-direction:column; gap:8px; border-left:1px solid #808080; padding-left:16px;">
        <div style="font-size:9px; letter-spacing:3px; color:#808080; text-transform:uppercase;">Covers</div>
        <div style="display:flex; gap:8px; align-items:center;">
            <img src="images/${artiste.covers[0]}" style="width:200px; height:200px; object-fit:cover;">
            <img src="images/${artiste.covers[1]}" style="width:230px; height:230px; object-fit:cover;">
            <img src="images/${artiste.covers[2]}" style="width:200px; height:200px; object-fit:cover;">
        </div>
    </div>` : ""}
`;

contenu.innerHTML = `
<div style="display:flex; gap:16px; font-family:'Courier New',monospace;">
    <div style="display:flex; flex-direction:column; gap:6px; min-width:220px;">
        <div style="font-size:16px; letter-spacing:3px; text-transform:uppercase; color:#1f2020;">${artiste.pseudo}</div>
        <div style="font-size:13px; letter-spacing:3px; color:#808080; text-transform:uppercase; margin-top:4px;">Style</div>
        <div style="font-size:15px; letter-spacing:2px; color:#ec911a;">${artiste.style}</div>
        <div style="font-size:13px; letter-spacing:3px; color:#808080; text-transform:uppercase; margin-top:4px;">Description</div>
        <div style="font-size:15px; letter-spacing:1px; color:#808080; line-height:1.6;">${artiste.description}</div>
        <div style="font-size:13px; letter-spacing:3px; color:#808080; text-transform:uppercase; margin-top:4px;">Réseaux</div>
        <div style="font-size:15px; letter-spacing:2px; color:#404040;">
            ${artiste.reseaux.instagram ? `<a href="https://instagram.com/${artiste.reseaux.instagram}" target="_blank" style="color:#ec911a; text-decoration:none;">@${artiste.reseaux.instagram}</a>` : ""}
        </div>
        <div style="font-size:13px; letter-spacing:3px; color:#808080; text-transform:uppercase; margin-top:4px;">Liens</div>
        <div style="display:flex; flex-direction:column; gap:4px;">
            ${artiste.liens && artiste.liens.length ? artiste.liens.map(l => `<a href="${l.url}" target="_blank" style="font-size:11px; letter-spacing:2px; color:#0a246a; text-decoration:underline;">${l.label}</a>`).join("") : ""}
        </div>
    </div>
    ${sectionDroite}
</div>
`;
    carte.style.display = "block";
    carte.classList.remove("fenetre-visible");
    setTimeout(() => carte.classList.add("fenetre-visible"), 10);

    if (artiste.youtube_id) {
    function creerPlayer() {
        if (typeof YT !== "undefined" && YT.Player) {
            new YT.Player(`yt-player-${artiste.pseudo}`, {
                height: "200",
                width: "320",
                videoId: artiste.youtube_id,
                events: {
                    onStateChange: function(e) {
                        const barres = carte.querySelectorAll(".visu-barre");
                        if (e.data === YT.PlayerState.PLAYING) {
                            barres.forEach(b => {
                                b.classList.add("playing");
                                b.classList.remove("pause");
                            });
                        } else {
                            barres.forEach(b => {
                                b.classList.remove("playing");
                                b.classList.add("pause");
                            });
                        }
                    }
                }
            });
        } else {
            setTimeout(creerPlayer, 100);
        }
    }
    creerPlayer();
}
}

function ouvrirFicheAlaune(projet) {
    let fenetre = document.getElementById("fenetre-alaune");
    if (!fenetre) {
        fenetre = document.createElement("div");
        fenetre.id = "fenetre-alaune";
        fenetre.classList.add("fenetre");
        fenetre.style.width = "500px";
        fenetre.style.left = "200px";
        fenetre.style.top = "150px";
        fenetre.innerHTML = `
            <div class="fenetre-barre" id="barre-alaune">
                <span class="fenetre-titre">À la une</span>
                <div class="fenetre-controls">
                    <button class="fenetre-fermer-alaune">✕</button>
                </div>
            </div>
            <div class="fenetre-contenu" id="alaune-contenu"></div>
        `;
        document.body.appendChild(fenetre);

        fenetre.querySelector(".fenetre-fermer-alaune").addEventListener("click", function() {
            sons.retour.currentTime = 0;
            sons.retour.play();
            fenetre.style.display = "none";
        });

        const barre = fenetre.querySelector("#barre-alaune");
        let drag = false, sx, sy, sl, st;
        barre.addEventListener("mousedown", function(e) {
            drag = true;
            sx = e.clientX; sy = e.clientY;
            sl = fenetre.offsetLeft; st = fenetre.offsetTop;
        });
        document.addEventListener("mousemove", function(e) {
            if (!drag) return;
            fenetre.style.left = (sl + e.clientX - sx) + "px";
            fenetre.style.top = (st + e.clientY - sy) + "px";
        });
        document.addEventListener("mouseup", function() { drag = false; });
    }

    const contenu = fenetre.querySelector("#alaune-contenu");
    contenu.innerHTML = `
        <div style="font-family:'Courier New',monospace; display:flex; flex-direction:column; gap:12px;">
            <div style="font-size:20px; letter-spacing:3px; text-transform:uppercase; color:#1f2020;">${projet.titre}</div>
            <div style="font-size:15px; letter-spacing:2px; color:#ec911a;">${projet.artiste}</div>
            ${projet.credits ? `<div style="font-size:13px; letter-spacing:2px; color:#808080;">${projet.credits}</div>` : ""}
            ${projet.description ? `<div style="font-size:13px; letter-spacing:1px; color:#808080; line-height:1.6;">${projet.description}</div>` : ""}
            ${projet.spotify ? `<iframe src="${projet.spotify}" width="100%" height="550" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style="border:1px solid #808080;"></iframe>` : ""}
            ${projet.soundcloud && projet.soundcloud !== "lien soundcloud" ? `<iframe width="100%" height="80" src="https://w.soundcloud.com/player/?url=${encodeURIComponent(projet.soundcloud)}&auto_play=false" frameborder="0"></iframe>` : ""}
            ${projet.youtube_id && projet.youtube_id !== "ID YouTube" ? `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${projet.youtube_id}" frameborder="0" allowfullscreen style="border:1px solid #808080;"></iframe>` : ""}
            ${projet.lien && projet.lien !== "lien externe" ? `<a href="${projet.lien}" target="_blank" style="font-size:10px; letter-spacing:2px; color:#0a246a; text-decoration:underline;">Voir le projet →</a>` : ""}
        </div>
    `;

    fenetre.style.display = "block";
    fenetre.classList.remove("fenetre-visible");
    setTimeout(() => fenetre.classList.add("fenetre-visible"), 10);
}

let webampScriptCharge = false;

function creerWebamp() {
    document.getElementById("webamp-container").innerHTML = "";
    const webamp = new Webamp({
        initialSkin: { url: "winamp_skin/SpyampOrange.wsz" }
    });
    webamp.renderWhenReady(document.getElementById("webamp-container")).then(() => {
        webamp.appendTracks([
            { metaData: { artist: "@spetsnazgdz @yxngwaga", title: "game 144" }, url: "radio_moelleuse/spetsnazgdz_yxngwaga_game_144.mp3" },
            { metaData: { artist: "@spetsnazgdz @why5 @ninagen", title: "ref" }, url: "radio_moelleuse/spetsnazgdz_why5_ninagen_ref.mp3" },
            { metaData: { artist: "@spetsnazgdz @why5", title: "flight 151" }, url: "radio_moelleuse/spetsnazgdz_why5_flight_151.mp3" },
            { metaData: { artist: "@spetsnazgdz @why5", title: "cult 140" }, url: "radio_moelleuse/spetsnazgdz_why5_cult_140.mp3" }
        ]);
        document.querySelectorAll("[class*='webamp']").forEach(el => {
            el.style.zIndex = "99999";
        });
        setTimeout(() => {
            const closeBtn = document.querySelector("[class*='closeButton']");
            if (closeBtn) {
                const newBtn = closeBtn.cloneNode(true);
                closeBtn.parentNode.replaceChild(newBtn, closeBtn);
                newBtn.addEventListener("click", function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    document.querySelectorAll("[class*='webamp']").forEach(el => {
                        el.style.display = "none";
                    });
                });
            }
        }, 500);
    });
}

function ouvrirRadio() {
    if (!webampScriptCharge) {
        webampScriptCharge = true;
        const script = document.createElement("script");
        script.src = "webamp.bundle.min.js";
        script.onload = creerWebamp;
        document.head.appendChild(script);
    } else {
        creerWebamp();
    }
}

document.getElementById("audio-volume").addEventListener("input", function() {
    const vol = this.value / 100;
    sons.fond.volume = vol;
});

document.getElementById("audio-toggle").addEventListener("click", function() {
    if (sons.fond.muted) {
        sons.fond.muted = false;
        this.textContent = "🔊";
    } else {
        sons.fond.muted = true;
        this.textContent = "🔇";
    }
});