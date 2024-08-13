import { Injectable } from '@nestjs/common';
import { InjectMainDBModel, MainDBModel } from 'src/libs/connections/main-db';
import { Category } from 'src/libs/models/category/category.entity';
import { CurdService } from '../shares/curd/curd.service';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService extends CurdService<Category> {
  constructor(
    @InjectMainDBModel(MainDBModel.Category)
    protected readonly model: Model<Category>,
  ) {
    super(model);
  }
  async create(body: any) {
    return await this.model.create({ ...body });
  }
}
