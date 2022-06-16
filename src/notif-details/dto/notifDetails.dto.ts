import { IsNotEmpty } from 'class-validator';

export class NotifDetailsDto {
  @IsNotEmpty()
  title: string;
  name: string;
  visible: boolean;
  idApp: string;
  idF: string;
  date: Date;
}
