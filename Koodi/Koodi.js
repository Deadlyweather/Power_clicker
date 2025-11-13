const Stats = [
    {nimi: "Sähkö", määrä: 0, maksimi: 1e+100, PerClick: 1, kerroin: 1},
    {nimi: "Cps", määrä: 0, maksimi: Infinity, elinaika: 0, PerClick: 1},
    {nimi: "Combo", määrä: 0, maksimi: 5, kerroin: 1, elinaika: 0, maksimi_elinaika: 1, PerClick: 1, kerroinPerCombo: 1},
    {nimi: "Sps", määrä: 0, maksimi: 1e+100},
    {nimi: "Sielu", määrä: 0, maksimi: Infinity},
]
const Hidden_Stats = [
    {nimi: "Cooldown", määrä: 1000, aktiivinen: true},
    {nimi: "Alennus", määrä: 0},
    {nimi: "Autoclicker", määrä: 0, aktiivinen: false},
    {nimi: "Onnekas kosketus", määrä: 0, aktiivinen: false},
    {nimi: "F.O.R.K", aktiivinen: false},
    {nimi: "varkaudet", määrä: 0}, // Exponential Slave
    {nimi: "legendaarinen piiskaaja", määrä: 0}, // Multiplying Slave
    {nimi: "tehdas", määrä: 0}, // basic Slave Spawner
    {nimi: "Pelottavin Pistorasia", aktiivinen: false}
]
const Kauppa = [
    // Sähkökauppa
    {id: 1, hinta: 5, ostot: 0, maksimi: Infinity},
    {id: 2, hinta: 1000, ostot: 0, maksimi: Infinity},
    {id: 3, hinta: 10000, ostot: 0, maksimi: Infinity},
    {id: 4, hinta: 750000, ostot: 0, maksimi: 999},
    {id: 5, hinta: 999999999999999, ostot: 0, maksimi: 101},

    // Collectorkauppa
    {id: 6, hinta: 100, ostot: 0, maksimi: 1000},
    {id: 7, hinta: 1000, ostot: 0, maksimi: 10},
    {id: 8, hinta: 100000, ostot: 0, maksimi: 1000},
    {id: 9, hinta: 1000000000, ostot: 0, maksimi: Stats[2].maksimi},
    {id: 10, hinta: Infinity, ostot: 0, maksimi: 1},

    // Tukikauppa
    {id: 11, hinta: 0, ostot: 0, maksimi: 1},
    {id: 12, hinta: 1000, ostot: 0, maksimi: 100},
    {id: 13, hinta: 66666, ostot: 0, maksimi: 100},
    {id: 14, hinta: 1000000, ostot: 0, maksimi: 10},
    {id: 15, hinta: Infinity, ostot: 0, maksimi: 1},
    {id: 16, hinta: Infinity, ostot: 0, maksimi: Infinity}
];

const Keybinds = [
    {nimi: "Osto kerroin +", nappi: "e"},
    {nimi: "Osto kerroin -", nappi: "q"},
    {nimi: "Sähkökauppa hotkey", nappi: "r"},
    {nimi: "Collectorkauppa hotkey", nappi: "t"},
    {nimi: "Tukikauppa hotkey", nappi: "y"},
    // dev keys
    {nimi: "Loadsa moneh", nappi: "m"}
]
let OstoKerroin = 1;
let fontSize = 50

