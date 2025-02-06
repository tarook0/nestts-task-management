import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialDuo } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private taskRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(authCredentialDuo: AuthCredentialDuo): Promise<void> {
    const { password, userName } = authCredentialDuo;
    const user = new User();
    user.userName = userName;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashpassword(password, user.salt);
    // console.log(user);
    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return;
  }
  async signIn(
    authCredentialDuo: AuthCredentialDuo,
  ): Promise<{ accesToken: string }> {
    const { password, userName } = authCredentialDuo;
    const user = await this.taskRepository.findOne({ where: { userName } });
    try {
      if (user && (await user.validatPassword(password))) {
        const payload: JwtPayload = { userName };
        const accesToken = this.jwtService.sign(payload);
        return { accesToken };
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid credentails');
    }
  }
  private async hashpassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
