require("dotenv").config();
const { OpenAI } = require("openai");
const { readFile, writeFile } = require("fs/promises");
const pdf = require("pdf-parse-fork");
const { SentenceGrabber, windowSentences } = require("./strUtils");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

//reads text from the pdf
async function getPdfText(pathToPdf, write = false) {
  let text = "";
  try {
    const buffer = await readFile(pathToPdf);
    const pdfData = await pdf(buffer);
    //optionally output text to .txt file
    write &&
      (await writeFile(
        `${pathToPdf.replace(".pdf", ".txt")}`,
        pdfData.text,
        "utf8",
      ));
    text = pdfData.text;
  } catch (error) {
    console.warn("Failed to 'getPdfText'");
    console.error(error);
  }

  return text;
}

/**
 * @param {string} pathToPdf path to a pdf file to have gpt 'convert' into markdown format.
 * @param {boolean} write flag, should markdown be written to file?
 * @returns {Promise<string>} the successfully 'converted' pdf file in markdown format.
 */
async function pdfTextToMarkdown(pathToPdf, write = true) {
  const text = await getPdfText(pathToPdf);
  const sys_message =
    "You are an expert in reconstructing pdfs into markdown format. Whenever the user provides you a text input (copy pasted from a pdf), you will do your best to reconstruct the document into markdown format. Do not duplicate footers or titles if they appear more than once! ";
  const sentences = SentenceGrabber.grabSentences(text);
  const windows = windowSentences(sentences, 2000, 2);
  let q = [],
    i;
  for (i = 0; i < windows.length; i++) {
    console.log("Pushing window #" + (i + 1) + "/" + windows.length);
    q.push(
      openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: sys_message },
          {
            role: "user",
            content: `Please convert the following segment of a pdf file's text into markdown for me: [${i + 1}/${windows.length}] PDF_TEXT={${windows[i]}}`,
          },
        ],
      }),
    );
  }

  let reconstructedOutput = "";
  console.log("Start Settling");
  const results = await Promise.allSettled(q);
  for (i = 0; i < results.length; i++) {
    console.log("checking: ", i + 1 + "/" + results.length);
    if (results[i].status === "fulfilled") {
      reconstructedOutput += `\n${results[i].value.choices[0].message.content}\n`;
    }
  }

  write &&
    (await writeFile(
      pathToPdf.replace(".pdf", ".md"),
      reconstructedOutput,
      "utf8",
    ));
  return {
    reconstructedOutput,
    estCost:
      4000 * windows.length * (0.5 / 1000000) +
      (reconstructedOutput.length / 4) * (1 / 1000000),
  };
}

module.exports = { pdfTextToMarkdown, getPdfText };
