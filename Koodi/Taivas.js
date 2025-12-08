let TaivasStats = [
    {nimi: "kuolemat", määrä: 0},
    {nimi: "Sielut", määrä: 0, PerKuolema: 1},
    {nimi: "Pisteet", määrä: 0}
]

let TaivasKauppa = [
    {id: 1, hinta: 1, ostot: 0},
    {id: 2, hinta: 25, ostot: 0},
    {id: 3, hinta: 50, ostot: 0},
    {id: 4, hinta: 10000, ostot: 0},
    {id: 5, hinta: 150000, ostot: 0},
    {id: 6, hinta: 250000, ostot: 0},
    {id: 7, hinta: 1e+100, ostot: 0},
    {id: 8, hinta: Infinity, ostot: 0},
];

let SkillTree = [
    {id:1,hinta:1,ostot:0,nimi:"Ahneus", tooltip: skill => `
        <span class="hyöty">+ ${1 + skill.ostot}% alennusta kaikkialla</span><br>
        <span class="hyöty">+ ${1 + skill.ostot}% enemmän sähköä</span><br>
        <span class="haitta">- Kaikki vihaavat sinua</span><br>
        <span class="haitta">- Synti</span>
    `},
    {id:2,hinta:1,ostot:0,nimi:"Vahvuus", tooltip: skill => `
        <span class="hyöty">+ ${1 + skill.ostot}^ sähköä</span><br>
        <span class="hyöty">+ ${1 + skill.ostot} enemmän combo maksimia</span><br>
        <span class="haitta">- Hiiresi pyytää armoa</span>
    `},
    {id:3,hinta:1,ostot:0,nimi:"Viisaus", tooltip: skill => `
        <span class="hyöty">+ ${1 + skill.ostot}% mahdollisuus saada tuplapisteet</span><br>
        <span class="hyöty">+ ${1 + skill.ostot}% bonusta kaikille taidoille</span><br>
        <span class="haitta">- Muut taidot kadehtivat tätä taitoa</span>
    `},
    {id:4,hinta:1,ostot:0,nimi:"Siunaus", tooltip: skill => `
        <span class="hyöty">+ ${1 + skill.ostot}% enemmän sieluja</span><br>
        <span class="hyöty">+ ${1 + skill.ostot}% vähemmän negatiivisia vaikutuksia syntisille</span><br>
        <span class="haitta">- vain 10% vaikutusta syntisille taidoille</span>
    `},
    {id:5,hinta:1,ostot:0,nimi:"Ripeys", tooltip: skill => `
        <span class="hyöty">+ ${1 + skill.ostot}% nopeampi autocliker</span><br>
        <span class="haitta">- 1% pienempi combo elinikä</span><br>
        <span class="haitta">- et voi nukkua</span>
    `},
    {id:6,hinta:1,ostot:0,nimi:"Kylmyys", tooltip: skill => `
        <span class="hyöty">+ ${1 + skill.ostot}% voimaa orjille</span><br>
        <span class="haitta">- edes aurinko ei voisi sulattaa sinun sydäntä</span><br>
        <span class="haitta">- Synti</span>
    `},
    {id:7,hinta:1,ostot:0,nimi:"Kusetuskyky", tooltip: skill => `
        <span class="hyöty">+ ${0.1 * (1 + skill.ostot)}% mahdollisuus saada ilmainen ostos kaupassa</span><br>
        <span class="hyöty">+ ${0.1 * (1 + skill.ostot)}% mahdollisuus saada ilmainen taito</span><br>
        <span class="hyöty">+ ${0.1 * (1 + skill.ostot)}% mahdollisuus ylittää maksimi ostot</span><br>
        <span class="hyöty">+ ${0.1 * (1 + skill.ostot)}% mahdollisuus ylittää maksimi combo</span><br>
        <span class="haitta">- Kaikki haluavat antaa sinulle turpaan</span><br>
        <span class="haitta">- Synti</span>
    `},
    {id:8,hinta:1,ostot:0,nimi:"Suurlorvaus", tooltip: skill => `
        <span class="hyöty">+ ${1 + skill.ostot} satunnainen ostos sähkö kaupasta joka sekuntti</span><br>
        <span class="hyöty">+ ${10 * (1 + skill.ostot)}% bonus kaikelle automaattiselle</span><br>
        <span class="haitta">- Et näe varpaitasi enää</span><br>
        <span class="haitta">- Synti</span>
    `},
    {id:9,hinta:1,ostot:0,nimi:"Skitsofrenia", tooltip: skill => `
        <span class="hyöty">+ ${1 + skill.ostot} satunnainen bonus vaikutus joka 10 sekuntti</span><br>
        <span class="haitta">- 1 satunnainen haitta vaikutus joka minuutti</span>
    `},
    {id:10,hinta:1,ostot:0,nimi:"Kehitys", tooltip: skill => `
        <span class="hyöty">+ ${1 + skill.ostot} satunnainen taito per kuolema</span><br>
        <span class="haitta">- Sinä näytät hirviöltä</span>
    `},
    {id:11,hinta:1,ostot:0,nimi:"AivoAmoeba", tooltip: skill => `
        <span class="hyöty">+ ${1 + skill.ostot} kaottinen vaikutus</span><br>
        <span class="haitta">- Se voi olla mitä vain</span><br>
        <span class="haitta">- Kipu on tuskallista</span>
    `},
    {id:12,hinta:1,ostot:0,nimi:"Varjelus", tooltip: skill => `
        <span class="hyöty">+ ${1 + skill.ostot}% suoja kaikille negatiivisille vaikutuksille</span><br>
        <span class="haitta">- Tällä ei ole muita hyötyjä</span>
    `}
];

