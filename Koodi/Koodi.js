// stats
let sähkö = 0;
let klikkauksetPerSekunti = 0;
let combo = 0;
let autosähkö = 0;
let sieluja = 0;

const collector = document.getElementById('Collector');

// hidden stats
let klikkaukset = 0;
let maxCombo = 5;
let comboTimer;

// clicker
collector.addEventListener('click', () => {
    if (collector.disabled) return;
    sähkö += sähköPerKlikkaus * comboKerroin * kerroin;
    document.getElementById("Sähkö").innerText = sähkö;

    klikkaukset += 1;

    if (combo < maxCombo) combo += 1;
    comboKerroin = combo + 1;

    document.getElementById("Combo").innerText =
        "Combo " + combo + " / " + maxCombo + " " + comboKerroin + "x";

    // reset combo timer
    clearTimeout(comboTimer);
    comboTimer = setTimeout(() => {
        combo = 0;
        comboKerroin = 1;
        document.getElementById("Combo").innerText = "Combo " + combo + " / " + maxCombo + " " + comboKerroin + "x";
    }, comboKesto);
    document.getElementById("Collector").disabled = true;
    setTimeout(() => {
        document.getElementById("Collector").disabled = false;
    }, buttonCooldown);
});

// Sähkö Kauppa
const sahkoKauppa = document.getElementById('SahkoKauppa');
const collectorKauppa = document.getElementById('CollectorKauppa');
const tukiKauppa = document.getElementById('TukiKauppa');

// Clock
setInterval(() => {
    if (klikkaukset > 0) {
        klikkauksetPerSekunti = klikkaukset;
        klikkaukset = 0;
    } else {
        klikkauksetPerSekunti = 0;
    }
    varkaukset += 1 * ostot12
    sähkö += SähköPerSekuntti*comboKerroin*Äijä_kerroin
    sähkö += varkaukset*comboKerroin
    document.getElementById("Cps").innerText = klikkauksetPerSekunti + "/sekunnissa";
    document.getElementById("Sähkö").innerText = sähkö
    document.getElementById("Auto_Sahko").innerText = SähköPerSekuntti*comboKerroin*Äijä_kerroin + varkaukset*comboKerroin
}, 1000);

// Sähkökauppa
function AvaaSahkoKauppa() {
    if (sahkoKauppa.hidden === true) {
        sahkoKauppa.hidden = false;
        collectorKauppa.hidden = true;
        tukiKauppa.hidden = true;
    } else {
        sahkoKauppa.hidden = true;
    }
}
// Sähkökauppa
let sähköPerKlikkaus = 1;
let ostot1 = 0

let kerroin = 1
let ostot2 = 0

let comboKerroin = 1;
let ostot3 = 0

let comboKesto = 10;
let ostot4 = 0

let alennus = 0
let ostot5 = 0

// Collectorkauppa
let buttonCooldown = 10000
let ostot6 = 0

let autoclikerActive = false;
let autoclickerInterval = 1001000;
let ostot7 = 0

let onnekaspainallus = 0
let ostot8 = 0

let comboPerKlikkaus = 1
let ostot9 = 0

let Forking = false
let ostot10 = 0

// Tukikauppa
let SähköPerSekuntti = 0
let ostot11 = 0

let varkaukset = 0
let ostot12 = 0

let Äijä_kerroin = 1
let ostot13 = 0

let Spawner = 0
let ostot14 = 0

let Pistorasia = false;
let ostot15 = 0

let ostot16 = 0

function Ostatuote1() {
    let hinta = Math.max(0, 10 * (1 - alennus));
    if (sähkö >= hinta) {
        sähkö -= hinta;
        ostot1 += 1;
        sähköPerKlikkaus += 1;
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot1").innerText = ostot1;
    }
    document.getElementById("hinta1").innerText = hinta;
}

function Ostatuote2() {
    let hinta = Math.max(0, 1000 * (1 - alennus));
    if (sähkö >= hinta) {
        sähkö -= hinta;
        ostot2 += 1;
        kerroin += 1;
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot2").innerText = ostot2;
    }
    document.getElementById("hinta2").innerText = hinta;
}

function Ostatuote3() {
    let hinta = Math.max(0, 100000 * (1 - alennus));
    if (sähkö >= hinta) {
        sähkö -= hinta;
        ostot3 += 1;
        comboKerroin += 1;
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot3").innerText = ostot3;
    }
    document.getElementById("hinta3").innerText = hinta;
}

function Ostatuote4() {
    let hinta = Math.max(0, 1000000 * (1 - alennus));
    if (sähkö >= hinta) {
        sähkö -= hinta;
        ostot4 += 1;
        comboKesto += 0.01;
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot4").innerText = ostot4;
    }
    document.getElementById("hinta4").innerText = hinta;
}

function Ostatuote5() {
    let hinta = Math.max(0, 999999999 * (1 - alennus));
    if (sähkö >= hinta && ostot5 < 101) {
        sähkö -= hinta;
        ostot5 += 1;
        alennus += 0.01;
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot5").innerText = ostot5;
    }
    document.getElementById("hinta5").innerText = hinta;
}


