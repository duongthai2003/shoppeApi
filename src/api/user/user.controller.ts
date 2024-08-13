import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurdController } from '../shares/curd/curd.controller';
import { Users } from 'src/libs/models/user/users.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update.dto';

@ApiTags('user management')
@Controller('user')
export class UserController extends CurdController<
  Users,
  UpdateUserDto,
  UpdateUserDto
> {
  constructor(protected readonly userService: UserService) {
    super(userService);
  }
}
