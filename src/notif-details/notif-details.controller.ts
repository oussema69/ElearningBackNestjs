import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NotifDetailsService } from './notif-details.service';
import { NotifDetailsDto } from './dto/notifDetails.dto';
import { Apprenant } from '../apprenants/interface/apprenant.interface';
import { FormateurDto } from '../formateurs/dto/formateur.dto';

@Controller('notif-details')
export class NotifDetailsController {
  constructor(private readonly notifService: NotifDetailsService) {}
  @Post()
  async create(@Body() notification: NotifDetailsDto) {
    const generatedId = await this.notifService.createForm(notification);

    return generatedId;
  }
  @Get()
  async findAllNot(): Promise<NotifDetailsDto[]> {
    return await this.notifService.findAllNotification();
  }
  @Get('/vis/:idApp')
  async findByVisibility(@Param('idApp') idApp: string): Promise<NotifDetailsDto[]> {
    return await this.notifService.findByvis(true, idApp);
  }
  @Get('/visf/:idF')
  async findByVisibilityF(
    @Param('idF') idF: string,
  ): Promise<NotifDetailsDto[]> {
    return await this.notifService.findByvisF(true, idF);
  }
  @Get('/app/:idApp')
  async findByidApp(@Param('idApp') idApp: string): Promise<NotifDetailsDto[]> {
    const not= await this.notifService.getByidApp(idApp);
    console.log(not)
    return not
  }
  @Get('/form/:idF')
  async findByidF(@Param('idF') idF: string): Promise<NotifDetailsDto[]> {
    return await this.notifService.getByIdF(idF);
  }
  @Put('/:idApp')
  async updatevis(@Param('idApp') idApp: string): Promise<Apprenant> {
    return this.notifService.updateVis(idApp);
  }
  @Put('/formateur/:idF')
  async updatevisf(@Param('idF') idF: string): Promise<any> {
    return this.notifService.updateVisF(idF);
  }
}