// Collectorkauppa
function AvaaCollectorKauppa() {
    if (collectorKauppa.hidden === true) {
        collectorKauppa.hidden = false;
        sahkoKauppa.hidden = true;
        tukiKauppa.hidden = true;
    } else {
        collectorKauppa.hidden = true;
    }
}

function Ostatuote6() {
    let hinta = Math.max(0, 50 * (1 - alennus));
    if (sähkö >= hinta && ostot6 < 1000) {
        sähkö -= hinta;
        ostot6 += 1;
        buttonCooldown = Math.max(0, buttonCooldown - 1000);
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot6").innerText = ostot6;
    }
    document.getElementById("hinta6").innerText = hinta;
}

function Ostatuote7() {
    let hinta = Math.max(0, 1000 * (1 - alennus));
    if (sähkö >= hinta && ostot7 < 1000) {
        sähkö -= hinta;
        ostot7 += 1;
        autoclickerInterval = Math.max(0, autoclickerInterval - 1000);
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot7").innerText = ostot7;
    }
    document.getElementById("hinta7").innerText = hinta;
}

function Ostatuote8() {
    let hinta = Math.max(0, 1000 * (1 - alennus));
    if (sähkö >= hinta && ostot8 < 1000) {
        sähkö -= hinta;
        ostot8 += 1;
        onnekaspainallus += 0.001;
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot8").innerText = ostot8;
    }
    document.getElementById("hinta8").innerText = hinta;
}

function Ostatuote9() {
    let hinta = Math.max(0, 100000 * (1 - alennus));
    if (sähkö >= hinta && ostot9 < 5) {
        sähkö -= hinta;
        ostot9 += 1;
        comboPerKlikkaus += 1;
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot9").innerText = ostot9;
    }
    document.getElementById("hinta9").innerText = hinta;
}

function Ostatuote10() {
    let hinta = Math.max(0, Infinity * (1 - alennus));
    if (sähkö >= hinta && ostot10 < 1) {
        ostot10 += 1;
        Forking = true;
        document.getElementById("ostot10").innerText = ostot10;
    }
    document.getElementById("hinta10").innerText = hinta;
}


// Tukikauppa
function AvaaTukiKauppa() {
    if (tukiKauppa.hidden === true) {
        tukiKauppa.hidden = false;
        collectorKauppa.hidden = true;
        sahkoKauppa.hidden = true;
    } else {
        tukiKauppa.hidden = true;
    }
}

function Ostatuote11() {
    let hinta = Math.max(0, 1 * (1 - alennus));
    if (sähkö >= hinta && ostot11 < 100) {
        sähkö -= hinta;
        ostot11 += 1;
        SähköPerSekuntti = (SähköPerSekuntti || 0) + 1;
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot11").innerText = ostot11;
    }
    document.getElementById("hinta11").innerText = hinta;
}

function Ostatuote12() {
    let hinta = Math.max(0, 5000 * (1 - alennus));
    if (sähkö >= hinta) {
        sähkö -= hinta;
        ostot12 += 1;
        SähköPerSekuntti = (SähköPerSekuntti || 0) + 1;
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot12").innerText = ostot12;
    }
    document.getElementById("hinta12").innerText = hinta;
}

function Ostatuote13() {
    let hinta = Math.max(0, 25000 * (1 - alennus));
    if (sähkö >= hinta) {
        sähkö -= hinta;
        ostot13 += 1;
        Äijä_kerroin *= 2;
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot13").innerText = ostot13;
    }
    document.getElementById("hinta13").innerText = hinta;
}

function Ostatuote14() {
    let hinta = Math.max(0, 1000000 * (1 - alennus));
    if (sähkö >= hinta) {
        sähkö -= hinta;
        ostot14 += 1;
        Spawner += 100;
        document.getElementById("Sähkö").innerText = sähkö;
        document.getElementById("ostot14").innerText = ostot14;
    }
    document.getElementById("hinta14").innerText = hinta;
}

function Ostatuote15() {
    let hinta = Math.max(0, Infinity * (1 - alennus));
    if (sähkö >= hinta && ostot15 < 1) {
        ostot15 += 1;
        Pistorasia = true;
        document.getElementById("ostot15").innerText = ostot15;
    }
    document.getElementById("hinta15").innerText = hinta;
}

function Ostatuote16() {
    let hinta = Math.max(0, Infinity * (1 - alennus));
    if (sähkö >= hinta) {
        ostot16 += 1;
        document.getElementById("ostot16").innerText = ostot16;
    }
    document.getElementById("hinta16").innerText = hinta;
}
const dev_button = "m"
const BulkBuy_button = Shift

document.addEventListener("keydown", function(event) {
    if (event.key.toLowerCase() === "m") {
        Devbutton();
    }
});

function Devbutton() {
    sähkö *= 1000000;
    document.getElementById("Sähkö").innerText = sähkö;
}

function BulkBuy() {
    
}