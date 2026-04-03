let frases = [];

fetch("phrases.json")
  .then(res => res.json())
  .then(data => {
    frases = data;
    fraseDoDia();
  });

function fraseDoDia() {
  const hoje = new Date();

  // 📅 Calcula o dia do ano
  const inicioAno = new Date(hoje.getFullYear(), 0, 0);
  const diff = hoje - inicioAno;
  const umDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(diff / umDia);

  // 🔁 Seleciona a frase do dia
  const index = diaDoAno % frases.length;
  const frase = frases[index];

  document.getElementById("frase").innerText = frase;

  mudarCor(index);
}

function mudarCor(index) {
  const cores = ["#ff6b6b", "#6bcB77", "#4d96ff", "#ffd93d"];
  document.body.style.background = cores[index % cores.length];
}