let Keybinds = [
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

    TaivasKauppa.forEach(item => {
        const ostot = document.getElementById(`Ostot${item.id}`);
        const hinta = document.getElementById(`hinta${item.id}`);
        if (hinta) hinta.innerText = item.hinta;
        if (ostot) ostot.innerText = item.ostot;
    });
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
    Lisää_Pisteitä();
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
    Lisää_Pisteitä()
    HeartAttack()
}
function Final_showdown() {
    window.location.href = "Melvin.html"
}

function Osta(id) {
    let ostettava = TaivasKauppa.find(item => item.id === id);
    if (!ostettava) return;
    if (TaivasStats[0].määrä >= ostettava.hinta) {
    } else {
        return;
    }
}

function OstaTaito(id) {
    let ostettava = SkillTree.find(item => item.id === id);
    if (!ostettava) return;
    if (TaivasStats[2].määrä >= ostettava.hinta) {
        TaivasStats[2].määrä -= ostettava.hinta;
        ostettava.ostot += 1;
        ostettava.hinta = ostettava.ostot * 2;
        if (ostettava.ostot <= 3) {
            document.getElementById(`skill${id}`).src = `../Grafiikat/Kuvat/${SkillTree[id - 1].nimi}_${"I".repeat(ostettava.ostot)}.png`;
        }
        UpdateAll();
    } else {
        return;
    }
}

function Lisää_Pisteitä() {
    TaivasStats[2].määrä += 1
    UpdateAll()
}


const tooltip = document.getElementById('tooltip');

function ShowTooltipContent(skill) {
    if (!tooltip) return;

    tooltip.innerHTML = skill.ostot === 0
        ? `<span class="neutraali">Mysteeri</span><br>
           <span class="neutraali">Hinta: 1</span><br>
           <span class="neutraali">Ostot: 0</span><br>
           <span class="hyöty">+ Satunnainen bonus</span><br>
           <span class="haitta">- Satunnainen haitta</span>`
        : `<span class="neutraali">${skill.nimi}</span><br>
           <span class="neutraali">Hinta: ${skill.hinta} pistettä</span><br>
           <span class="neutraali">Ostot: ${skill.ostot}</span><br>
           ${skill.tooltip(skill)}`;
    Hyöty();
    Haitta();
    tooltip.style.display = 'block';
}

