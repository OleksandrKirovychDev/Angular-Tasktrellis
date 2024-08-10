import { Request, Response } from 'express';
import { UserResponce } from '../dto/user.dto';
import { AppDataSource } from '../database/data-source';
import { User } from '../entity/user.entity';
import { encrypt } from '../utils/enryption.util';

export class UserController {
  static async signup(req: Request, res: Response) {
    const { name, email, password, role } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.role = role;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    const userdataSent = new UserResponce();
    userdataSent.name = user.name;
    userdataSent.email = user.email;
    userdataSent.role = user.role;

    const token = encrypt.generateToken(user);

    return res
      .status(200)
      .json({ message: 'User created successfully', token });
  }
}
