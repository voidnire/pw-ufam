import { Request, Response } from 'express';
import { generateLorem } from '../utils/lorem';
import { title } from 'process';
import { v4 as uuidv4 } from 'uuid';
import { getAllMajors } from '../services/major';
import { LoginDto } from '../types/user'; // tipagem para o DTO
import { checkAuth } from '../services/auth'; // adicione este import
import bcrypt from 'bcryptjs';

import {
  getUserByEmail,
  saveGameSession,
  getRanking,
  getUserById,
} from '../services/user';

const index = (req: Request, res: Response) => {
  res.render('index');
};

const sobre = (req: Request, res: Response) => {
  res.render('sobre', {
    title: 'Sobre Space Shooters',
    description:
      'Space shooters, também conhecidos como shoot em ups ou jogos de tiro espacial, ' +
      'são um gênero de jogos eletrônicos onde o jogador controla uma nave espacial e atira em inimigos que se aproximam ou vêm em ondas.' +
      ' O objetivo geralmente é sobreviver o máximo possível, destruir inimigos, coletar itens e avançar para níveis mais difíceis.' +
      ' Alguns exemplos populares incluem Space Invaders, Galaga, e jogos mais recentes como Galaxy Attack: Space Shooter e Space Shooter - Galaxy Attack 2020. ',
    imageUrl: '/img/space.png',
  });
};

const game = (req: Request, res: Response) => {
  res.render('game');
};

const lorem = (req: Request, res: Response) => {
  const numParagrafo = parseInt(req.params.num);

  if (isNaN(numParagrafo) || numParagrafo <= 0) {
    res
      .status(400)
      .json({ error: 'Por favor, forneça um número válido de parágrafos.' });
    return;
  }

  const loremText = generateLorem(numParagrafo);
  res.send(loremText);
};
const hb1 = (req: Request, res: Response) => {
  res.render('hb1', {
    mensagem: 'Olá, você está aprendendo Express + HBS!',
  });
};
const hb2 = (req: Request, res: Response) => {
  res.render('hb2', {
    poweredByNodejs: true,
    name: 'Express',
    type: 'Framework',
  });
};
const hb3 = (req: Request, res: Response) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ];
  res.render('hb3', { profes });
};

/*const hb4 = (req: Request, res: Response) => {
  const profes = [
    { nome: 'David Fernandes', sala: 1238 },
    { nome: 'Horácio Fernandes', sala: 1233 },
    { nome: 'Edleno Moura', sala: 1236 },
    { nome: 'Elaine Harada', sala: 1231 },
  ];
  res.render('hb4', { profes });
};*/
const hb4 = (req: Request, res: Response) => {
  const technologies = [
    { nome: 'Express', tipo: 'Framework', poweredByNodejs: true },
    { nome: 'Laravel', tipo: 'Framework', poweredByNodejs: false },
    { nome: 'React', tipo: 'Library', poweredByNodejs: true },
    { nome: 'Handlebars', tipo: 'Engine View', poweredByNodejs: true },
    { nome: 'Django', tipo: 'Framework', poweredByNodejs: false },
    { nome: 'Docker', tipo: 'Virtualization', poweredByNodejs: false },
    { nome: 'Sequelize', tipo: 'ORM tool', poweredByNodejs: true },
  ];

  res.render('hb4', { technologies });
};

// cookies

const createCookie = function (req: Request, res: Response) {
  if (!req.cookies?.nomeCookie) {
    res.cookie('uid', 'uidddocara', {
      maxAge: 900000, // 15 minutos em milissegundos
      httpOnly: true, // Seguro contra XSS
    });
    //res.cookie('cookielegal', 'cookieswow', { maxAge: 360000 });
    res.send('Você NUNCA passou por aqui!');
  } else {
    res.send('Você JÁ passou por aqui');
  }
};

const clearCookie = function (req: Request, res: Response) {
  res.clearCookie('nomeCookie');
  res.send('cookie apagado');
};

const uuid = (req: Request, res: Response) => {
  //, next
  const uniqueId = uuidv4();
  res.send(`UUID: ${uniqueId}`);
};

const logout = (req: Request, res: Response) => {
  req.session.destroy(function (err) {
    res.clearCookie('connect.sid', { path: '/' }); // Remove o cookie de sessão
    res.clearCookie('uid'); // Remove o cookie de sessão

    if (err) res.send(err);
    else res.redirect('/');
  });
};

const cadastro = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const majors = await getAllMajors();

    res.render('cadastro', { majors });
  }
};
const login = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    console.log('Oi estou no Login');
    return res.render('login');
  }
  console.log('Oi estou no Login post');
  // POST
  const { email, password } = req.body;
  console.log('meu email: ', email);
  console.log(' minha senhaa: ', password);

  if (!email || !password) {
    return res
      .status(400)
      .render('login', { error: 'Preencha todos os campos.' });
  }

  const credentials: LoginDto = { email, password };
  const isAuth = await checkAuth(credentials);

  if (!isAuth) {
    return res
      .status(401)
      .render('login', { error: 'E-mail ou senha inválidos.' });
  }

  // Busca o usuário para pegar o id e salvar na sessão
  const user = await getUserByEmail(credentials.email);
  if (!user) {
    return res
      .status(401)
      .render('login', { error: 'Usuário não encontrado.' });
  }

  req.session.uid = user.id; // VARIAVEL DA SESSAO

  //criando cookie
  res.cookie('uid', user.id, {
    httpOnly: true, // Não acessível via JS no browser
    maxAge: 24 * 60 * 60 * 1000, // 1 dia
    sameSite: 'lax', // Protege contra CSRF básico
    secure: false, // true se usar HTTPS
  });
  res.redirect('/');
};

const userAutenticado = function (req: Request, res: Response) {
  if (!req.cookies?.nomeCookie) {
    res.cookie('uid', 'uidddocara', {
      maxAge: 900000, // 15 minutos em milissegundos
      httpOnly: true, // Seguro contra XSS
    });
    //res.cookie('cookielegal', 'cookieswow', { maxAge: 360000 });
    res.send('Você NUNCA passou por aqui!');
  } else {
    res.send('Você JÁ passou por aqui');
  }
};

export const getLoggedUserId = (req: Request, res: Response) => {
  const userId = req.cookies?.uid;
  if (!userId) {
    return res.status(401).send('Usuário não autenticado');
  }
  res.status(200).send({ userId });
};

// GAME SESSION

export const userScore = async (req: Request, res: Response) => {
  const score = req.params.score;
  const userId = req.session.uid;
  if (!userId) {
    res.status(401).send('Usuário não autenticado');
    return;
  }
  try {
    await saveGameSession(score, userId);
    res.status(200).send('Score salvo!');
  } catch (err) {
    res.status(500).send('Erro ao salvar score');
  }
};

export const ranking = async (req: Request, res: Response) => {
  const ranking = await getRanking();
  res.render('ranking', { ranking });
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.cookies?.uid;
  const user = await getUserById(userId);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  const majors = await getAllMajors();

  if (req.method === 'GET') {
    res.render('dadosuser', { user, majors });
    return;
  }
};

export const renderChangePassword = async (req: Request, res: Response) => {
  const userId = req.cookies?.uid;
  const user = await getUserById(userId);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }

  if (req.method === 'GET') {
    res.render('alterarsenha', { user });
    return;
  }
};

export default {
  index,
  sobre,
  lorem,
  hb1,
  hb2,
  hb3,
  hb4,
  cadastro,
  createCookie,
  clearCookie,
  renderChangePassword,
  uuid,
  login,
  logout,
  game,
  userScore,
  ranking,
  updateUser,
};
