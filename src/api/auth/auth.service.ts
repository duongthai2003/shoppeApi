import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { use } from 'passport';
import * as bcrypt from 'bcrypt';
import { InjectMainDBModel, MainDBModel } from 'src/libs/connections/main-db';
import { JwtService } from '@nestjs/jwt';
import { TypeUer, Users } from 'src/libs/models/user/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectMainDBModel(MainDBModel.User)
    private readonly model: Model<Users>,
    private readonly Jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.model.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const validate = await bcrypt.compare(
      password,
      user.toObject().passwordHash,
    );

    if (!validate) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async getCurrentUser(userId?: any) {
    const user = this.model.findOne({
      _id: userId,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(user: any) {
    const userlog = user.toJSON();
    return {
      user: userlog,
      accessToken: this.Jwt.sign({
        sub: user._id,
        email: user.toObject().email,
      }),
    };
  }

  async register(body: any) {
    const findUser = await this.model.findOne({
      email: body.email.toLowerCase().trim(),
    });
    if (findUser) {
      throw new BadRequestException("User's email already existed!");
    }
    const passwordHash = await bcrypt.hash(body.password, 10);
    return this.model.create({
      ...body,
      email: body.email.toLowerCase().trim(),
      type: TypeUer.User,
      passwordHash,
    });
  }
}
