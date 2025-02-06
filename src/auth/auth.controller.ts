import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialDuo } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
// import { AuthGuard } from '@nestjs/passport';
// import { Getuser } from './get-user-decoratore';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialDuo: AuthCredentialDuo) {
    return this.authService.signUp(authCredentialDuo);
  }
  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialDuo: AuthCredentialDuo,
  ): Promise<{ accesToken: string }> {
    return this.authService.signIn(authCredentialDuo);
  }
  // @Post('/test')
  // @UseGuards(AuthGuard())
  // async test(@Getuser() req) {
  //   console.log(req);
  // }
}
