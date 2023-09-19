import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsString({
    message: 'Name must be a string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  @IsNotEmpty({
    message: 'Email is required',
  })
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'Email of the user',
    format: 'email',
  })
  email: string;

  @IsString({
    message: 'Password must be a string',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @ApiProperty({
    example: '123456',
    description: 'Password of the user',
    format: 'password',
  })
  password: string;
}

export class SigninDto {
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'Email of the user',
  })
  email: string;
  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsString({
    message: 'Password must be a string',
  })
  @ApiProperty({
    example: '123456',
    description: 'Password of the user',
  })
  password: string;
}