document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case Keybinds[0].nappi:
            if (OstoKerroin < 10000000) {
                OstoKerroin *= 10;
                fontSize -= 5
            }
            
            break;

        case Keybinds[1].nappi:
            if (OstoKerroin > 1) {
                OstoKerroin /= 10
                fontSize += 5
            }
            break;

        case Keybinds[2].nappi:
            AvaaSahkoKauppa();
            break;

        case Keybinds[3].nappi:
            AvaaCollectorKauppa();
            break;

        case Keybinds[4].nappi:
            AvaaTukiKauppa();
            break;
        case Keybinds[5].nappi:
            Loadsa_Moneh();
            break;

        default:
            break;
    }
    UpdateAll()
});
function UpdateAll() {
    //Stats
    document.getElementById("Sähkö").innerText = Stats[0].määrä;
    document.getElementById("Cps").innerText = Stats[1].määrä + "/sekunnissa";
    document.getElementById("Combo").innerText = "Combo " + Stats[2].määrä + "/" + Stats[2].maksimi + " " + Stats[2].kerroin + "x";
    document.getElementById("Auto_Sahko").innerText = Stats[3].määrä + "/sekunnissa";
    document.getElementById("Sieluja").innerText = Stats[4].määrä;
    document.getElementById("Ostokerroin").innerText = OstoKerroin + "X"
    document.getElementById("Ostokerroin").style.fontSize = fontSize + "px";
    //Kaupat
    Kauppa.forEach(function(item) {
        document.getElementById("hinta" + item.id).innerText = item.hinta
        if (item.maksimi === Infinity) {
            document.getElementById("ostot" + item.id).innerText = item.ostot
        } else {
            document.getElementById("ostot" + item.id).innerText = item.ostot + "/" + item.maksimi
        }
    })
}
function Pressed() {
    if (!Hidden_Stats[0].aktiivinen === true) return;
        Click()
        BeginCombo()
        UpdateAll()
        cooldown()
    }

const SK = document.getElementById("SahkoKauppa");
const CK = document.getElementById("CollectorKauppa");
const TK = document.getElementById("TukiKauppa");

function AvaaSahkoKauppa() {
    if (SK.hidden === true) {
        SK.hidden = false;
        CK.hidden = true;
        TK.hidden = true;
        UpdateAll()
    }
}

function AvaaCollectorKauppa() {
    if (CK.hidden === true) {
        SK.hidden = true;
        CK.hidden = false;
        TK.hidden = true;
        UpdateAll()
    }
}

function AvaaTukiKauppa() {
    if (TK.hidden === true) {
        SK.hidden = true;
        CK.hidden = true;
        TK.hidden = false;
        UpdateAll()
    }
}

function BeginCombo() { 
    Stats[2].määrä += Stats[2].PerClick;
    Stats[2].kerroin = 1 + Stats[2].määrä * Stats[2].kerroinPerCombo
    if (Stats[2].määrä > Stats[2].maksimi) Stats[2].määrä = Stats[2].maksimi;

    if (!Stats[2].elinaika) {
        Stats[2].elinaika = setInterval(DrainCombo, Stats[2].maksimi_elinaika);
    }

    UpdateAll();
}

function DrainCombo() {
    if (Stats[2].määrä > 0) {
        Stats[2].määrä -= 1;
        Stats[2].kerroin = 1 + Stats[2].määrä * Stats[2].kerroinPerCombo
    } else {
        clearInterval(Stats[2].elinaika);
        Stats[2].elinaika = 0;
    }

    UpdateAll();
}

function Click() {
    let Trigger = 0
    if (Math.random() < 0.01 * Hidden_Stats[3].määrä) {
        Trigger = 10
    } else {
        Trigger = 1
    }
    Stats[0].määrä += Stats[0].PerClick * Stats[0].kerroin * Trigger
    Cps()
}

function Cps() {
    Stats[1].määrä += Stats[1].PerClick;
    if (!Stats[1].elinaika) {
        Stats[1].elinaika = setInterval(() => {
            Stats[1].määrä = Math.max(0, Stats[1].määrä - 1);
            if (Stats[1].määrä === 0) {
                clearInterval(Stats[1].elinaika);
                Stats[1].elinaika = 0;
            }
            UpdateAll();
        }, 1000);
    }
    UpdateAll();
}

function Cpsdrain() {
    if (Stats[1].määrä > 0) {
        Stats[1].määrä *= 0.9;
        if (Stats[1].määrä < 0.1) Stats[1].määrä = 0;
        UpdateAll();
    } else {
        clearInterval(Stats[1].elinaika);
        Stats[1].elinaika = 0;
    }
}

