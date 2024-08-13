import { Request, Response } from 'express';
import { UserResponce, UserRequest } from '../dto/user.dto';
import { AppDataSource } from '../database/data-source';
import { User } from '../entity/user.entity';
import { encrypt } from '../utils/enryption.util';
import { validate } from 'class-validator';

export class UserController {
  static async signup(req: Request, res: Response) {
    const { name, email, password, role } = req.body as UserRequest;
    const encryptedPassword = await encrypt.encryptpass(password);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = role || 'user';

    const errors = await validate(user);

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed' });
    }

    user.password = encryptedPassword;

    const token = encrypt.generateToken({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
    });

    const userRepository = AppDataSource.getRepository(User);

    const userExists = await userRepository.findOne({
      where: {
        email: user.email,
      },
    });

    if (userExists)
      return res.status(409).json({ message: 'User already exists' });

    await userRepository.save(user);

    const userdataSent = new UserResponce();
    userdataSent.name = user.name;
    userdataSent.email = user.email;
    userdataSent.role = user.role;

    return res
      .status(200)
      .json({ message: 'User created successfully', token });
  }

  static async signin(req: Request, res: Response) {
    const { email, password } = req.body as Pick<
      UserRequest,
      'email' | 'password'
    >;

    const userRepository = AppDataSource.getRepository(User);

    const userFromDB = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!userFromDB)
      return res.status(400).json({ message: 'No such user exists' });

    const isValidPassword = await encrypt.comparepassword(
      userFromDB.password,
      password
    );

    if (!isValidPassword)
      return res.status(400).json({ message: 'Invalid password' });

    const token = encrypt.generateToken({
      name: userFromDB.name,
      email: userFromDB.email,
      role: userFromDB.role,
      id: userFromDB.id,
    });

    return res.status(200).json({ message: 'Signin was successful', token });
  }
}
