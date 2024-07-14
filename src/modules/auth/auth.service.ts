import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
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
    const token = this.jwtService.sign(
      { email: user.email },
      { expiresIn: '1h' },
    );

    await this.mailService.sendUserConfirmation(user, token);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findByEmail(loginUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new ForbiddenException('Account is temporarily locked');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      await this.handleFailedLogin(user);
      throw new UnauthorizedException('Invalid credentials');
    }

    user.loginAttempts = 0;
    user.lockUntil = null;
    await this.userService.update(user.userId, user);

    const payload = { email: user.email, sub: user.userId };
    return { accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }) };
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

    const token = this.jwtService.sign(
      { email: user.email },
      { expiresIn: '1h' },
    );
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

  private async handleFailedLogin(user: any): Promise<void> {
    user.loginAttempts += 1;
    if (user.loginAttempts >= 5) {
      const lockTime = 30 * 60 * 1000;
      user.lockUntil = new Date(Date.now() + lockTime);
    }
    await this.userService.update(user.userId, user);
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
    const { email, token, newPassword } = changePasswordDto;
    let user;

    if (token) {
      try {
        const decodedToken = this.jwtService.verify(token);
        user = await this.userService.findByEmail(decodedToken.email);
      } catch (error) {
        throw new BadRequestException('Invalid or expired token');
      }
    } else if (email) {
      user = await this.userService.findByEmail(email);
      if (!user) {
        throw new BadRequestException('Invalid email');
      }
    } else {
      throw new BadRequestException('Email or token is required');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.passwordHash = hashedPassword;
    await this.userService.update(user.userId, user);
  }
}
