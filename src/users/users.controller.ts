import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Put,
  Res,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './interface/user.interface';
import { UsersService } from './users.service';
import { TokenDto } from './dto/token.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = { name: name, email: email, password: password };
    const generatedId = await this.usersService.createvaza(user);
    return { id: generatedId };
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/one')
  async findOne(@Body('name') name: string): Promise<User> {
    return this.usersService.findOne(name);
  }
  @Put('/:id')
  async update(@Param('id') id: string, @Body() userUpdate): Promise<User> {
    return this.usersService.update(id, userUpdate);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }

  @Post('/login')
  async sendToken(@Res() res, @Body() tokenDto: TokenDto) {
    const user = await this.usersService.login(tokenDto);
    if (user === null) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'email or password incorrecte',
      });
    }
    return res.status(HttpStatus.OK).json({
      token: user,
    });
  }
}
