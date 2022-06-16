import { IsNotEmpty } from 'class-validator';

export class NotificationDto {
  @IsNotEmpty()
  id?: string;
  @IsNotEmpty()
  idApp: string;
  @IsNotEmpty()
  token: string;
}
