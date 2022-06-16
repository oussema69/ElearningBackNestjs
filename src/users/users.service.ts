import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './interface/user.interface';
import { JwtPayload } from './interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';
import * as jwt from 'jsonwebtoken';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Create a new user
   * @param name
   * @param email
   * @param password
   */
  async create(name: string, email: string, password: string): Promise<User> {
    const createdUser = new this.userModel({ name, email, password });
    return createdUser.save();
  }

  /**
   * Find all users
   */
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  /**
   * Find user by name
   */
  async findOne(name): Promise<User> {
    return this.userModel.findOne({ name }).exec();
  }
  /**
   * update user
   */
  async update(id: string, update: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, update).exec();
  }
  /**
   * delete
   */
  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
  async createvaza(createTodoDto: UserDto): Promise<User> {
    return await new this.userModel({
      ...createTodoDto,
      createdAt: new Date(),
    }).save();
  }
  async login(tokenDto: TokenDto) {
    const user = await this.userModel.findOne({
      email: tokenDto.email,
      password: tokenDto.password,
    });

    if (!user) {
      return null;
    } else {
      if (user) {
        const token = jwt.sign({ data: user }, 'mhatlioussema');
        return token;
      } else {
        return null;
      }
    }
  }
  createJwtPayload(user) {
    const data: JwtPayload = {
      password: user.password,
      email: user.email,
      _id: user._id,
    };

    const jwt = this.jwtService.sign(data);

    return jwt;
  }
  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const User = await this.userModel.findOne({
      email: payload.email,
      password: payload.password,
    });

    if (User) {
      return this.createJwtPayload(User);
    } else {
      throw new UnauthorizedException();
    }
  }

}
