
// ====== PLAYLIST DE DIEGO (mets ses fichiers dans le dossier itsdie4u/) ======
const playlist = [
    { titre: "CRANKLOVER", url: "itsdie4u/cranklover.mp3" },
    { titre: "HEAD",       url: "itsdie4u/head.mp3" },
    { titre: "JOLO",       url: "itsdie4u/jolo.mp3" },
    { titre: "KOSMO",      url: "itsdie4u/kosmo.mp3" },
    { titre: "LA PLAGE",   url: "itsdie4u/la_plage.mp3" },
    { titre: "PEUT-ÊTRE",  url: "itsdie4u/peut_etre.mp3" },
    { titre: "PIPIANO",    url: "itsdie4u/pipiano.mp3" },
];
// ============================================================================

const audio = document.getElementById("audio");
const ecran = document.getElementById("ecran");
const ecranTitre = document.querySelector("#ecran-titre span");
const ecranTemps = document.getElementById("ecran-temps");
const hautParleurs = document.getElementById("haut-parleurs");
let piste = 0;

function fmt(s) {
    if (isNaN(s)) return "00:00";
    const m = Math.floor(s / 60), r = Math.floor(s % 60);
    return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
}
function majTemps() {
    const total = audio.duration ? fmt(audio.duration) : "--:--";
    ecranTemps.textContent = fmt(audio.currentTime) + " / " + total;
}
function majTitre() { ecranTitre.textContent = (playlist[piste] && playlist[piste].titre) || "—"; }
function majPiste() {
    const n = String(piste + 1).padStart(2, "0");
    const t = String(playlist.length).padStart(2, "0");
    document.getElementById("ecran-piste").textContent = n + " / " + t;
}
function majFormat() {
    const url = playlist[piste] ? playlist[piste].url : "";
    const ext = (url.split(".").pop() || "").toUpperCase();
    document.getElementById("ecran-format").textContent = ext + " · 320 KBPS · STEREO";
}
function charger(i) {
    piste = (i + playlist.length) % playlist.length;
    audio.src = playlist[piste].url;
    majTitre(); majPiste(); majFormat(); majTemps();
}

function jouer() {
    if (!playlist[piste] || !playlist[piste].url) return;
    initAudio();
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    audio.play();
}
function mettrePause() { audio.pause(); }
function suivant() { charger(piste + 1); jouer(); }
function precedent() { charger(piste - 1); jouer(); }
const actions = { prev: precedent, play: jouer, pause: mettrePause, next: suivant };

document.querySelectorAll(".hotspot[data-action]").forEach(function(hs) {
    const grise = document.getElementById(hs.dataset.grise);
    const presser = () => { if (grise) grise.style.opacity = 1; };
    const relacher = () => { if (grise) grise.style.opacity = 0; };
    hs.addEventListener("mousedown", presser);
    hs.addEventListener("mouseup", relacher);
    hs.addEventListener("mouseleave", relacher);
    hs.addEventListener("touchstart", presser, { passive: true });
    hs.addEventListener("touchend", relacher);
    hs.addEventListener("click", function() {
        const a = actions[hs.dataset.action];
        if (a) a();
    });
});

const knob = document.getElementById("knob");
const hsKnob = document.getElementById("hs-knob");
const ANGLE_MIN = -135, ANGLE_MAX = 135;
let volume = 0.7;

function appliquerKnob() {
    const angle = ANGLE_MIN + volume * (ANGLE_MAX - ANGLE_MIN);
    knob.style.transform = "rotate(" + angle + "deg)";
    audio.volume = volume;
}
appliquerKnob();

let drag = false;
function angleSouris(e) {
    const r = hsKnob.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const px = (e.touches ? e.touches[0].clientX : e.clientX);
    const py = (e.touches ? e.touches[0].clientY : e.clientY);
    let a = Math.atan2(py - cy, px - cx) * 180 / Math.PI + 90;
    if (a > 180) a -= 360;
    return a;
}
function majDepuisSouris(e) {
    let a = angleSouris(e);
    a = Math.max(ANGLE_MIN, Math.min(ANGLE_MAX, a));
    volume = (a - ANGLE_MIN) / (ANGLE_MAX - ANGLE_MIN);
    appliquerKnob();
    ecranTitre.textContent = "VOL " + Math.round(volume * 100) + "%";
    clearTimeout(majDepuisSouris._t);
    majDepuisSouris._t = setTimeout(majTitre, 900);
}
hsKnob.addEventListener("mousedown", function(e) { drag = true; majDepuisSouris(e); });
hsKnob.addEventListener("touchstart", function(e) { drag = true; majDepuisSouris(e); }, { passive: true });
document.addEventListener("mousemove", function(e) { if (drag) majDepuisSouris(e); });
document.addEventListener("touchmove", function(e) { if (drag) majDepuisSouris(e); }, { passive: true });
document.addEventListener("mouseup", function() { drag = false; });
document.addEventListener("touchend", function() { drag = false; });

let audioCtx, analyser, dataArray;
let nivBass = 0, nivHigh = 0;

