import bcrypt from 'bcrypt';
import configs from '../configs';

export const hashPass = (password: string) =>
  bcrypt.hashSync(`${password}${configs.peper}`, Number(configs.salt));

export const checkPass = (pass: string, password: string) =>
  bcrypt.compareSync(`${pass}${configs.peper}`, password);
