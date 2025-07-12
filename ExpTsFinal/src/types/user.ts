import { User, GameSession  } from '@prisma/client';

export type UserCreateDto = Pick<User, 'name' | 'email' | 'password'>;

export type LoginDto = Pick<User, 'email' | 'password'>;

export type UpdateUserDto = Partial<
  Pick<User, 'name' | 'email' | 'password' | 'majorId'>
>;
export type CreatedUserDto = Pick<
  User,
  'name' | 'email' | 'password' | 'majorId'
>;

export type GameSessionDto = Pick<
  GameSession,
  'user_id' | 'score'
>;