import bcrypt from 'bcrypt';
import configs from '../configs';

export const hashPass = (password: string) =>
  bcrypt.hash(`${password}${configs.peper}`, configs.salt, (err, hash) => {
    if (err) console.log(err);
    return hash;
  });

export const checkPass = (pass: string, password: string) =>
  bcrypt.compare(`${pass}${configs.peper}`, password, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    return result;
  });
