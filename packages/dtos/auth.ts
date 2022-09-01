import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  recaptcha_token: string;
}

export class RegisterInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  recaptcha_token: string;

  fullName?: string;
}