function Ostatuote(id) {
    id = id - 1;

    let ostettavaa = OstoKerroin;
    let saatavilla = Kauppa[id].maksimi - Kauppa[id].ostot;

    if (ostettavaa > saatavilla) {
        ostettavaa = saatavilla;
    }

    let kokonaishinta = Kauppa[id].hinta * ostettavaa;

    if (Stats[0].määrä >= kokonaishinta && ostettavaa > 0) {
        Stats[0].määrä -= kokonaishinta;
        Kauppa[id].ostot += ostettavaa;

        switch (id + 1) {
            case 1:
                Stats[0].PerClick = 1 + Kauppa[0].ostot
                break;
            case 2:
                Stats[0].kerroin = 1 + Kauppa[1].ostot;
                break;
            case 3:
                Stats[2].kerroinPerCombo = 1 + Kauppa[2].ostot;
                break;
            case 4:
                Stats[2].maksimi_elinaika = Kauppa[3].ostot;
                break;
            case 5:
                Hidden_Stats[1].määrä = Kauppa[4].ostot;
                break;
            case 6:
                Hidden_Stats[0].määrä = 1000 - Kauppa[5].ostot;
                break;
            case 7:
                Hidden_Stats[2].määrä = Kauppa[6].ostot;
                if (Hidden_Stats[2].määrä > 0) Hidden_Stats[2].aktiivinen = true;
                Autoclicker();
                break;
            case 8:
                Hidden_Stats[3].määrä = Kauppa[7].ostot;
                if (Hidden_Stats[3].määrä > 0) Hidden_Stats[3].aktiivinen = true;
                break;
            case 9:
                Stats[2].PerClick = Kauppa[8].ostot;
                break;
            case 10:
                if (Kauppa[9].ostot > 0) Hidden_Stats[4].aktiivinen = true;
                break;
            case 11:
                Stats[3].määrä = Kauppa[10].ostot + Hidden_Stats[5].määrä * (Hidden_Stats[6].määrä + 1);
                break;
            case 12:
                Hidden_Stats[5].määrä = Kauppa[11].ostot;
                break;
            case 13:
                Hidden_Stats[6].määrä = Kauppa[12].ostot;
                break;
            case 14:
                Hidden_Stats[7].määrä = Kauppa[13].ostot;
                break;
            case 15:
                if (Kauppa[14].ostot > 0) Hidden_Stats[8].aktiivinen = true;
                break;
            case 16:
                // Ei tee mitään
                break;
        }
        UpdateAll();
    }
}
function cooldown() {
    if (Hidden_Stats[0].määrä > 0) {
        Hidden_Stats[0].aktiivinen = false
        document.getElementById("Collector").style.pointerEvents = "none"
        setTimeout(cooldown_end, Hidden_Stats[0].määrä) 
    }
}
function cooldown_end() {
    Hidden_Stats[0].aktiivinen = true
    document.getElementById("Collector").style.pointerEvents = "auto"
}
window.onload = function() {
    UpdateAll()
    Sekuntti_tuottajat();
};

function Sekuntti_tuottajat() {
    setInterval(Trigger_All, 1000);
}

function Trigger_All() {
    Orjat();
    Infinity_Varjelija()
    UpdateAll();
}

function Autoclicker() {
    if (!Hidden_Stats[2].aktiivinen) return;

    let interval = 1000 / Hidden_Stats[2].määrä;

    clearInterval(Hidden_Stats[2].loop);
    Hidden_Stats[2].loop = setInterval(() => {
        for (let X_2 = 0; X_2 < Hidden_Stats[2].määrä; X_2++) {
            setTimeout(() => Pressed(), X_2 * interval);
        }
    }, 1000);
}

function Orjat() {
    Stats[0].määrä += Stats[3].määrä;
    Stats[3].määrä = Kauppa[10].ostot + Hidden_Stats[5].määrä * (Hidden_Stats[6].määrä + 1);
    Hidden_Stats[5].määrä += Kauppa[11].ostot
    UpdateAll()
}
function Loadsa_Moneh() {
    Stats[0].määrä += 1
    Stats[0].määrä *= 999999999999999
}