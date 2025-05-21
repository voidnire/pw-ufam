const http = require("http");
const fs = require("fs");
const path = require("path");

//modules
const dotenv = require("dotenv");

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const util = require("./funcs");

//config

const PORT = process.env.PORT ?? 3001;

const diretorio = process.argv[2] || "./"; // diretório atual se nenhum for fornecido

// Server Logic
const server = http.createServer((req, res) => {
  // Servir arquivos quando acessados pelos links
  if (req.url !== "/") {
    const filePath = path.join(diretorio, req.url);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
        res.end(`
                <h1>Arquivo não encontrado</h1>
                ${util.createBackLink()}
            `);
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      res.end(`
        ${util.createBackLink()}
            <h1>Conteúdo do arquivo: ${req.url}</h1>
            <pre>${data}</pre>
            
        `);
    });

    return;
  }

  // Listagem de arquivos
  fs.readdir(diretorio, (err, files) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(`Erro ao ler o arq: ${err.message}`);
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });

    // Gerar links para cada arquivo
    files.forEach((file) => {
      const filePath = path.join(diretorio, file);
      const stats = fs.statSync(filePath);

      // Mostrar apenas arquivos, não diretórios
      if (!stats.isDirectory()) {
        res.write(util.createLink(file));
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
