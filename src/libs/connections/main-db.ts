import { InjectModel, ModelDefinition } from '@nestjs/mongoose';

export enum MainDBModel {
  User = 'users',
}

export const MainDBModels: ModelDefinition[] = [];

export const InjectMainDBModel = (model: MainDBModel) =>
  InjectModel(model, process.env.NAME_DATABASE);
