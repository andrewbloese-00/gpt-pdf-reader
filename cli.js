const PDFBot = require("./src/PDFBot");

function FATAL_ERROR() {
  console.log("FATAL_ERROR");
  console.log(
    `Usage:\nnode pdf-reader/cli.js [path to local pdf] [md | txt]\n\n\n`,
  );
  process.exit(1);
}

async function PDFReaderCLI() {
  const tStart = performance.now();
  if (!process.argv[2] && !process.argv[3]) FATAL_ERROR();
  const pathToPDF = process.argv[2].trim();
  let mode = process.argv[3]?.trim().toLowerCase() || "txt";
  switch (mode) {
    case "md":
      await PDFBot.toMarkdown(pathToPDF, true);
      console.log(
        `PDF -> Markdown Conversion ✅\n ⏳ ${(performance.now() - tStart).toFixed(3)}ms\nPath: ${pathToPDF.replace(".pdf", ".md")}`,
      );
      process.exit(0);

    case "txt":
      await PDFBot.ripText(pathToPDF, true);
      console.log(
        `PDF -> Text Conversion ✅\n ⏳ ${(performance.now() - tStart).toFixed(3)}ms\nPath: ${pathToPDF.replace(".pdf", ".txt")}`,
      );
      process.exit(0);
    default:
      FATAL_ERROR();
  }
}

PDFReaderCLI();
