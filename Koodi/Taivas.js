let TaivasStats = [
    {nimi: "kuolemat", määrä: 0},
    {nimi: "Sielut", määrä: 0, PerKuolema: 1},
    {nimi: "Pisteet", määrä: 0}
]
let TaivasKauppa = [
    {id: 1, hinta: 0, ostot: 0}
]
let SkillTree = [
    {id: 1, hinta: 0, ostot: 0}
]
let Keybinds = [
    // dev buttons
    {nimi: "Insta_Death", nappi: "b"},
    {nimi: "Oispa_Kaljaa", nappi: "n"}
]
document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case Keybinds[0].nappi:
            Insta_Death()
            break;
        case Keybinds[1].nappi:
            Juoma()
            break;
    }
    UpdateAll();
});

function Uusi_Elämä() {
    localStorage.setItem("sielut", parseInt(TaivasStats[1].määrä))
    localStorage.setItem("kuolemat", parseInt(TaivasStats[0].määrä))
    localStorage.setItem("pisteet", parseInt(TaivasStats[2].määrä))
    window.location.href = "index.html";
}
function UpdateAll() {
    document.getElementById("Kuolemia").innerText = TaivasStats[0].määrä,
    document.getElementById("Sieluja").innerText = TaivasStats[1].määrä//,
    //document.getElementById("").innerText = TaivasStats[2].määrä
}
window.onload = function() {

    if (localStorage.getItem("kuolemat") !== null) {
        TaivasStats[0].määrä = parseInt(localStorage.getItem("kuolemat"));
    }
    if (localStorage.getItem("sielut") !== null) {
        TaivasStats[1].määrä = parseInt(localStorage.getItem("sielut"));
    }
    if (localStorage.getItem("pisteet") !== null) {
        TaivasStats[2].määrä = parseInt(localStorage.getItem("pisteet"));
    }

    Lisää_Sieluja();
    Lisää_Kuolemia();
}
let jumpscareFadeInterval = null;

function HeartAttack() {
    const Jumpscare = document.getElementById("Jumpscare");
    if (!Jumpscare) return;

    if (jumpscareFadeInterval) {
        clearInterval(jumpscareFadeInterval);
        jumpscareFadeInterval = null;
    }

    Jumpscare.hidden = false;
    Jumpscare.style.opacity = '1';
    Jumpscare.style.zIndex = '999999999999';

    let transparency = 1;
    jumpscareFadeInterval = setInterval(() => {
        transparency -= 0.05;
        if (transparency <= 0) {
            clearInterval(jumpscareFadeInterval);
            jumpscareFadeInterval = null;
            Hide();
        } else {
            Jumpscare.style.opacity = transparency;
        }
    }, 50);
}

function Hide() {
    const Jumpscare = document.getElementById("Jumpscare");
    if (!Jumpscare) return;
    if (jumpscareFadeInterval) {
        clearInterval(jumpscareFadeInterval);
        jumpscareFadeInterval = null;
    }
    Jumpscare.hidden = true;
    Jumpscare.style.opacity = '';
    Jumpscare.style.zIndex = '';
}

function Lisää_Sieluja() {
    TaivasStats[1].määrä += TaivasStats[1].PerKuolema
    UpdateAll()
}

function Lisää_Kuolemia() {
    TaivasStats[0].määrä += 1
    UpdateAll()
}
function Insta_Death() {
    Lisää_Kuolemia()
    Lisää_Sieluja()
    HeartAttack()
}
let rotation = 0
let size = 1
let visiblity = 1
function Juoma() {
    let Juoma = document.getElementById("Juoma")
    setInterval(() => {
        Juoma.hidden = false
        rotation += 1
        size *= 1.005
        visiblity -= 0.001
        Juoma.style.transform = `rotate(${rotation}deg) scale(${size})`
        Juoma.style.opacity = visiblity
    },16)
    setTimeout(Doom, 10000)
    setTimeout(Final_showdown, 15000)
}
function Doom() {
    document.getElementById("Doom").hidden = false
}
function Final_showdown() {
    window.location.href = "Melvin.html"
}