import { IsNotEmpty, IsEmail } from 'class-validator';
export class ApprenantDto {
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
  idR: string[];
  mois: number;
  year: number;
}
