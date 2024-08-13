import { InjectModel, ModelDefinition } from '@nestjs/mongoose';
import { UserSchema } from '../models/user/users.entity';
import { CategorySchema } from '../models/category/category.entity';
import { ProductSchema } from '../models/product/product.entity';

export enum MainDBModel {
  User = 'users',
  Category = 'Category',
  Product = 'Products',
}

export const MainDBModels: ModelDefinition[] = [
  {
    name: MainDBModel.User,
    schema: UserSchema,
  },
  {
    name: MainDBModel.Category,
    schema: CategorySchema,
  },
  {
    name: MainDBModel.Product,
    schema: ProductSchema,
  },
];

export const InjectMainDBModel = (model: MainDBModel) =>
  InjectModel(model, 'Shoppee');
