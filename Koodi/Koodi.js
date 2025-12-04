const Stats = [
    {nimi: "Sähkö", määrä: 0, maksimi: 1e+100, PerClick: 1, kerroin: 1},
    {nimi: "Cps", määrä: 0, maksimi: Infinity, elinaika: 0, PerClick: 1},
    {nimi: "Combo", määrä: 0, maksimi: 5, kerroin: 1, elinaika: 0, maksimi_elinaika: 1000, PerClick: 1, kerroinPerCombo: 1, Skaalaus: 10},
    {nimi: "Sps", määrä: 0, maksimi: 1e+100},
    {nimi: "Sielu", määrä: 0, maksimi: Infinity},
];

const Hidden_Stats = [
    {nimi: "Cooldown", määrä: 500, aktiivinen: true},
    {nimi: "Alennus", määrä: 0},
    {nimi: "Autoclicker", määrä: 0, cooldown: 1000, aktiivinen: false, loop: null},
    {nimi: "Onnekas kosketus", määrä: 0, aktiivinen: false}
];

const Unlocks = [
    {nimi: "haarukka", aktiivinen: false},
    {nimi: "pistorasia", aktiivinen: false}
]

let Swap = false;
const Kauppa = [
    {id: 1, hinta: 10, sielu_hinta: 1, maksimi_hinta: 10, ostot: 0, maksimi: 999},
    {id: 2, hinta: 1000, sielu_hinta: 100, maksimi_hinta: 1000, ostot: 0, maksimi: 9},
    {id: 3, hinta: 25000, sielu_hinta: 25, maksimi_hinta: 25000, ostot: 0, maksimi: Infinity},
    {id: 4, hinta: 750000, sielu_hinta: 1000, maksimi_hinta: 750000, ostot: 0, maksimi: 9},
    {id: 5, hinta: 1e+50, sielu_hinta: 999999, maksimi_hinta: 1e+50, ostot: 0, maksimi: 101},
    {id: 6, hinta: 2, sielu_hinta: 1, maksimi_hinta: 2, ostot: 0, maksimi: 10},
    {id: 7, hinta: 5000, sielu_hinta: 1, maksimi_hinta: 5000, ostot: 0, maksimi: 1},
    {id: 8, hinta: 1000000, sielu_hinta: 1000, maksimi_hinta: 1000000, ostot: 0, maksimi: 250},
    {id: 9, hinta: 7500000, sielu_hinta: 25000, maksimi_hinta: 7500000, ostot: 0, maksimi: Stats[2].maksimi},
    {id: 10, hinta: Infinity, sielu_hinta: 999999, maksimi_hinta: Infinity, ostot: 0, maksimi: 1},
    {id: 11, hinta: 50, sielu_hinta: 5, maksimi_hinta: 50, ostot: 0, maksimi: 10},
    {id: 12, hinta: 250, sielu_hinta: 20, maksimi_hinta: 250, ostot: 0, maksimi: 10},
    {id: 13, hinta: 6666666, sielu_hinta: 9999, maksimi_hinta: 6666666, ostot: 0, maksimi: Infinity},
    {id: 14, hinta: 75000000000, sielu_hinta: 75000, maksimi_hinta: 75000000000, ostot: 0, maksimi: 1},
    {id: 15, hinta: Infinity, sielu_hinta: 999999, maksimi_hinta: Infinity, ostot: 0, maksimi: 1},
    {id: 16, hinta: Infinity, sielu_hinta: 0, maksimi_hinta: Infinity, ostot: 0, maksimi: Infinity}
];

const Keybinds = [
    {nimi: "Osto kerroin +", nappi: "e"},
    {nimi: "Osto kerroin -", nappi: "q"},
    {nimi: "Sähkökauppa hotkey", nappi: "r"},
    {nimi: "Collectorkauppa hotkey", nappi: "t"},
    {nimi: "Tukikauppa hotkey", nappi: "y"},
    {nimi: "Ikuinen ostos", nappi: "a"},
    {nimi: "Loadsa moneh", nappi: "m"},
    {nimi: "Loadsa clicks", nappi: "n"},
    {nimi: "Vapauta Jellona", nappi: "b"}
];

let OstoKerroin = 1;
let fontSize = 50;
let Started = null;

let Mahtava_sähkövoima = 0;
let Ultimaattinen_sähkövoima = 0;
let BaseOrjat = 0;
let SupOrjat = 0;
let ExpOrjat = 0;

