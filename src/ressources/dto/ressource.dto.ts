import { IsNotEmpty, IsEmail } from 'class-validator';
import { Schema ,Types} from 'mongoose';
export class RessourceDto {

  @IsNotEmpty()
  titre: String;
  @IsNotEmpty()
  desc: String;
  @IsNotEmpty()
  idch: String;
  @IsNotEmpty()
  fic: String;
  type:String;
}