// === Réglages des enceintes ===
const INTENSITE  = 0.10;  // ampleur du pump (monte pour des coups plus gros)
const SEUIL_BASS = 0.40;  // + haut = ne réagit QU'aux gros kicks (0.4 = plus sensible)
const SEUIL_HIGH = 0.20;  // pareil pour les petites enceintes (aigus)
// ==============================

const hps = document.querySelectorAll(".hp");
function porte(v, seuil) { v = (v - seuil) / (1 - seuil); return v > 0 ? v : 0; }

function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audio);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    pulser();
}
function pulser() {
    requestAnimationFrame(pulser);
    if (!analyser) return;
    analyser.getByteFrequencyData(dataArray);
    let bass = (dataArray[1] + dataArray[2] + dataArray[3] + dataArray[4]) / 4 / 255;
    let high = (dataArray[24] + dataArray[28] + dataArray[34] + dataArray[40]) / 4 / 255;
    bass = Math.pow(porte(bass, SEUIL_BASS), 1.4);  // ne garde que les vrais coups
    high = Math.pow(porte(high, SEUIL_HIGH), 1.4);
    nivBass = bass > nivBass ? bass : nivBass * 0.85 + bass * 0.15; // attaque sèche, retombée douce
    nivHigh = high > nivHigh ? high : nivHigh * 0.82 + high * 0.18;
    hps.forEach(function(hp) {
        const n = hp.dataset.band === "high" ? nivHigh : nivBass;
        hp.style.transform = "translate(-50%, -50%) scale(" + (1 + n * INTENSITE).toFixed(4) + ")";
    });
}

// ===== BARRE DE DÉFILEMENT =====
const seek = document.getElementById("seek");
const seekRempli = document.getElementById("seek-rempli");
let seekDrag = false;
function posSeek(e) {
    const r = seek.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    return Math.max(0, Math.min(1, x / r.width));
}
function appliquerSeek(e) {
    if (!audio.duration) return;
    const p = posSeek(e);
    audio.currentTime = p * audio.duration;
    seekRempli.style.width = (p * 100) + "%";
}
seek.addEventListener("mousedown", function(e) { seekDrag = true; appliquerSeek(e); });
seek.addEventListener("touchstart", function(e) { seekDrag = true; appliquerSeek(e); }, { passive: true });
document.addEventListener("mousemove", function(e) { if (seekDrag) appliquerSeek(e); });
document.addEventListener("touchmove", function(e) { if (seekDrag) appliquerSeek(e); }, { passive: true });
document.addEventListener("mouseup", function() { seekDrag = false; });
document.addEventListener("touchend", function() { seekDrag = false; });

audio.addEventListener("timeupdate", function() {
    majTemps();
    if (!seekDrag && audio.duration) seekRempli.style.width = (audio.currentTime / audio.duration * 100) + "%";
});
audio.addEventListener("loadedmetadata", majTemps);
audio.addEventListener("ended", suivant);
audio.addEventListener("play",  function() { ecran.classList.add("on"); });
audio.addEventListener("pause", function() { ecran.classList.remove("on"); });

// ===== VISUALISEUR (panneau du bas) =====
const vizCanvas = document.getElementById("viz");
const vizCtx = vizCanvas.getContext("2d");
const vizData = new Uint8Array(64);
function dessinerViz() {
    requestAnimationFrame(dessinerViz);
    const W = vizCanvas.width, H = vizCanvas.height;
    vizCtx.clearRect(0, 0, W, H);
    if (!analyser) return;
    analyser.getByteFrequencyData(vizData);
    const nb = 44, larg = W / nb;
    vizCtx.shadowColor = "rgba(236,145,26,0.8)";
    vizCtx.shadowBlur = 6;
    for (let i = 0; i < nb; i++) {
        const bin = 1 + Math.floor(i / nb * 48);
        const v = vizData[bin] / 255;
        const h = Math.pow(v, 1.4) * H;
        vizCtx.fillStyle = "rgba(236,145,26," + (0.35 + v * 0.65) + ")";
        vizCtx.fillRect(i * larg + larg * 0.15, H - h, larg * 0.7, h);
    }
}
dessinerViz();

charger(0);

// ===== PLAYLIST AFFICHÉE =====
const liste = document.getElementById("liste");
const listeBtn = document.getElementById("ecran-liste-btn");
function construireListe() {
    liste.innerHTML = "";
    playlist.forEach(function(t, i) {
        const el = document.createElement("div");
        el.className = "item" + (i === piste ? " actif" : "");
        el.textContent = String(i + 1).padStart(2, "0") + "  " + t.titre;
        el.addEventListener("click", function() {
            charger(i); jouer();
            ecran.classList.remove("liste-active");
            listeBtn.textContent = "≡ LISTE";
        });
        liste.appendChild(el);
    });
}
listeBtn.addEventListener("click", function() {
    const ouvert = ecran.classList.toggle("liste-active");
    listeBtn.textContent = ouvert ? "✕ FERMER" : "≡ LISTE";
    if (ouvert) construireListe();
});