const fs = require('fs');
const pdfParse = require('pdf-parse');

async function convertPdfToText(fileBuffer) {
  try {
    const result = await pdfParse(fileBuffer);
    return result.text;
  } catch (error) {
    throw new Error(`Error parsing PDF: ${error.message}`);
  }
}

module.exports = convertPdfToText;