document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case Keybinds[0].nappi:
            if (OstoKerroin < 10000000) {
                OstoKerroin *= 10;
                fontSize -= 5;
            }
            break;

        case Keybinds[1].nappi:
            if (OstoKerroin > 1) {
                OstoKerroin /= 10;
                fontSize += 5;
            }
            break;

        case Keybinds[2].nappi: AvaaSahkoKauppa(); break;
        case Keybinds[3].nappi: AvaaCollectorKauppa(); break;
        case Keybinds[4].nappi: AvaaTukiKauppa(); break;
        case Keybinds[5].nappi: Ikuinen_Ostos(); break;
        case Keybinds[6].nappi: Loadsa_Moneh(); break;
        case Keybinds[7].nappi: Loadsa_Clicks(); break;
        case Keybinds[8].nappi: Vapauta_Jellona(); break;
    }
    UpdateAll();
});

function UpdateAll() {
    document.getElementById("Sähkö").innerHTML = Stats[0].määrä;
    document.getElementById("Cps").innerHTML = Stats[1].määrä + "/sekunnissa";
    document.getElementById("Combo").innerHTML = "Combo " + Stats[2].määrä + "/" + Stats[2].maksimi + " " + Stats[2].kerroin + "x";
    document.getElementById("Auto_Sahko").innerHTML = Stats[3].määrä + "/sekunnissa";
    document.getElementById("Sieluja").innerHTML = Stats[4].määrä;
    document.getElementById("Ostokerroin").innerHTML = OstoKerroin + "X";
    document.getElementById("Ostokerroin").style.fontSize = fontSize + "px";

    Kauppa.forEach(item => {
        const Hinta_Valitsin = document.getElementById("hinta" + item.id);
        const ostotEl = document.getElementById("ostot" + item.id);

        if (Hinta_Valitsin) {
            Hinta_Valitsin.innerHTML = item.hinta;
        }

        if (ostotEl) {
            if (item.maksimi === Infinity) {
                ostotEl.innerHTML = item.ostot;
            } else {
                ostotEl.innerHTML = `${item.ostot}/${item.maksimi}`;
            }
        }
    Paivita_Hinnat();
    });

    if (Unlocks[0].aktiivinen === true) {
        const haarukkaEl = document.getElementById("Haarukka");
        if (haarukkaEl) haarukkaEl.hidden = false;
    }
    if (Unlocks[1].aktiivinen === true) {
        const pistorasiaEl = document.getElementById("Pistorasia");
        if (pistorasiaEl) pistorasiaEl.hidden = false;
    }
    if (Unlocks[0].aktiivinen === true && Unlocks[1].aktiivinen === true && Stats[0].määrä < Infinity) {
        const antiEl = document.getElementById("Anti_softlock");
        if (antiEl) antiEl.hidden = false;
    }
}

function Pressed() {
    if (!Hidden_Stats[0].aktiivinen) return;
    Click();
    BeginCombo();
    UpdateAll();
    cooldown();
    Infinity_Varjelija()
}

function Click() {
    Stats[0].PerClick = 1 + Mahtava_sähkövoima;
    Stats[0].kerroin = 1 + Ultimaattinen_sähkövoima;

    let Trigger = Math.random() < 0.01 * Hidden_Stats[3].määrä ? 100 : 1;
    Stats[0].määrä += Stats[0].PerClick * Stats[0].kerroin * Stats[2].kerroin * Trigger;
    Cps();
}

function Cps() {
    Stats[1].määrä += Stats[1].PerClick;
    startCpsReset();
}

function Cps_reset() {
    Stats[1].määrä = 0;
    UpdateAll();
}

function startCpsReset() {
    if (!Stats[1].elinaika) {
        Stats[1].elinaika = setInterval(Cps_reset, 1000);
    }
}

function BeginCombo() {
    Stats[2].määrä += Stats[2].PerClick;
    if (Stats[2].määrä > Stats[2].maksimi) Stats[2].määrä = Stats[2].maksimi;

    Stats[2].kerroin = Stats[2].määrä * Stats[2].kerroinPerCombo || 1;
    Stats[2].elinaika = Stats[2].maksimi_elinaika;

    if (Started) clearInterval(Started);

    let intervalMs = Math.max(100, Math.floor(Stats[2].maksimi_elinaika / (Stats[2].Skaalaus ** Math.max(1, Stats[2].määrä))));
    Started = setInterval(DrainCombo, intervalMs);

    UpdateAll();
}

