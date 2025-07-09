import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../services/user';

// ...middleware usuário autenticado...
export async function sessionUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.locals.isAuthenticated = !!req.session.uid;

  if (req.session.uid) {
    try {
      const user = await getUserById(req.session.uid);
      res.locals.userName = user?.name || 'Usuário Logado';
    } catch (err) {
      res.locals.userName = 'Usuário Errado';
    }
  } else {
    res.locals.userName = 'Usuário';
  }

  next();
}
