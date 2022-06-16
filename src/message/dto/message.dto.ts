import { IsEmail, IsNotEmpty } from 'class-validator';
export class MessageDto {
  @IsNotEmpty()
  id?: string;
  idS: string;
  idR: string;
  messages: [{ msg: string; ids: string }];
  visible: boolean;

}