function ShowTooltipPosition(event) {
    if (!tooltip) return;
    tooltip.style.left = event.pageX + 10 + 'px';
    tooltip.style.top = event.pageY + 10 + 'px';
}

function HideTooltip() { if (tooltip) tooltip.style.display = 'none'; }

function PäivitäTooltip(skillId) {
    const skill = SkillTree.find(s => s.id === skillId);
    if (skill && tooltip && tooltip.style.display === 'block') ShowTooltipContent(skill);
}

function OstaTaito(id) {
    const skill = SkillTree.find(s => s.id === id);
    if (!skill || TaivasStats[2].määrä < skill.hinta) return;

    TaivasStats[2].määrä -= skill.hinta;
    skill.ostot += 1;
    skill.hinta = skill.ostot * 2;
    if (skill.ostot <= 3) document.getElementById(`skill${id}`).src = `../Grafiikat/Kuvat/${skill.nimi}_${"I".repeat(skill.ostot)}.png`;
    UpdateAll();
    PäivitäTooltip(id);
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[id^="skill"]').forEach((skillEl, index) => {
        const skillData = SkillTree[index];
        skillEl.addEventListener('mouseenter', e => { ShowTooltipContent(skillData); ShowTooltipPosition(e); });
        skillEl.addEventListener('mouseleave', HideTooltip);
        skillEl.addEventListener('mousemove', e => { ShowTooltipContent(skillData); ShowTooltipPosition(e); });
        skillEl.parentElement.addEventListener('focus', e => { ShowTooltipContent(skillData); ShowTooltipPosition(e); });
        skillEl.parentElement.addEventListener('blur', HideTooltip);
    });
});

let hyotyInterval = null;

function Hyöty() {
    const elements = document.querySelectorAll("#tooltip .hyöty");
    if (!elements.length) return;

    clearInterval(hyotyInterval);

    hyotyInterval = setInterval(() => {
        elements.forEach(el => {
            let chars = el.textContent.split("");

            chars = chars.map((c, i) => {
                if (!/[a-zA-Z]/.test(c)) return c;

                // ---- ENSIMMÄINEN KIRJAIN ----
                if (i === 0) {
                    // 95% ajasta pysyy isona
                    if (Math.random() < 0.95) return c.toUpperCase();

                    // 5% ajasta muuttuu pieneksi
                    return c.toLowerCase();
                }

                // ---- MUUT KIRJAIMET ----
                // 97% ajasta ei tehdä mitään
                if (Math.random() > 0.03) return c;

                // 0.3% iso kirjain
                if (Math.random() < 0.003) return c.toUpperCase();

                // muulloin pieni
                return c.toLowerCase();
            });

            el.textContent = chars.join("");
        });
    }, 40);
}

function StopHyöty() {
    hyotyIntervals.forEach(i => clearInterval(i));
    hyotyIntervals = [];
}

let haittaIntervals = [];

function Haitta() {
    haittaIntervals.forEach(i => clearInterval(i));
    haittaIntervals = [];

    const elements = document.querySelectorAll("#tooltip .haitta");
    if (!elements.length) return;

    const glitchChars = ["@", "#", "!", "?", "%", "&", "∆", "§", "•", "¤"];

    elements.forEach(el => {
        const original = el.textContent;

        const interval = setInterval(() => {
            el.textContent = original
                .split("")
                .map(c => {
                    if (c === " " || c === "-") return c;
                    return Math.random() < 0.05
                        ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                        : c;
                })
                .join("");
        }, 50);

        haittaIntervals.push(interval);
    });
}

function StopHaitta() {
    haittaIntervals.forEach(i => clearInterval(i));
    haittaIntervals = [];
}