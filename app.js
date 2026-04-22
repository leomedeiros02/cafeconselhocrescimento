document.addEventListener("DOMContentLoaded", function () {

  fetch("phrases.json")
    .then(res => res.json())
    .then(frases => {

      const hoje = new Date();
      const inicioAno = new Date(hoje.getFullYear(), 0, 0);
      const diff = hoje - inicioAno;
      const dia = Math.floor(diff / (1000 * 60 * 60 * 24));

      const fraseCompleta = frases[dia % frases.length];

      const partes = fraseCompleta.split(" — ");

      const frase = partes[0];
      const autor = partes[1] || "";

      document.getElementById("frase").innerText = frase;
      document.getElementById("autor").innerText = autor;

      configurarCompartilhamento();

    })
    .catch(() => {
      document.getElementById("frase").innerText = "Erro ao carregar frases";
    });

});

function configurarCompartilhamento() {

  const botoes = ["whatsapp", "telegram", "facebook"];

  botoes.forEach(id => {
    document.getElementById(id).onclick = compartilharImagem;
  });

  document.getElementById("salvar").onclick = compartilharImagem;
}

async function compartilharImagem() {

  const frase = document.getElementById("frase").innerText;
  const autor = document.getElementById("autor").innerText;

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;

  const ctx = canvas.getContext("2d");

  // fundo preto
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // aspas
  ctx.fillStyle = "#d4a055";
  ctx.font = "80px serif";
  ctx.textAlign = "center";
  ctx.fillText("“", 540, 180);

  // frase
  ctx.fillStyle = "#fff";
  ctx.font = "bold 48px serif";
  wrapText(ctx, frase, 540, 400, 800, 60);

  // linha
  ctx.fillStyle = "#d4a055";
  ctx.fillRect(440, 600, 200, 3);

  // autor
  ctx.fillStyle = "#aaa";
  ctx.font = "28px serif";
  ctx.fillText(autor, 540, 680);

  // marca
  ctx.fillStyle = "#555";
  ctx.font = "20px serif";
  ctx.fillText("Café, Conselho e Crescimento", 540, 950);

  canvas.toBlob(async (blob) => {

    const file = new File([blob], "conselho.png", { type: "image/png" });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Conselho do dia"
      });
    } else {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "conselho.png";
      link.click();
    }

  });

}
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
