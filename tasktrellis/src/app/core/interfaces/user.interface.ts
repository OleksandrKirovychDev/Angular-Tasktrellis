export interface IUser {
  id: string;
  sub: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export type TLoginUser = Pick<IUser, 'email'> & { password: string };

export type TCreateUser = Pick<IUser, 'email' | 'name'> & { password: string };