function DrainCombo() {
    if (Stats[2].määrä > 0) Stats[2].määrä -= 1;
    Stats[2].kerroin = Stats[2].määrä > 0 ? Stats[2].määrä * Stats[2].kerroinPerCombo : 1;

    if (Stats[2].määrä === 0) {
        clearInterval(Started);
        Started = null;
        Stats[2].elinaika = 0;
    }
    UpdateAll();
}

const SK = document.getElementById("SahkoKauppa");
const CK = document.getElementById("CollectorKauppa");
const TK = document.getElementById("TukiKauppa");

function AvaaSahkoKauppa() {
    if (SK) SK.hidden = !SK.hidden;
    if (CK) CK.hidden = TK.hidden = true;
    UpdateAll();
}
function AvaaCollectorKauppa() {
    if (CK) CK.hidden = !CK.hidden;
    if (SK) SK.hidden = TK.hidden = true;
    UpdateAll();
}
function AvaaTukiKauppa() {
    if (TK) TK.hidden = !TK.hidden;
    if (SK) SK.hidden = CK.hidden = true;
    UpdateAll();
}

function cooldown() {
    if (!Hidden_Stats[0].aktiivinen) return;
    Hidden_Stats[0].aktiivinen = false;

    setTimeout(() => {
        Hidden_Stats[0].aktiivinen = true;
    }, Hidden_Stats[0].määrä);
}

function Autoclicker() {
    if (!Hidden_Stats[2].aktiivinen) return;

    if (Hidden_Stats[2].loop) {
        clearInterval(Hidden_Stats[2].loop);
    }

    let count = Math.max(1, Hidden_Stats[2].määrä);

    let interval = Hidden_Stats[2].cooldown / count;

    Hidden_Stats[2].loop = setInterval(() => {
        Pressed();
    }, interval);
}
let Varkaudet = 0
function Orjat() {
    Stats[3].määrä = (BaseOrjat + Varkaudet) * (SupOrjat + 1);
    Stats[0].määrä += Stats[3].määrä * Stats[2].kerroin;
    Varkaudet += ExpOrjat
    UpdateAll();
}

function Ostatuote(id) {
    let itemIndex = Kauppa.findIndex(x => x.id === id);
    if (itemIndex === -1) return;
    let item = Kauppa[itemIndex];

    let ostettavaa = Math.min(OstoKerroin, item.maksimi - item.ostot);
    if (ostettavaa <= 0) return;

    if (Swap) {
        let sieluhinta = (item.sielu_hinta || 0) * ostettavaa;

        if (Stats[4].määrä >= sieluhinta) {
            Stats[4].määrä -= sieluhinta;

            item.ostot += ostettavaa;

            Ikuiset[item.id] = item.ostot;
            Tallenna_Ikuiset();

            Lisää_Vaikutukset(id, item.ostot);

            UpdateAll();
        }
        return;
    }

    let kokonaishinta = item.hinta * ostettavaa;

    if (Stats[0].määrä >= kokonaishinta) {
        Stats[0].määrä -= kokonaishinta;
        item.ostot += ostettavaa;

        switch (id) {
            case 1: Mahtava_sähkövoima = item.ostot; break;
            case 2: Ultimaattinen_sähkövoima = item.ostot; break;
            case 3: Stats[2].maksimi_elinaika = 10 * item.ostot; break;
            case 4: Stats[2].kerroinPerCombo = 1 + item.ostot; break;
            case 5: Hidden_Stats[1].määrä = item.ostot; Alennus(); break;
            case 6: Hidden_Stats[0].määrä = 500 * (1 - 0.1 * item.ostot); break;
            case 7: Hidden_Stats[2].aktiivinen = true; Hidden_Stats[2].määrä = item.ostot; Autoclicker(); break;
            case 8: Hidden_Stats[3].aktiivinen = true; Hidden_Stats[3].määrä = item.ostot; break;
            case 9: Stats[2].PerClick = item.ostot; break;
            case 10: Unlocks[0].aktiivinen = true; break;
            case 11: BaseOrjat = 10 * item.ostot; break;
            case 12: ExpOrjat = item.ostot; break;
            case 13: SupOrjat = item.ostot; break;
            case 14: Tehdas(); break;
            case 15: Unlocks[1].aktiivinen = true; break;
        }

        Stats[0].PerClick = 1 + Mahtava_sähkövoima * Ultimaattinen_sähkövoima;
        UpdateAll();
    }
}



