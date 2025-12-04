let TaivasStats = [
    {nimi: "kuolemat", määrä: 0},
    {nimi: "Sielut", määrä: 0, PerKuolema: 1},
    {nimi: "Pisteet", määrä: 0}
]

let TaivasKauppa = [
    {id: 1, hinta: 1, ostot: 0},   // Seilium kaivos
    {id: 2, hinta: 25, ostot: 0},   // Sormi hirviö
    {id: 3, hinta: 50, ostot: 0},   // Sielu varasto
    {id: 4, hinta: 10000, ostot: 0},  // Äijä murhaaja
    {id: 5, hinta: 150000, ostot: 0},  // B.O.Y autoilija
    {id: 6, hinta: 250000, ostot: 0},  // Reliikki
    {id: 7, hinta: 999999999, ostot: 0},  // Huijaukset (kaikki loputtomia)
    {id: 8, hinta: Infinity, ostot: 0},  // Melvin-haaste
];

let SkillTree = [
    {id: 1, hinta: 1, ostot: 0},
    {id: 2, hinta: 1, ostot: 0},
    {id: 3, hinta: 1, ostot: 0},
    {id: 4, hinta: 1, ostot: 0},
    {id: 5, hinta: 1, ostot: 0},
    {id: 6, hinta: 1, ostot: 0},
    {id: 7, hinta: 1, ostot: 0},
    {id: 8, hinta: 1, ostot: 0},
    {id: 9, hinta: 1, ostot: 0},
    {id: 10, hinta: 1, ostot: 0},
    {id: 11, hinta: 1, ostot: 0},
    {id: 12, hinta: 1, ostot: 0}
];
let Keybinds = [
    // dev buttons
    {nimi: "Insta_Death", nappi: "b"},
    {nimi: "Final_showdown", nappi: "n"}
]
document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case Keybinds[0].nappi:
            Insta_Death()
            break;
        case Keybinds[1].nappi:
            Final_showdown()
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
    const kuolemiaEl = document.getElementById("Kuolemia");
    const sielujaEl = document.getElementById("Sieluja");
    const pisteetEl = document.getElementById("Taito_Pisteet");

    if (kuolemiaEl) kuolemiaEl.innerText = TaivasStats[0].määrä;
    if (sielujaEl) sielujaEl.innerText = TaivasStats[1].määrä;
    if (pisteetEl) pisteetEl.innerText = TaivasStats[2].määrä;

    UpdateSkillsUI();
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
    LoadSkills();
    UpdateAll();
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
function Final_showdown() {
    window.location.href = "Melvin.html"
}

// Skill tree functions
function SaveSkills() {
    const data = {};
    SkillTree.forEach(s => data[s.id] = s.ostot);
    localStorage.setItem('taidot', JSON.stringify(data));
}

function LoadSkills() {
    const raw = localStorage.getItem('taidot');
    if (!raw) return;
    try {
        const data = JSON.parse(raw);
        SkillTree.forEach(s => {
            if (data.hasOwnProperty(s.id)) s.ostot = Number(data[s.id]) || 0;
        });
    } catch (e) {
        console.error('Failed to load skills', e);
    }
}

function UpdateSkillsUI() {
    SkillTree.forEach(s => {
        const el = document.getElementById('skill' + s.id);
        if (!el) return;
        if (s.ostot > 0) {
            el.style.opacity = '0.5';
            el.onclick = null;
            el.setAttribute('data-bought', '1');
        } else {
            el.style.opacity = '';
            el.setAttribute('data-bought', '0');
        }
    });
}

function OstaTaito(id) {
    const skill = SkillTree.find(s => s.id === id);
    if (!skill) return;
    if (skill.ostot > 0) return; // already bought

    const pisteet = TaivasStats[2].määrä;
    if (pisteet >= skill.hinta) {
        TaivasStats[2].määrä -= skill.hinta;
        skill.ostot = 1;
        SaveSkills();
        UpdateAll();
        // Apply simple placeholder effects per skill id (extend as needed)
        switch(id) {
            case 1: TaivasStats[1].PerKuolema += 1; break; // more sieluja per kuolema
            case 2: /* lisää klikkausvoimaa tai muu efekti */ break;
            default: break;
        }
    }
}