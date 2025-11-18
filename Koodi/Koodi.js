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
    {nimi: "Onnekas kosketus", määrä: 0, aktiivinen: false},
    {nimi: "F.O.R.K", aktiivinen: false},
    {nimi: "Pelottavin Pistorasia", määrä: 0, aktiivinen: false},
];

const Kauppa = [
    {id: 1, hinta: 100, ostot: 0, maksimi: 999},
    {id: 2, hinta: 1000000, ostot: 0, maksimi: 10},
    {id: 3, hinta: 2500000, ostot: 0, maksimi: 900},
    {id: 4, hinta: 100000000, ostot: 0, maksimi: 9},           
    {id: 5, hinta: 999999999999999, ostot: 0, maksimi: 101},
    {id: 6, hinta: 10, ostot: 0, maksimi: 10},
    {id: 7, hinta: 1000, ostot: 0, maksimi: 10},
    {id: 8, hinta: 200000, ostot: 0, maksimi: 250},
    {id: 9, hinta: 1000000, ostot: 0, maksimi: Stats[2].maksimi},
    {id: 10, hinta: Infinity, ostot: 0, maksimi: 1},
    {id: 11, hinta: 100, ostot: 0, maksimi: 1},
    {id: 12, hinta: 1000000, ostot: 0, maksimi: 10},
    {id: 13, hinta: 6666666, ostot: 0, maksimi: 100},
    {id: 14, hinta: 7500000000, ostot: 0, maksimi: 1},
    {id: 15, hinta: Infinity, ostot: 0, maksimi: 1},
    {id: 16, hinta: Infinity, ostot: 0, maksimi: Infinity}
];

const Keybinds = [
    {nimi: "Osto kerroin +", nappi: "e"},
    {nimi: "Osto kerroin -", nappi: "q"},
    {nimi: "Sähkökauppa hotkey", nappi: "r"},
    {nimi: "Collectorkauppa hotkey", nappi: "t"},
    {nimi: "Tukikauppa hotkey", nappi: "y"},
    {nimi: "Loadsa moneh", nappi: "m"}
];

let OstoKerroin = 1;
let fontSize = 50;
let Started = null;

let Mahtava_sähkövoima = 0;
let Ultimaattinen_sähkövoima = 0;
let BaseOrjat = 0;
let SupOrjat = 0;
let ExpOrjat = 0;

// --- EVENT LISTENER ---
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
        case Keybinds[5].nappi: Loadsa_Moneh(); break;
    }
    UpdateAll();
});

// --- UPDATE ---
function UpdateAll() {
    document.getElementById("Sähkö").innerText = Stats[0].määrä;
    document.getElementById("Cps").innerText = Stats[1].määrä + "/sekunnissa";
    document.getElementById("Combo").innerText = "Combo " + Stats[2].määrä + "/" + Stats[2].maksimi + " " + Stats[2].kerroin + "x";
    document.getElementById("Auto_Sahko").innerText = Stats[3].määrä + "/sekunnissa";
    document.getElementById("Sieluja").innerText = Stats[4].määrä;
    document.getElementById("Ostokerroin").innerText = OstoKerroin + "X";
    document.getElementById("Ostokerroin").style.fontSize = fontSize + "px";

    Kauppa.forEach(item => {
        document.getElementById("hinta" + item.id).innerText = item.hinta;
        if (item.maksimi === Infinity) {
            document.getElementById("ostot" + item.id).innerText = item.ostot;
        } else {
            document.getElementById("ostot" + item.id).innerText = item.ostot + "/" + item.maksimi;
        }
    });
}

// --- CLICK ---
function Pressed() {
    if (!Hidden_Stats[0].aktiivinen) return;
    Click();
    BeginCombo();
    UpdateAll();
    cooldown();
}

function Click() {
    Stats[0].PerClick = 1 + Mahtava_sähkövoima;
    Stats[0].kerroin = 1 + Ultimaattinen_sähkövoima;


    let Trigger = Math.random() < 0.01 * Hidden_Stats[3].määrä ? 10 : 1;
    Stats[0].määrä += Stats[0].PerClick * Stats[0].kerroin * Stats[2].kerroin * Trigger;
    Cps();
}

function Cps() {
    Stats[1].määrä += Stats[1].PerClick;
    UpdateAll();
}

function Cps_reset() {
    Stats[1].määrä = 0;
}

function startCpsReset() {
    if (!Stats[1].elinaika) {
        Stats[1].elinaika = setInterval(Cps_reset, 1000);
    }
}

