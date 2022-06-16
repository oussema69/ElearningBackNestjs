import {Body, Controller, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
import { Message } from './model/message.model';
import { Visio } from '../visio/model/visio';

@Controller('message')
export class MessageController {
  constructor(private readonly msgservice: MessageService) {}
  @Post()
  async create(@Body() message: MessageDto) {
    const generatedId = await this.msgservice.createMsg(message);

    return generatedId;
  }
  @Get('/getmsg/:idS/:idR')
  async findByids(
    @Param('idS') idS: string,
    @Param('idR') idR: string,
  ): Promise<Message> {
    return await this.msgservice.findByids(idS, idR);
  }

  @Put('/:id/:msg/:ids')
  async pushmsg(
    @Param('id') id: string,
    @Param('msg') msg: string,
    @Param('ids') ids: string,
  ): Promise<any> {
    return this.msgservice.pushmsg(id, msg, ids);
  }
  @Get('/ver/:idS/:idR')
  async verif(
    @Param('idS') idS: string,
    @Param('idR') idR: string,
  ): Promise<Message> {
    return await this.msgservice.verif(idS, idR);
  }
  //te7seb lmsget l ma9rahomch
  @Get('/countmsg/:idf')
  async count(@Param('idf') idf: string): Promise<number> {
    return await this.msgservice.findconvbyform(idf);
  }
  @Get('/countmsgbyuser/:idM/:idApp')
  async countbys(
    @Param('idM') idM: string,
    @Param('idApp') idApp: string,
  ): Promise<number> {
    return await this.msgservice.findvisbysender(idM, idApp);
  }
  @Put('/upd/:idf')
  async upd(@Param('idf') idf: string): Promise<any> {
    return this.msgservice.updateVis(idf);
  }
  @Patch('/viwed/:idM/:idApp')
  async viewd(
    @Param('idM') idM: string,
    @Param('idApp') idApp: string,
  ): Promise<any> {
    return this.msgservice.updatevisbysender(idM, idApp);
  }
}
