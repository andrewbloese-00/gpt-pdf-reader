# PDF Text Extraction and Markdown Conversion Tool

This project is designed to extract text from PDF files and convert it into either plain text or markdown format. It is modular in nature, consisting of several key components: `PDFBot.js` for the core functionality, `cli.js` for the command-line interface, and utility scripts such as `read.js` and `strUtils.js` for text processing and interaction with OpenAI's GPT models.

## Overview

- **PDFBot.js**: Core module that provides functions to extract text from PDFs and convert it to markdown.
- **cli.js**: A CLI tool to interact with `PDFBot`, allowing users to specify the path to a PDF and the desired output format (markdown or text).
- **read.js**: Contains utility functions to read PDF text and convert it to markdown using OpenAI's API.
- **strUtils.js**: Includes utilities for sentence extraction and windowing to facilitate the markdown conversion process.

## Setup

### Requirements

- Node.js
- npm or yarn
- An OpenAI API key

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Set up an `.env` file in the root directory with your OpenAI API key as follows:

   ```env
   OPENAI_KEY=your_api_key_here
   ```

## Usage

### Running the CLI Tool

To use the CLI tool, navigate to the project directory in your terminal and run:

```bash
node cli.js [path to local pdf] [output format]
```

- `[path to local pdf]`: The relative or absolute path to the PDF file you want to process.
- `[output format]`: Specify `md` for markdown or `txt` for plain text. Defaults to `txt` if not specified.

Example:

```bash
node cli.js ./documents/sample.pdf md
```

This command will convert `sample.pdf` to markdown and save the output in the same directory with a `.md` extension.

### Development Notes

- The project uses the `pdf-parse-fork` library for PDF text extraction and OpenAI's Chat API for converting text to markdown.
- The `SentenceGrabber` class in `strUtils.js` improves sentence extraction by accounting for common abbreviations.
- Ensure your OpenAI API key has sufficient permissions and quota to use the chat completion API for markdown conversion.

## Contributing

Contributions to improve the tool or extend its functionality are welcome. Please follow the standard GitHub fork-and-pull request workflow.
