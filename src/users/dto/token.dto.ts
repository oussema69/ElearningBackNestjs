import { IsNotEmpty, IsEmail } from 'class-validator';
export class TokenDto {
  @IsNotEmpty()
  id: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
