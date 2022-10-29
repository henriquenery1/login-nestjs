import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { AuthService } from '../src/auth/auth.service'

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  const dto: AuthDto = {
    email: 'test@test.com',
    password: '12345',
  };

  beforeEach(() => {
    authService = new AuthService(prismaService);
  });

  it('should return signup was succefull', async () => {
    const result = { message: 'signup was succefull' };
    console.log(authService.signup(dto));

    expect(authService.signup(dto)).toBe(result);
  });
});
