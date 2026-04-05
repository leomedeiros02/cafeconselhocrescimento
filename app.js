let frases = [];

fetch("phrases.json")
  .then(response => response.json())
  .then(data => {
    frases = data;
    mostrarFrase();
  });

function mostrarFrase() {
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
function configurarCompartilhamento(frase, autor) {
  const texto = `${frase} — ${autor}`;
  const url = "https://leomedeiros02.github.io/cafecomconselho/";

  const textoFinal = encodeURIComponent(texto + " " + url);

  document.getElementById("whatsapp").href =
    `https://api.whatsapp.com/send?text=${textoFinal}`;

  document.getElementById("telegram").href =
    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`;

  document.getElementById("facebook").href =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  document.getElementById("instagram").onclick = () => {
    alert("Instagram não permite compartilhamento direto. Use salvar imagem 👊");
  };
  document.getElementById("salvar").onclick = () => {

  const container = document.querySelector(".container");
  const share = document.querySelector(".share");

  // esconder ícones antes da captura
  share.style.display = "none";

  html2canvas(container).then(canvas => {
    const link = document.createElement("a");
    link.download = "conselho.png";
    link.href = canvas.toDataURL();
    link.click();

    // mostrar de novo
    share.style.display = "block";
  });
};
}

