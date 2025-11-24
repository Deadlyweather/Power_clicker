let TaivasStats = {
    kuolemat: 0,
    Skillpoints: 0,
    sielut: 0
};
let TaivasKauppa = [
    {id: 1, hinta: 0, ostot: 0}
]
let SkillTree = [
    {id: 1, hinta: 0, ostot: 0}
]
function Uusi_Elämä() {
    localStorage.setItem("sielut", Stats[4].määrä)
    window.location.href = "index.html";
}