import { PrismaClient, User, GameSession } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  UserCreateDto,
  LoginDto,
  UpdateUserDto,
  CreatedUserDto,
  GameSessionDto,
} from '../types/user';

const prisma = new PrismaClient();

export const getAllUsers = async (): Promise<User[]> => {
  console.log('Pegando todos os users...');

  return prisma.user.findMany({
    include: {
      major: true, // Include the related major data
    },
  });
};

/*export const createUser = async (user: UserCreateDto): Promise<User> => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(user.password, salt);
  user.password = password;
  return await prisma.user.create({
    data: user,
  });
};*/
export const createUser = async (newUser: CreatedUserDto): Promise<User> => {
  const salt = await bcrypt.genSalt(2);
  const encryptedPass = await bcrypt.hash(newUser.password, salt);
  return await prisma.user.create({
    data: {
      name: newUser.name,
      email: newUser.email,
      password: encryptedPass,
      majorId: newUser.majorId,
    },
  });
};

export const removeUser = async (userId: string): Promise<User> => {
  const userToDelete = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userToDelete) {
    throw new Error('User não encontrado');
  }

  const deletedUser = await prisma.user.delete({
    where: { id: userId },
  });

  console.log('Removendo curso...', deletedUser.name);
  return deletedUser;
};

export const userAlreadyExists = async (name: string): Promise<User | null> => {
  console.log('Verificando se usuário já existe...', name);
  return await prisma.user.findFirst({
    where: { name },
  });
};

export const updateUser = async (
  id: string,
  userData: UpdateUserDto,
): Promise<User> => {
  // Se for atualizar a senha, criptografa antes de salvar
  if (userData.password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);
  }

  return await prisma.user.update({
    where: { id },
    data: userData,
  });
};

export const getUserById = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      major: true, // Include the related major data
    },
  });
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const saveGameSession = async (
  score: string,
  userId: string,
): Promise<GameSession> => {
  if (!userId) throw new Error('Usuário não autenticado');

  const numericScore = parseInt(score, 10);

  return await prisma.gameSession.create({
    data: {
      user_id: userId,
      score: numericScore, //TRANFORMA PRA NUMEOR
    },
  });
};

export const getRanking = async () => {
  // Busca a maior pontuação de cada usuário
  const sessions = await prisma.gameSession.findMany({
    orderBy: [{ score: 'desc' }],
    include: { user: true },
  });

  // Agrupa por usuário e pega a maior pontuação
  const rankingMap = new Map();
  sessions.forEach((session) => {
    const existing = rankingMap.get(session.user_id);
    if (!existing || session.score > existing.score) {
      rankingMap.set(session.user_id, {
        name: session.user.name,
        score: session.score,
      });
    }
  });
  return Array.from(rankingMap.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((entry, index) => ({
      position: index + 1,
      ...entry,
    }));
};

export const removeGameSessions = async (id: string) => {
  await prisma.gameSession.deleteMany({
    where: { user_id: id },
  });
};
