import { Request, Response } from 'express';
import {
  createUser,
  removeUser,
  getAllUsers,
  updateUser,
  getUserById,
  getUserByEmail,
  removeGameSessions,
} from '../services/user';
import { userSchema } from '../types/schema';
import bcrypt from 'bcryptjs';

import { UpdateUserDto } from '../types/user';

import { getAllMajors, getMajor } from '../services/major';

const index = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    try {
      const users = await getAllUsers();
      const majors = await getAllMajors();

      const usersWithMajors = users.map((user) => ({
        user,
        major: majors.find((m) => m.id === user.majorId),
      }));
      console.log(usersWithMajors);

      res.render('user', { users: usersWithMajors });
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { name, email, password, majorId, confirmPassword } = req.body;

    if (!name || !email || !password || !majorId) {
      return res
        .status(400)
        .render('cadastro', { error: 'Todos os campos são obrigatórios' });
    }

    if (password !== confirmPassword) {
      return res.status(400).render('cadastro', {
        error: 'As senhas não coincidem',
        majors: await getAllMajors(),
      });
    }

    await createUser({
      name,
      email,
      password,
      majorId,
    });
    console.log('Cadastro feito com sucesso!');

    res.redirect('/');
  } catch (err) {
    res.status(409);

    throw err; // Lançar o erro novamente para ser tratado

    //res.status(500).send(err);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    console.log('OIE TO FAZENDO LOGIN PELO USER CONTROLLER RS');
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send('Todos os campos são obrigatórios');
    }
    await getUserByEmail(email);
    console.log('Usuário existente do email ', email);

    res.redirect('/');
  } catch (err) {
    res.status(409);

    throw err; // Lançar o erro novamente para ser tratado

    //res.status(500).send(err);
  }
};

const read = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await getUserById(id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const major = await getMajor(user.majorId);
    res.render('user/info', { user, major });
  } catch (err) {
    res.status(500).send(err);
  }
};

const update = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await getUserById(id);

  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  const majors = await getAllMajors();

  if (req.method === 'POST') {
    try {
      const { name, email, password, majorId } = req.body;

      const updateData: UpdateUserDto = {
        name,
        email,
        password,
        majorId,
      };

      await updateUser(id, updateData);

      res.redirect('/user');
    } catch (err) {
      res.status(500).send(err);
      res.status(500).send('Erro ao atualizar usuário');
    }
  }
};

const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Removendo as game sessions do usuário.', id);

  removeGameSessions(id);

  console.log('Removendo o usuário de id:', id);

  try {
    await removeUser(id);
    res.redirect('/user');
    res.status(200).send('Usuário deletado com sucesso');
  } catch (err) {
    console.log('Erro ao apagar usuário: ', err);
  }
};

const changePassword = async (req: Request, res: Response) => {
  const userId = req.cookies?.uid;
  const { currentPassword, newPassword, repeatNewPassword } = req.body;

  const user = await getUserById(userId);

  if (!user) {
    res.status(404).send('Usuário não encontrado');
    return;
  }

  // Verifica se a senha atual está correta
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    res
      .status(400)
      .render('alterarsenha', { error: 'Senha atual incorreta', user });
    return;
  }

  // Verifica se nova senha e repetir nova senha são iguais
  if (newPassword !== repeatNewPassword) {
    res.status(400).render('alterarsenha', {
      error: 'As novas senhas não coincidem',
      user,
    });
    return;
  }

  // Atualiza a senha usando o service (que já criptografa)
  try {
    await updateUser(userId, { password: newPassword });

    res.render('alterarsenha', {
      success: 'Senha alterada com sucesso!',
      user,
    });
  } catch (err) {
    console.error('Erro ao atualizar senha:', err);

    res
      .status(500)
      .render('alterarsenha', { error: 'Erro ao atualizar senha', user });
  }
};

export default {
  create,
  remove,
  index,
  update,
  changePassword,
  login,
};