// --- COMBO ---
function BeginCombo() {
    Stats[2].määrä += Stats[2].PerClick;
    if (Stats[2].määrä > Stats[2].maksimi) Stats[2].määrä = Stats[2].maksimi;

    Stats[2].kerroin = Stats[2].määrä * Stats[2].kerroinPerCombo || 1;
    Stats[2].elinaika = Stats[2].maksimi_elinaika;

    if (Started) clearInterval(Started);

    let intervalMs = Math.max(100, Math.floor(Stats[2].maksimi_elinaika / (Stats[2].Skaalaus * Math.max(1, Stats[2].määrä))));
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

// --- SHOPS ---
const SK = document.getElementById("SahkoKauppa");
const CK = document.getElementById("CollectorKauppa");
const TK = document.getElementById("TukiKauppa");

function AvaaSahkoKauppa() {
    SK.hidden = !SK.hidden;
    CK.hidden = TK.hidden = true;
    UpdateAll();
}
function AvaaCollectorKauppa() {
    CK.hidden = !CK.hidden;
    SK.hidden = TK.hidden = true;
    UpdateAll();
}
function AvaaTukiKauppa() {
    TK.hidden = !TK.hidden;
    SK.hidden = CK.hidden = true;
    UpdateAll();
}

// --- COOLDOWN ---
function cooldown() {
    if (!Hidden_Stats[0].aktiivinen) return;
    Hidden_Stats[0].aktiivinen = false;

    setTimeout(() => {
        Hidden_Stats[0].aktiivinen = true;
    }, Hidden_Stats[0].määrä);
}

// --- AUTOCLOCKER ---
function Autoclicker() {
    if (!Hidden_Stats[2].aktiivinen) return;

    // STOP old loop if it exists
    if (Hidden_Stats[2].loop) {
        clearInterval(Hidden_Stats[2].loop);
    }

    // Number of autoclickers
    let count = Math.max(1, Hidden_Stats[2].määrä);

    // Each autoclicker clicks once every (cooldown / count) ms
    let interval = Hidden_Stats[2].cooldown / count;

    // Safety: never go below 10 ms to prevent game freezing
    interval = Math.max(10, interval);

    // Start new loop
    Hidden_Stats[2].loop = setInterval(() => {
        Pressed();
    }, interval);
}

// --- ORJAT ---
function Orjat() {
    Stats[3].määrä = BaseOrjat * (SupOrjat + 1) + Hidden_Stats[5].määrä * (SupOrjat + 1);
    Stats[0].määrä += Stats[3].määrä;
    Hidden_Stats[5].määrä += ExpOrjat * SupOrjat;
    UpdateAll();
}

// --- BUY ITEMS ---
function Ostatuote(id) {
    let itemIndex = Kauppa.findIndex(x => x.id === id);
    if (itemIndex === -1) return;

    let ostettavaa = Math.min(OstoKerroin, Kauppa[itemIndex].maksimi - Kauppa[itemIndex].ostot);
    let kokonaishinta = Kauppa[itemIndex].hinta * ostettavaa;

    if (Stats[0].määrä >= kokonaishinta && ostettavaa > 0) {
        Stats[0].määrä -= kokonaishinta;
        Kauppa[itemIndex].ostot += ostettavaa;

        switch (id) {
            case 1: Mahtava_sähkövoima = Kauppa[itemIndex].ostot; break;
            case 2: Ultimaattinen_sähkövoima = Kauppa[itemIndex].ostot; break;
            case 3: Stats[2].maksimi_elinaika = 10 * Kauppa[itemIndex].ostot; break;
            case 4: Stats[2].kerroinPerCombo = 1 + Kauppa[itemIndex].ostot; break;
            case 5: Hidden_Stats[1].määrä = Kauppa[itemIndex].ostot; break;
            case 6: Hidden_Stats[0].määrä = 500 * (1 - 0.1 * Kauppa[itemIndex].ostot); break;
            case 7: Hidden_Stats[2].aktiivinen = true; Hidden_Stats[2].määrä = Kauppa[itemIndex].ostot; Autoclicker(); break;
            case 8: Hidden_Stats[3].aktiivinen = true; Hidden_Stats[3].määrä = Kauppa[itemIndex].ostot; break;
            case 9: Stats[2].PerClick = Kauppa[itemIndex].ostot; break;
            case 10: Hidden_Stats[4].aktiivinen = true; break;
            case 11: BaseOrjat = 10 * Kauppa[itemIndex].ostot; break;
            case 12: ExpOrjat = Kauppa[itemIndex].ostot; break;
            case 13: SupOrjat = Kauppa[itemIndex].ostot; break;
            case 15: Hidden_Stats[5].aktiivinen = true; break;
        }

        Stats[0].PerClick = 1 + Mahtava_sähkövoima * Ultimaattinen_sähkövoima;
        UpdateAll();
    }
}

// --- MONEY CHEAT ---
function Loadsa_Moneh() {
    Stats[0].määrä += 1;
    Stats[0].määrä *= 999999999999999;
}

// --- START ---
window.onload = function() {
    UpdateAll();
    setInterval(Trigger_All, 1000);
    startCpsReset();
};

function Trigger_All() {
    Orjat();
    UpdateAll();
}