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
sahkoKauppa.hidden = true; // Asetetaan kauppa aluksi piiloon

function AvaaSahkoKauppa() {
    if (sahkoKauppa.hidden === true) {
        sahkoKauppa.hidden = false;
    } else {
        sahkoKauppa.hidden = true;
    }
}
