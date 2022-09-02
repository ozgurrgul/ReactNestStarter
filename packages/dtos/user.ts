import { IsNotEmpty } from "class-validator";

export class VerifyTokenInput {
  @IsNotEmpty()
  token: string;
}
