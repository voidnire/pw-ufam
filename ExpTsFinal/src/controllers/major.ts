import { Request, Response } from 'express';
import { createMajor, getAllMajors, removeMajor } from '../services/major';

const index = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    try {
      // Buscar todos os Majors do banco de dados
      const majors = await getAllMajors();
      // Renderizar a página passando os Majors para a view
      console.log(majors);
      res.render('major', { majors });
    } catch (err) {
      res.status(500).send('Erro ao carregar Majors');
    }
  }
};
const create = async (req: Request, res: Response) => {
  try {
    await createMajor(req.body);
    console.log('Curso criado com sucesso!');

    res.redirect('/major');
  } catch (err) {
    res.status(409);

    throw err; // Lançar o erro novamente para ser tratado

    //res.status(500).send(err);
  }
};

const read = (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(id);
};

const update = (req: Request, res: Response) => {};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('body:', req.body);
  console.log('params:', req.params.code);
  try {
    await removeMajor(req.params.code);

    res.status(200).send('Curso deletado com sucesso');
  } catch (err) {
    res.status(500).send('Erro ao deletar o curso');
  }
};

export default { index, read, create, update, remove };
