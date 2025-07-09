import { LoginDto } from '../types/user';
import bcrypt from 'bcryptjs';
import { PrismaClient, User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

export const checkAuth = async (credentials: LoginDto): Promise<boolean> => {
  console.log('checando credenciais..');
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });
  if (!user) return false;
  return await bcrypt.compare(credentials.password, user.password);
};

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.uid) {
    return next();
  }
  // Redireciona para login se não estiver autenticado
  res.redirect('/login');
}
