// stats
let sähkö = 0;
let sähköPerSekunti = 0;
let klikkauksetPerSekunti = 0;
let combo = 0;
let sieluja = 0;

const collector = document.getElementById('Collector');

// hidden stats
let sähköPerKlikkaus = 1;
let comboKerroin = 1;
let klikkaukset = 0;
let maxCombo = 5;
let autoclikerActive = false;
let autoclickerInterval = 1;

// clicker
collector.addEventListener('click', () => {
    document.getElementById("Sähkö").innerText = sähkö += sähköPerKlikkaus * comboKerroin;
});

// Sähkö Kauppa
const sahkoKauppa = document.getElementById('SahkoKauppa');
const collectorKauppa = document.getElementById('CollectorKauppa');
const tukiKauppa = document.getElementById('TukiKauppa');

function AvaaSahkoKauppa() {
    if (sahkoKauppa.hidden === true) {
        sahkoKauppa.hidden = false;
        collectorKauppa.hidden = true;
        tukiKauppa.hidden = true;
    } else {
        sahkoKauppa.hidden = true;
    }
}

function AvaaCollectorKauppa() {
    if (collectorKauppa.hidden === true) {
        collectorKauppa.hidden = false;
        sahkoKauppa.hidden = true;
        tukiKauppa.hidden = true;
    } else {
        collectorKauppa.hidden = true;
    }
}

function AvaaTukiKauppa() {
    if (tukiKauppa.hidden === true) {
        tukiKauppa.hidden = false;
        collectorKauppa.hidden = true;
        sahkoKauppa.hidden = true;
    } else {
        tukiKauppa.hidden = true;
    }
}