window.onload = function() {
    Lataa_Ikuiset();
    UpdateAll();
    setInterval(Trigger_All, 1000);
    startCpsReset();
    Start_Infinite_Observer();
    if (Number(localStorage.getItem("kuolemat")) > 0) {
        const sielujaEl = document.getElementById("Sieluja");
        const sieluja2El = document.getElementById("Sieluja_2");
        if (sielujaEl) sielujaEl.hidden = false;
        if (sieluja2El) sieluja2El.hidden = false;
        Stats[4].määrä = Number(localStorage.getItem("sielut")) || 0;
    }
};

function Trigger_All() {
    Orjat();
    UpdateAll();
    Tehdas()
}

function Tehdas() {
    if (Kauppa[13].ostot === 0) return;
    Kauppa[10].ostot *= 1000
    BaseOrjat = Kauppa[10].ostot;
    Orjat();
    UpdateAll();
}

function Loadsa_Moneh() {
    Stats[0].määrä += 1;
    Stats[0].määrä *= 999999999999999;
}

let RATATATA = null;

function Loadsa_Clicks() {
    if (RATATATA) {
        clearInterval(RATATATA);
        RATATATA = null;
    } else {
        RATATATA = setInterval(Pressed, 0);
    }
}

function Vapauta_Jellona() {
    Jellona = document.getElementById("Jellona")
    if (Jellona) Jellona.hidden = false

    let angle = 0
    let stretch = 1
    setInterval(() => {
        angle += 1
        stretch += 0.1
        if (Jellona) Jellona.style.transform = `rotate(${angle}deg) skew(${angle}deg) scale(${stretch})`
    }, 16)
    setTimeout(Ascension, 1000)
}

const Whitelisted = [5, 10, 15, 16]
let Blackout = false
function Infinity_Varjelija() {
    if (Stats[0].määrä > Stats[0].maksimi && !Blackout) {
        Blackout = true
        Kauppa.forEach(item => {
            if (!Whitelisted.includes(item.id)) {
                item.maksimi = 0;
                item.ostot = 0;
            }
        });

        Stats[0].PerClick = 0;
        Stats[0].kerroin = 0;
        Stats[2].maksimi = 0;
        Stats[3].määrä = 0;

        Hidden_Stats[0].aktiivinen = false;
        Hidden_Stats[0].määrä = Infinity;

        Hidden_Stats[2].aktiivinen = false;
        Hidden_Stats[2].määrä = 0;
        Hidden_Stats[2].cooldown = Infinity;
        UpdateAll()
    }
}

function Alennus() {
    Kauppa.forEach(item => {
        if (item.maksimi_hinta === Infinity) {
            if (Hidden_Stats[1].määrä === 100) {
                item.hinta = 0;
            } else if (Hidden_Stats[1].määrä > 100)
                item.hinta = -Infinity
            return;
        }

        item.hinta = item.maksimi_hinta * (1 - (0.01 * Hidden_Stats[1].määrä))
    });
}

const Haarukka = document.getElementById("Haarukka");
const Pistorasia = document.getElementById("Pistorasia");

let Dragging = false;
let offsetX = 0;
let offsetY = 0;

if (Haarukka) Haarukka.addEventListener("mousedown", (e) => {
    Dragging = true;
    offsetX = e.clientX - Haarukka.offsetLeft;
    offsetY = e.clientY - Haarukka.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (!Dragging) return;

    Haarukka.style.left = (e.clientX - offsetX) + "px";
    Haarukka.style.top  = (e.clientY - offsetY) + "px";

    if (isOverlapping(Haarukka, Pistorasia) && Stats[0].määrä === Infinity) {
        Kuolema();
    }
});

document.addEventListener("mouseup", () => {
    Dragging = false;
});

function isOverlapping(a, b) {
    const Avain = a.getBoundingClientRect();
    const Lukko = b.getBoundingClientRect();

    return !(
        Avain.right < Lukko.left || Avain.left > Lukko.right || Avain.bottom < Lukko.top || Avain.top > Lukko.bottom
    );
}

let transparency = 0
function Kuolema() {
    let Tuli = document.getElementById("Tuli")
    if (Tuli) Tuli.hidden = false
    setInterval(() =>{
        transparency += 0.1
        if (transparency < 1.1) {
            if (Tuli) Tuli.style.opacity = transparency
        } else {
            Ascension()
        }
    },500)
}
    
function Ascension() {
    localStorage.setItem("sielut", Stats[4].määrä)
    window.location.href = "Taivas.html";
}
function Reset() {
    localStorage.clear()
    window.location.reload()
}

