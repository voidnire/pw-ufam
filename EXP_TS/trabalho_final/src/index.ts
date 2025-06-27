import express, { NextFunction, Request, Response } from 'express';
import validateEnv from './utils/validateEnv';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import router from './router/router';
import { engine } from 'express-handlebars';
import helpers from './views/helpers/helpers';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json()); // para rotas crud

app.use(express.urlencoded({ extended: false }));

app.use(router);

// ENGINE DE VIEWS

app.engine(
  'handlebars',
  engine({
    helpers: helpers,
    layoutsDir: `${__dirname}/views/layoutsdir`,
    defaultLayout: 'main2',
  }),
);
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

app.use(express.static(path.join(__dirname, '../public')));

// END ENGINE DE VIEWS
app.use('/img', [
  express.static('../public/ufam'),
  express.static('../public/codebench.png'),
]);

// SASS

app.use(express.static(path.join(__dirname, 'public')));

const sassMiddleware = require('sass-middleware');
app.use(
  sassMiddleware({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    debug: true, // Mostra erros no console
    outputStyle: 'compressed', // Minifica o CSS
    prefix: '/css', // Onde o navegador vai procurar os arquivos CSS
  }),
);

app.use('/css', express.static(`${__dirname}/../public/css`));

// SASS

// FUNÇÃO MIDDLEWARE

function accessLogMiddleware(logFormat: 'simples' | 'completo') {
  return (req: Request, res: Response, next: NextFunction) => {
    const logFolder = process.env.LOGS_PATH || 'logs';
    const logFile = path.join(logFolder, 'access.log');

    console.log('Função iniciada.');

    try {
      if (!fs.existsSync(logFolder)) {
        fs.mkdirSync(logFolder, { recursive: true });
        console.log(`Pasta de logs criada em: ${path.resolve(logFolder)}`);
      }
    } catch (err) {
      console.error(`Erro ao criar pasta de logs: ${err}`);
      return next();
    }

    const timestamp = new Date().toISOString();
    let logEntry: string;

    if (logFormat === 'simples') {
      logEntry = `${timestamp} ${req.method} ${req.url}\n`;
    } else {
      const userAgent = req.get('User-Agent') || 'unknown';
      logEntry = `${timestamp} ${req.method} ${req.url} HTTP/${req.httpVersion} ${userAgent}\n`;
    }

    fs.appendFile(logFile, logEntry, (err) => {
      if (err) {
        console.error('Erro ao escrever no arquivo de log:', err);
      }
    });

    next();
  };
}

// END FUNÇÃO MIDDLEWARE

app.use(accessLogMiddleware('completo'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
