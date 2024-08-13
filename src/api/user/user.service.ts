import { Controller, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectMainDBModel, MainDBModel } from 'src/libs/connections/main-db';

import { CurdService } from '../shares/curd/curd.service';
import { Users } from 'src/libs/models/user/users.entity';

@Injectable()
export class UserService extends CurdService<Users> {
  constructor(
    @InjectMainDBModel(MainDBModel.User)
    protected readonly model: Model<Users>,
  ) {
    super(model);
  }
}
