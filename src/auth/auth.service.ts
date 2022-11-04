import { BadRequestException, Injectable } from '@nestjs/common';
import { prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Hash } from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, jwt: JwtService) {}

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('Email já cadastrado');
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return { message: 'Autenticação realizada com sucesso' };
  }

  async signin(dto: AuthDto) {
    const { email, password } = dto 

    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (!foundUser) {
      throw new BadRequestException('Credenciais inválidas');
    }

    const isMatch = await this.comparePassword({password, hash: foundUser.hashedPassword});
    if (!isMatch) {
      throw new BadRequestException('Credenciais inválidas');
    }

    return ''
  }

  async signout() {
    return 'Hello world!'
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword({password, hash}): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
