import { IsEmail, IsNotEmpty } from 'class-validator';
export class FormateurDto {
  @IsNotEmpty()
  id?: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  tel: number;
  @IsNotEmpty()
  static isValid: boolean;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  logo: string;
  spec: string;
  idR: string[];
  mois: number;
  year: number;
}
