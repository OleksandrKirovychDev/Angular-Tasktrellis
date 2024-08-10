import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UserResponce } from '../dto/user.dto';
import { Constants } from './constants.util';

export class encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: UserResponce) {
    if (!process.env.JWT_SECRET) throw Error('np jwt secret provided');
    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: Constants.JWT_EXPIRES_IN,
    });
  }
}
