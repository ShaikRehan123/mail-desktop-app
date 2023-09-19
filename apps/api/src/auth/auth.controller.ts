import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SigninDto, SignupDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiTags('auth')
  @ApiBody({ type: SignupDto })
  @ApiResponse({
    status: 201,
    description: 'Signup successful',
  })
  @ApiResponse({
    status: 403,
    description: 'Email already exists',
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong , Please try again later',
  })
  async signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post('signin')
  @ApiTags('auth')
  @ApiBody({ type: SigninDto })
  @ApiResponse({
    status: 200,
    description: 'Signin successful',
  })
  @ApiResponse({
    status: 403,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong , Please try again later',
  })
  @HttpCode(200)
  async signin(@Body() data: SigninDto) {
    return this.authService.signin(data);
  }
}
