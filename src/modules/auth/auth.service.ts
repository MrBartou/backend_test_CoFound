import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<void> {
    const user = await this.userService.create(createUserDto);
    const token = this.jwtService.sign({ email: user.email });

    await this.mailService.sendUserConfirmation(user, token);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(loginUserDto.email);

    if (
      !user ||
      !(await bcrypt.compare(loginUserDto.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.userId };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const user = await this.userService.findByEmail(resetPasswordDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const token = this.jwtService.sign({ email: user.email });
    await this.mailService.sendPasswordReset(user, token);
  }

  async confirmEmail(token: string): Promise<void> {
    try {
      const { email } = this.jwtService.verify(token);
      await this.userService.confirmEmail(email);
    } catch (error) {
      throw new BadRequestException('Invalid token');
    }
  }
}
