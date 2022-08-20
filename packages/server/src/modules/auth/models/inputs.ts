import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class RegisterInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  fullName?: string;
}