function Ikuinen_Ostos() {
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === "a" && !Swap) {
            Swap = true;

            document.querySelectorAll(".Valuutta").forEach(img => {
                img.src = "../Grafiikat/Kuvat/Koti_sielu.png";
            });

            Paivita_Hinnat();
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key.toLowerCase() === "a" && Swap) {
            Swap = false;

            document.querySelectorAll(".Valuutta").forEach(img => {
                img.src = "../Grafiikat/Kuvat/Sahko.png";
            });

            Paivita_Hinnat();
        }
    });
}

function Tallenna_Ikuiset() {
    localStorage.setItem("Ikuiset", JSON.stringify(Ikuiset));
}

function Apply_Ikuiset() {
    for (let id in Ikuiset) {
        let määrä = Number(Ikuiset[id]);
        let item = Kauppa.find(x => x.id == id);
        if (!item) continue;

        item.ostot = määrä;
    }
    Kauppa.forEach(item => {
        if (item.ostot > 0) Lisää_Vaikutukset(item.id, item.ostot);
    });

    UpdateAll();
}


function Lataa_Ikuiset() {
    const data = localStorage.getItem("Ikuiset");
    if (data) Ikuiset = JSON.parse(data);
    Apply_Ikuiset();
}

let Ikuiset = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0
};

const IkuisuusNimet = {
    1: "Mahtava_sahkovoima",
    2: "Ultimaattinen_sähkovoima",
    3: "Ikuinen_combo",
    4: "Voimakkaampi_combo",
    5: "Sahkoarvo",
    6: "Nopeampi_lataus",
    7: "Kultainen_kosketus",
    8: "Onnekas_kosketus",
    9: "Vahva_inferno",
    10: "Haarukka",
    11: "Orjuuta_aijia",
    12: "Orjuuta_varkaita",
    13: "Orjuuta_piiskajia",
    14: "Rakenaaija_tehdas",
    15: "Pistorasia"
};

function Lisää_Vaikutukset(id, määrä) {
    switch(id) {
        case 1: Mahtava_sähkövoima = määrä; break;
        case 2: Ultimaattinen_sähkövoima = määrä; break;
        case 3: Stats[2].maksimi_elinaika = 10 * määrä; break;
        case 4: Stats[2].kerroinPerCombo = 1 + määrä; break;
        case 5: Hidden_Stats[1].määrä = määrä; Alennus(); break;
        case 6: Hidden_Stats[0].määrä = 500 * (1 - 0.1 * määrä); break;
        case 7: Hidden_Stats[2].aktiivinen = true; Hidden_Stats[2].määrä = määrä; Autoclicker(); break;
        case 8: Hidden_Stats[3].aktiivinen = true; Hidden_Stats[3].määrä = määrä; break;
        case 9: Stats[2].PerClick = määrä; break;
        case 10: Unlocks[0].aktiivinen = true; break;
        case 11: BaseOrjat = 10 * määrä; break;
        case 12: ExpOrjat = määrä; break;
        case 13: SupOrjat = määrä; break;
        case 14: Tehdas(); break;
        case 15: Unlocks[1].aktiivinen = true; break;
    }
}

function Paivita_Hinnat() {
    Kauppa.forEach(item => {
        const Hinta_Valitsin = document.getElementById("hinta" + item.id);
        if (!Hinta_Valitsin) return;

        if (Swap) {
            Hinta_Valitsin.innerHTML = item.sielu_hinta;
        } else {
            Hinta_Valitsin.innerHTML = item.hinta;
        }
    });
}

function Start_Infinite_Observer() {

    const posInf = `<img src="../Grafiikat/Kuvat/Infinite.png"
        class="infinity-icon-pos"
        style="height:1em;vertical-align:middle">`;

    const negInf = `<img src="../Grafiikat/Kuvat/Negatiivinen_Infinite.png"
        class="infinity-icon-neg"
        style="height:1em;vertical-align:middle">`;

    const observer = new MutationObserver(() => {

        const ids = [
            "Sähkö", "Cps", "Combo", "Auto_Sahko", "Sieluja",
            ...Array.from({length: 16}, (_, i) => "hinta" + (i+1)),
            ...Array.from({length: 16}, (_, i) => "ostot" + (i+1))
        ];

        ids.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            const html = el.innerHTML;

            if (el.querySelector(".infinity-icon-pos")) return;
            if (el.querySelector(".infinity-icon-neg")) return;

            if (html.includes("-Infinity")) {
                el.innerHTML = html.replace(/-Infinity/g, negInf);
                return;
            }

            if (html.includes("Infinity")) {
                el.innerHTML = html.replace(/Infinity/g, posInf);
                return;
            }
        });

    });

    observer.observe(document.body, {
        childList: true,
        characterData: true,
        subtree: true
    });
}

