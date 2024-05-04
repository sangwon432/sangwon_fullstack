import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoggedinUserDto } from './dto/loggedin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @Post('/login')
  async loggedInUser(@Body() loggedinUserDto: LoggedinUserDto) {
    const user = await this.authService.logInUser(loggedinUserDto);
    const token = await this.authService.generateAccessToken(user.id);
    return { user, token };
  }
}
