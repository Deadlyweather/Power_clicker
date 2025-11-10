const Stats = [
    {nimi: "Sähkö", määrä: 0, maksimi: Infinity, PerClick: 1},
    {nimi: "Cps", määrä: 0, maksimi: Infinity, PerClick: 1},
    {nimi: "Combo", määrä: 0, maksimi: 5, kerroin: 1, elinaika: 0, maksimi_elinaika: 100, PerClick: 1},
    {nimi: "Sps", määrä: 0, maksimi: Infinity},
    {nimi: "Sielu", määrä: 0, maksimi: Infinity},
]

const Sähkökauppa = [
    {id: 1, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 2, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 3, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 4, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 5, hinta: 0, ostot: 0, maksimi: Infinity}
];

const Collectorkauppa = [
    {id: 6, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 7, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 8, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 9, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 10, hinta: 0, ostot: 0, maksimi: Infinity}
];

const Tukikauppa = [
    {id: 11, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 12, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 13, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 14, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 15, hinta: 0, ostot: 0, maksimi: Infinity},
    {id: 16, hinta: 0, ostot: 0, maksimi: Infinity}
];

const Keybinds = [
    {nimi: "Osto kerroin", nappi: "q"},
    {nimi: "Sähkökauppa hotkey", nappi: "r"},
    {nimi: "Collectorkauppa hotkey", nappi: "t"},
    {nimi: "Tukikauppa hotkey", nappi: "y"}
]
function UpdateAll() {
    document.getElementById("Sähkö").innerText = Stats[0].määrä;
    document.getElementById("Cps").innerText = Stats[1].määrä + "/sekunnissa";
    document.getElementById("Combo").innerText = "Combo " + Stats[2].määrä + "/" + Stats[2].maksimi + " " + Stats[2].kerroin + "x";
    document.getElementById("Auto_sahko").innerText = Stats[3].määrä + "/sekunnissa";
    document.getElementById("Sieluja").innerText = Stats[4].määrä;
}
function Pressed() {
    Click()
    Begincombo()
    UpdateAll()
}

const SK = document.getElementById("SahkoKauppa");
const CK = document.getElementById("CollectorKauppa");
const TK = document.getElementById("TukiKauppa");

function AvaaSahkoKauppa() {
    if (SK.hidden === true) {
        SK.hidden = false;
        CK.hidden = true;
        TK.hidden = true;
    }
}

function AvaaCollectorKauppa() {
    if (CK.hidden === true) {
        SK.hidden = true;
        CK.hidden = false;
        TK.hidden = true;
    }
}

function AvaaTukiKauppa() {
    if (TK.hidden === true) {
        SK.hidden = true;
        CK.hidden = true;
        TK.hidden = false;
    }
}

function Begincombo() {
    if (Stats[2].määrä < Stats[2].maksimi) {
    Stats[2].määrä += Stats[2].PerClick
    Draincombo()
    }
}

function Draincombo() {
    Stats[2].määrä -= 1
}

function Click() {
    Stats[0].määrä += Stats[0].PerClick
    Cps()
}

function Cps() {
    Stats[1].määrä += Stats[1].PerClick
    Cpsdrain()
}

function Cpsdrain() {
    Stats[1].määrä = 0
}

function Ostatuote(id) {

}