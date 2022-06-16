import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto/Notification.Dto';
import {Formation} from "../formations/models/models";

@Controller('notification')
export class NotificationController {
  constructor(private readonly NotificationService: NotificationService) {}
  @Post()
  async create(@Body() notification: NotificationDto) {
    const generatedId = await this.NotificationService.createForm(notification);

    return generatedId;
  }
  @Get('/:id')
  async findOnECat(@Param('id') id: string): Promise<NotificationDto> {
    return await this.NotificationService.findBytoken(id);
  }
  @Delete(':id')
  async deleteApp(@Param('id') id: string) {
    return await this.NotificationService.deleteApp(id);
  }
}
