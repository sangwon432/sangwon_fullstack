import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RequestWithUserInterface } from './interfaces/requestWithUser.interface';
import { AccessTokenGuard } from './guards/access-token.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loggedInUser(@Req() req: RequestWithUserInterface) {
    // const user = await this.authService.logInUser(loggedinUserDto);
    // const token = await this.authService.generateAccessToken(user.id);
    // return { user, token };
    const { user } = req;
    console.log(user);
    const token = await this.authService.generateAccessToken(user.id);
    return { user, token };
    console.log('+++++++++++++++++++');
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async getUserInfo(@Req() req: RequestWithUserInterface) {
    return await req.user;
  }

  @Post('/email/test')
  async sendEmailTest(@Body('email') email: string) {
    // return await this.authService.sendEmailTest(email);
    return await this.authService.initEmailVerification(email);
    // console.log(email);
  }
}
