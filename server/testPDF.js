import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import fs from "fs";

async function testPDF() {
  try {
    const buffer = fs.readFileSync("sample.pdf"); // make sure sample.pdf is in the same folder
    const pdfDoc = await pdfjsLib.getDocument({ data: buffer }).promise;
    console.log("Pages:", pdfDoc.numPages);
  } catch (err) {
    console.error("PDF parsing failed:", err.message);
  }
}

testPDF();
