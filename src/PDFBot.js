const { getPdfText, pdfTextToMarkdown } = require("./read");

class PDFBotCore {
  static async ripText(pathToPdf, writeToFile = false) {
    return await getPdfText(pathToPdf, writeToFile);
  }
  static async toMarkdown(pathToPdf, writeToFile = false) {
    return await pdfTextToMarkdown(pathToPdf, writeToFile);
  }
}
module.exports = PDFBotCore;
