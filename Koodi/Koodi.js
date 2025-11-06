// stats
let sähkö = 0;
let klikkauksetPerSekunti = 0;
let combo = 0;
let autosähkö = 0;
let sieluja = 0;

const collector = document.getElementById('Collector');

// hidden stats
let buttonCooldown = 10000
let comboKerroin = 1;
let klikkaukset = 0;
let comboKesto = 500;
let maxCombo = 5;
let comboTimer;

// autoclicker
let autoclikerActive = false;
let autoclickerInterval = 1001000;

// clicker
collector.addEventListener('click', () => {
    if (collector.disabled) return;
    sähkö += sähköPerKlikkaus * comboKerroin;
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
        document.getElementById("Combo").innerText =
            "Combo " + combo + " / " + maxCombo + " " + comboKerroin + "x";
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
    document.getElementById("Cps").innerText = klikkauksetPerSekunti + "/sekunnissa";
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
// esine 1
function Ostatuote1() {
    if (sähkö >= 10)
        sähkö -= 10*(1.00-alennus)
        document.getElementById("Sähkö") = sähkö
        ostot1 += 1
        document.getElementById("ostot1") = ostot1
        sähköPerKlikkaus += 1
    // Hinta: 10 Sähköä
    // Toiminto: +1 Sähköä per klikkaus
    // Ostoraja: 0 = ei rajaa
}

// esine 2
function Ostatuote2() {
    // Hinta: 1000 Sähköä
    // Toiminto: +1x Sähköä per klikkaus
    // Ostoraja: 0 = ei rajaa
}

// esine 3
function Ostatuote3() {
    // Hinta: 100000 Sähköä
    // Toiminto: +1x kerroin per klikkaus
    // Ostoraja: 0 = ei rajaa
}

// esine 4
function Ostatuote4() {
    // Hinta: 1000000 Sähköä
    // Toiminto: +0.01 sekuntti combon elinaikaa
    // Ostoraja: 0 = ei rajaa
}

// esine 5
function Ostatuote5() {
    // Hinta: 999999999 Sähköä
    // Toiminto: +1% alennusta sähkötuotteille
    // Ostoraja: 101
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

// esine 6
function Ostatuote6() {
    // Hinta: 50 Sähköä
    // Toiminto: -1 sekuntti napin lataukseen
    // Ostoraja: 1000
}

// esine 7
function Ostatuote7() {
    // Hinta: 1000 Sähköä
    // Toiminto: -1 sekunttia automaattiseen klikkaukseen
    // Ostoraja: 1000
}

// esine 8
function Ostatuote8() {
    // Hinta: 1000 Sähköä
    // Toiminto: +0.1% mahdollisuus saada 100x Sähköä per klikkaus
    // Ostoraja: 1000
}

// esine 9
function Ostatuote9() {
    // Hinta: 100000 Sähköä
    // Toiminto: Combo kasvaa +1 enemmän per klikkaus
    // Ostoraja: 5
}

// esine 10
function Ostatuote10() {
    // Hinta: Infinite Sähköä
    // Toiminto: ???
    // Ostoraja: 1
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

// esine 11
function Ostatuote11() {
    // Hinta: 1 Sähkö
    // Toiminto: +1 Sähköä per sekunti
    // Ostoraja: 0 = ei rajaa
}

// esine 12
function Ostatuote12() {
    // Hinta: 5000 Sähköä
    // Toiminto: +1 Sähköä per sekunti per sekunti
    // Ostoraja: 0 = ei rajaa
}

// esine 13
function Ostatuote13() {
    // Hinta: 25000 Sähköä
    // Toiminto: 2x Sähköä äijien tuotantoon
    // Ostoraja: 0 = ei rajaa
}

// esine 14
function Ostatuote14() {
    // Hinta: 1000000 Sähköä
    // Toiminto: +100 äijää per sekunti
    // Ostoraja: 0 = ei rajaa
}

// esine 15
function Ostatuote15() {
    // Hinta: Infinite Sähköä
    // Toiminto: Rakenna pistorasia (???)
    // Ostoraja: 1
}
const dev_button = r
dev_button.addEventListener()
function Devbutton() {
    sähkö = 999999999999
    document.getElementById("Sähkö").innerText = sähkö;
}