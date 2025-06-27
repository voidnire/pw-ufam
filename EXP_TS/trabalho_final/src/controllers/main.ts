import { Request, Response } from 'express';
import { generateLorem } from '../utils/lorem';
import { title } from 'process';

const index = (req: Request, res: Response) => {
  res.end('Página principal do site');
};

const bemvindo = (req: Request, res: Response) => {
  res.end('Welcome to Web academy!');
};

const produto = (req: Request, res: Response) => {
  res.render('produto', {
    layout: false,
  });
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

export default {
  index,
  sobre,
  bemvindo,
  lorem,
  hb1,
  hb2,
  hb3,
  hb4,
  ///hb5,
  produto,
};
