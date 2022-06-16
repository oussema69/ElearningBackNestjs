import { IsNotEmpty, IsEmail } from 'class-validator';
export class TokenADto {
  @IsNotEmpty()
  id?: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  tel: number;
  @IsNotEmpty()
  isValid: boolean;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  logo: string;
  spec: string;
  idR: string[];

}
