import "./styles.css";
import "./Calibri.js";
import { jsPDF } from "jspdf";

const template_coordenador = (name, event, date) => {
  let text = `Certificamos que <b>${name}</b>, coordenou a Mesa-Redonda: <b>${event}</b>, no V Simpósio do Complexo Hospitalar da Universidade de Pernambuco, tendo como tema central, “A Pesquisa em Saúde e Para a Saúde” nos dias 24 a 26 de setembro de 2020.`;
  let date_str = `Recife, ${date} de setembro de 2020`;

  return `${text}<br><div style="text-align:center">${date_str}</div>`;
};

const template_moderador = (name, event, date) => {
  let text = `Certificamos que <b>${name}</>, participou como moderador da Mesa-Redonda: <b>${event}</b>, no V Simpósio do Complexo Hospitalar da Universidade de Pernambuco, tendo como tema central, “A Pesquisa em Saúde e Para a Saúde” nos dias 24 a 26 de setembro de 2020.`;
  let date_str = `Recife, ${date} de setembro de 2020`;

  return `${text}<br><div style="text-align:center">${date_str}</div>`;
};

const template_palestrante = (name, event, date) => {
  let text = `Certificamos que <b>${name}</>, participou do Painel: <b>${event}</b>, no Pré-Simpósio: V Simpósio do Complexo Hospitalar da Universidade de Pernambuco, tendo como tema central, “A Pesquisa em Saúde e Para a Saúde” nos dias 24 a 26 de setembro de 2020.`;
  let date_str = `Recife, ${date} de setembro de 2020`;

  return `${text}<br><div style="text-align:center">${date_str}</div>`;
};

function createPdf() {
  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [2573, 1819],
    putOnlyUsedFonts: true
  });

  doc.html(document.getElementById("content"), {
    callback: function (pdf) {
      var iframe = document.createElement("iframe");
      iframe.setAttribute(
        "style",
        "position:absolute;right:0; top:0; bottom:0; height:100%; width:100%"
      );
      document.getElementById("preview").appendChild(iframe);
      iframe.src = pdf.output("datauristring");
    }
  });
}

function generateContent(name, template, event, date) {
  switch (template) {
    case "moderador":
      return template_moderador(name, event, date);
    case "coordenador":
      return template_coordenador(name, event, date);
    case "palestrante":
      return template_palestrante(name, event, date);
    default:
      return "";
  }
}

function generate() {
  const name = document.getElementById("name").value;
  const template = document.getElementById("template").value;
  const event = document.getElementById("event").value;
  const date = document.getElementById("date").value;

  document.getElementById("paragraph").innerHTML = generateContent(
    name,
    template,
    event,
    date
  );

  createPdf();
}

document.getElementById("gerar").onclick = generate;
