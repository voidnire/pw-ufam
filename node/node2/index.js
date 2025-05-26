import http from "http";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createLink, createBackLink } from "./util.mjs";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT ?? 3001;
const diretorio = process.argv[2] || "./";

const server = http.createServer((req, res) => {
  if (req.url !== "/") {
    const filePath = path.join(diretorio, req.url);
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end(`
          <h1>Arquivo não encontrado</h1>
          ${createBackLink()}
        `);
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.end(`
        ${createBackLink()}
        <h1>Conteúdo do arquivo: ${req.url}</h1>
        <pre>${data}</pre>
      `);
    });
    return;
  }

  fs.readdir(diretorio, (err, files) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(`Erro ao ler o arq: ${err.message}`);
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });

    files.forEach((file) => {
      const filePath = path.join(diretorio, file);
      const stats = fs.statSync(filePath);
      if (!stats.isDirectory()) {
        res.write(createLink(file));
      }
    });

    res.end();
  });
});

server
  .listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Listando conteúdo do diretório: ${path.resolve(diretorio)}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Porta ${PORT} já em uso. Tente outra porta.`);
    } else {
      console.error("Erro ao iniciar servidor:", err);
    }
    process.exit(1);
  });

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
