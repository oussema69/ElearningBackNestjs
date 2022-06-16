import { IsNotEmpty, IsEmail } from 'class-validator';
export class CategoriDto {

  @IsNotEmpty()
  name: string;
  logo:string;
}
