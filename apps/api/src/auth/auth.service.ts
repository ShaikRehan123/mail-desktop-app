import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/primsa.service';
import { SigninDto, SignupDto } from './auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async signup(data: SignupDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: await argon.hash(data.password),
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email already exists');
        }
      }

      throw new InternalServerErrorException(
        'Something went wrong , Please try again later',
      );
    }
  }

  async signin(data: SigninDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('Invalid credentials');
      }
      const passwordMatch = await argon.verify(user.password, data.password);
      if (!passwordMatch) {
        throw new ForbiddenException('Invalid credentials');
      }
      delete user.password;

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        this.config.get<string>('JWT_SECRET'),
        {
          expiresIn: '7d',
        },
      );

      return {
        user,
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Something went wrong , Please try again later',
      );
    }
  }
}
