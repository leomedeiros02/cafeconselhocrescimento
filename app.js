let frases = [];

fetch("phrases.json")
  .then(response => response.json())
  .then(data => {
    frases = data;
    fraseDoDia();
  });

function fraseDoDia() {
  const hoje = new Date();

  const inicioAno = new Date(hoje.getFullYear(), 0, 0);
  const diff = hoje - inicioAno;
  const umDia = 1000 * 60 * 60 * 24;
  const diaDoAno = Math.floor(diff / umDia);

  const index = diaDoAno % frases.length;
  const fraseCompleta = frases[index];

  const partes = fraseCompleta.split(" — ");

  document.getElementById("frase").innerText = partes[0];
  document.getElementById("autor").innerText = partes[1] || "";
}
