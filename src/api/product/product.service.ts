import { BadRequestException, Injectable } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  mongo,
  ProjectionType,
  QueryOptions,
} from 'mongoose';
import { InjectMainDBModel, MainDBModel } from 'src/libs/connections/main-db';
import { Products } from 'src/libs/models/product/product.entity';
import { CurdService } from '../shares/curd/curd.service';
import * as fs from 'fs';

@Injectable()
export class ProductService extends CurdService<Products> {
  constructor(
    @InjectMainDBModel(MainDBModel.Product)
    protected readonly model: Model<Products>,
  ) {
    super(model);
  }
  async getPaginationList(
    start: number,
    limit: number,
    filter?: FilterQuery<Products>,
  ) {
    return super.getPaginationList(start, limit, filter, {
      sort: {
        createdAt: 'desc',
      },
      populate: ['categoryId'],
    });
  }

  async create(body: any, file: any) {
    if (file) {
      try {
        return await this.model.create({
          ...body,
          productImg: file.filename,
        });
      } catch (err) {
        fs.unlink(`./uploads/${file.filename}`, (err) => {
          if (err) {
            return err;
          }
        });
        throw new BadRequestException(err);
      }
    } else {
      throw new BadRequestException('File is required');
    }
  }
}
