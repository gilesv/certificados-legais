ï»¿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('Calibri-normal.ttf', font);
this.addFont('Calibri-normal.ttf', 'Calibri', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])