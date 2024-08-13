import { Injectable } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

// @Injectable()
export class CurdService<table = Document> {
  constructor(protected readonly model: Model<table>) {}

  async getPaginationList(
    start: number,
    limit: number,
    filter?: FilterQuery<table>,
    options?: QueryOptions<table>,
    projection?: ProjectionType<table> | null,
  ) {
    const items = await this.model.find(
      {
        ...filter,
        deletedAt: null,
      },
      projection,
      {
        ...options,
        limit: limit,
        skip: start,
      },
    );
    const total = await this.model.countDocuments({
      ...filter,
      deletedAt: null,
    });
    return {
      items,
      start,
      limit,
      total,
    };
  }

  async createNew(body: any) {
    return await this.model.create({ ...body });
  }

  async updateById(id: string, body: UpdateQuery<any>, options?: QueryOptions) {
    return await this.model.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, ...options },
    );
  }

  async sofdeleteById(filter?: FilterQuery<table>, update?: UpdateQuery<any>) {
    return await this.model.findOneAndUpdate(
      { ...filter, deletedAt: null },
      { ...update, deletedAt: new Date() },
    );
  }

  async getById(id: string) {
    return await this.model.findById(id);
  }

  async getAll(
    filter?: FilterQuery<table>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions,
  ) {
    return await this.model.find(
      { ...filter, deletedAt: null },
      projection,
      options,
    );
  }

  async findOne(
    filter?: FilterQuery<any>,
    projection?: ProjectionType<any> | null,
    options?: QueryOptions,
  ) {
    return await this.model.findOne(filter, projection, options);
  }
}
