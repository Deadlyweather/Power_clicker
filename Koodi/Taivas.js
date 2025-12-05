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
    {id: 7, hinta: 999999999999999999, ostot: 0},
    {id: 8, hinta: Infinity, ostot: 0},
];

let SkillTree = [
    {id: 1, hinta: 1, ostot: 0, nimi: "Ahneus"},
    {id: 2, hinta: 1, ostot: 0, nimi: "Vahvuus"},
    {id: 3, hinta: 1, ostot: 0, nimi: "Viisaus"},
    {id: 4, hinta: 1, ostot: 0, nimi: "Siunaus"},
    {id: 5, hinta: 1, ostot: 0, nimi: "Ripeys"},
    {id: 6, hinta: 1, ostot: 0, nimi: "Kylmyys"},
    {id: 7, hinta: 1, ostot: 0, nimi: "Kusetuskyky"},
    {id: 8, hinta: 1, ostot: 0, nimi: "Suurlorvaus"},
    {id: 9, hinta: 1, ostot: 0, nimi: "Skitsofrenia"},
    {id: 10, hinta: 1, ostot: 0, nimi: "Kehitys"},
    {id: 11, hinta: 1, ostot: 0, nimi: "AivoAmoeba"},
    {id: 12, hinta: 1, ostot: 0, nimi: "Varjelus"},
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

function ShowTooltip(element, htmlContent) {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip) return;
    
    tooltip.innerHTML = htmlContent;
    tooltip.style.display = 'block';

    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
}

function HideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (!tooltip) return;
    tooltip.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const skills = document.querySelectorAll('img[id^="skill"]');
    skills.forEach((skill, index) => {
        const skillId = index + 1;
        const skillData = SkillTree[index];
        
        skill.addEventListener('mouseenter', function() {
            let content;
            if (skillData.ostot === 0) {
                content = `<span class="neutraali">Mysteeri</span><br/>
                          <span class="neutraali">Hinta: ${skillData.hinta} pistettä</span>
                          <span class="neutraali">Ostot: ${skillData.ostot}</span>
                          <span class="hyöty"> + Satunnainen bonus vaikutus</span>
                          <span class="haitta"> - Satunnainen haitta vaikutus</span>`;
            } else {
                content = `<span class="neutraali">${skillData.nimi}</span><br/>
                          <span class="neutraali">Hinta: ${skillData.hinta} pistettä</span>
                          <span class="neutraali">Ostot: ${skillData.ostot}</span>`;
            }
            ShowTooltip(this, content);
        });
        
        skill.addEventListener('mouseleave', HideTooltip);
        
        skill.parentElement.addEventListener('focus', function() {
            let content;
            if (skillData.ostot === 0) {
                content = `<span class="neutraali">Mysteeri</span><br/>
                          <span class="neutraali">Hinta: ${skillData.hinta} pistettä</span>`;
            } else {
                content = `<span class="neutraali">${skillData.nimi}</span><br/>
                          <span class="neutraali">Hinta: ${skillData.hinta} pistettä</span>`;
            }
            ShowTooltip(skill, content);
        });
        
        skill.parentElement.addEventListener('blur', HideTooltip);
    });
});