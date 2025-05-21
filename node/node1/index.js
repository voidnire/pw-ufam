const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const diretorio = process.argv[2] || "./"; // diretório atual se nenhum for fornecido

const server = http.createServer((req, res) => {
  fs.readdir(diretorio, (err, files) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(`Erro ao ler o diretório: ${err.message}`);
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Conteúdo do Diretório</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #333; }
                ul { list-style-type: none; padding: 0; }
                li { padding: 5px; }
                li:nth-child(odd) { background-color: #f5f5f5; }
            </style>
        </head>
        <body>
            <h1>Conteúdo do diretório: ${diretorio}</h1>
            <ul>
    `);

    // Lista cada arquivo/diretório
    files.forEach((file) => {
      const filePath = path.join(diretorio, file);
      const stats = fs.statSync(filePath);
      const icon = stats.isDirectory() ? "📁" : "📄";

      res.write(`<li>${icon} ${file}</li>`);
    });

    res.end(`
            </ul>
        </body>
        </html>
    `);
  });
});

const DB_PASSWORD = process.env.DB_PASSWORD;

const PORT = process.env.PORT ?? 3001;

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
