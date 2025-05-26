require("dotenv").config();
const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3333;

async function serveStaticFile(res, filePath, contentType) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    res.setHeader("Content-Type", contentType);
    res.send(data);
  } catch (err) {
    res.status(500).send("Erro ao carregar o arquivo.");
  }
}

app.get("/", async (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  await serveStaticFile(res, filePath, "text/html");
});

app.get("/script.js", async (req, res) => {
  const filePath = path.join(__dirname, "public", "script.js");
  await serveStaticFile(res, filePath, "application/javascript");
});

app.get("/generate", (req, res) => {
  const count = parseInt(req.query.count);

  if (isNaN(count) || count < 1) {
    return res.status(400).send('Parâmetro "count" inválido.');
  }

  const loremParagraph = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

  let paragraphs = "";
  for (let i = 0; i < count; i++) {
    paragraphs += `<p>${loremParagraph}</p>`;
  }

  res.send(paragraphs);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
