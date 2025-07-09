import express, { NextFunction, Request, Response } from 'express';
import validateEnv from './utils/validateEnv';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import router from './router/router';
import { engine } from 'express-handlebars';
import helpers from './views/helpers/helpers';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import { sessionUserMiddleware } from './middlewares/session';
import { accessLogMiddleware } from './middlewares/log';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json()); // para rotas crud

app.use(express.urlencoded({ extended: false }));

/// MIDDLEWARES --------------------

declare module 'express-session' {
  interface SessionData {
    uid: string;
  }
}

app.use(cookieParser());

app.use(
  session({
    genid: () => uuidv4(), // usamos UUID para gerar os SESSID
    secret: 'Hi9Cf#mK98', //HMAC
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(sessionUserMiddleware);
app.use(accessLogMiddleware('completo'));

/// MIDDLEWARES --------------------

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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
