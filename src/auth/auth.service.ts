import { BadRequestException, Injectable } from '@nestjs/common';
import { prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('email already exists');
    }
    
    return { message: 'signup was succefull' };
  }

  async signin() {
    return { message: "signin" };
  }

  async signout() {
    return 'Hello world!'
  }
}
