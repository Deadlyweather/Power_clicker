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

const Kauppa = [
{id: 1, hinta: 10, maksimi_hinta: 10, ostot: 0, maksimi: 999},
{id: 2, hinta: 1000, maksimi_hinta: 1000, ostot: 0, maksimi: 9},
{id: 3, hinta: 25000, maksimi_hinta: 25000, ostot: 0, maksimi: Infinity},
{id: 4, hinta: 750000, maksimi_hinta: 750000, ostot: 0, maksimi: 9},
{id: 5, hinta: 1e+50, maksimi_hinta: 1e+50, ostot: 0, maksimi: 101},
{id: 6, hinta: 2, maksimi_hinta: 2, ostot: 0, maksimi: 10},
{id: 7, hinta: 5000, maksimi_hinta: 5000, ostot: 0, maksimi: 1},
{id: 8, hinta: 1000000, maksimi_hinta: 1000000, ostot: 0, maksimi: 250},
{id: 9, hinta: 7500000, maksimi_hinta: 7500000, ostot: 0, maksimi: Stats[2].maksimi},
{id: 10, hinta: Infinity, maksimi_hinta: Infinity, ostot: 0, maksimi: 1},
{id: 11, hinta: 50, maksimi_hinta: 50, ostot: 0, maksimi: 10},
{id: 12, hinta: 250, maksimi_hinta: 250, ostot: 0, maksimi: 10},
{id: 13, hinta: 6666666, maksimi_hinta: 6666666, ostot: 0, maksimi: Infinity},
{id: 14, hinta: 75000000000, maksimi_hinta: 75000000000, ostot: 0, maksimi: 1},
{id: 15, hinta: Infinity, maksimi_hinta: Infinity, ostot: 0, maksimi: 1},
{id: 16, hinta: Infinity, maksimi_hinta: Infinity, ostot: 0, maksimi: Infinity}
];

const Keybinds = [
    {nimi: "Osto kerroin +", nappi: "e"},
    {nimi: "Osto kerroin -", nappi: "q"},
    {nimi: "Sähkökauppa hotkey", nappi: "r"},
    {nimi: "Collectorkauppa hotkey", nappi: "t"},
    {nimi: "Tukikauppa hotkey", nappi: "y"},
    // dev keys
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
        case Keybinds[5].nappi: Loadsa_Moneh(); break;
        case Keybinds[6].nappi: Loadsa_Clicks(); break;
        case Keybinds[7].nappi: Vapauta_Jellona(); break;
    }
    UpdateAll();
});

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

    if (Unlocks[0].aktiivinen === true) {
        document.getElementById("Haarukka").hidden = false
    }
    if (Unlocks[1].aktiivinen === true) {
        document.getElementById("Pistorasia").hidden = false
    }
    if (Unlocks[0].aktiivinen === true && Unlocks[1].aktiivinen === true && Stats[0].määrä < Infinity) {
        document.getElementById("Anti_softlock").hidden = false
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
            case 5: Hidden_Stats[1].määrä = Kauppa[itemIndex].ostot; Alennus(); break;
            case 6: Hidden_Stats[0].määrä = 500 * (1 - 0.1 * Kauppa[itemIndex].ostot); break;
            case 7: Hidden_Stats[2].aktiivinen = true; Hidden_Stats[2].määrä = Kauppa[itemIndex].ostot; Autoclicker(); break;
            case 8: Hidden_Stats[3].aktiivinen = true; Hidden_Stats[3].määrä = Kauppa[itemIndex].ostot; break;
            case 9: Stats[2].PerClick = Kauppa[itemIndex].ostot; break;
            case 10: Unlocks[0].aktiivinen = true; break;
            case 11: BaseOrjat = 10 * Kauppa[itemIndex].ostot; break;
            case 12: ExpOrjat = Kauppa[itemIndex].ostot; break;
            case 13: SupOrjat = Kauppa[itemIndex].ostot; break;
            case 14: Tehdas(); break;
            case 15: Unlocks[1].aktiivinen = true; break;
        }

        Stats[0].PerClick = 1 + Mahtava_sähkövoima * Ultimaattinen_sähkövoima;
        UpdateAll();
    }
}

window.onload = function() {
    UpdateAll();
    setInterval(Trigger_All, 1000);
    startCpsReset();
    if (Number(localStorage.getItem("kuolemat")) > 0) {
        document.getElementById("Sieluja").hidden = false
        document.getElementById("Sieluja_2").hidden = false
        Stats[4].määrä = Number(localStorage.getItem("sielut"))
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
    Jellona.hidden = false

    let angle = 0
    let stretch = 1
    setInterval(() => {
        angle += 1
        stretch += 0.1
        Jellona.style.transform = `rotate(${angle}deg) skew(${angle}deg) scale(${stretch})`
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

Haarukka.addEventListener("mousedown", (e) => {
    Dragging = true;
    offsetX = e.clientX - Haarukka.offsetLeft;
    offsetY = e.clientY - Haarukka.offsetTop;
});

document.addEventListener("mousemove", (e) => {
    if (!Dragging) return;

    Haarukka.style.left = (e.clientX - offsetX) + "px";
    Haarukka.style.top  = (e.clientY - offsetY) + "px";

    if (isOverlapping(Haarukka, Pistorasia)) {
        Ascension();
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

function Ascension() {
    localStorage.setItem("sielut", Stats[4].määrä)
    window.location.href = "Taivas.html";
}
function Reset() {
    localStorage.clear()
    window.location.reload()
}