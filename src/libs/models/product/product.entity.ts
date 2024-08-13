import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Category } from '../category/category.entity';

@Schema({
  _id: true,
  timestamps: true,
})
export class Products {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({})
  description: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  @Type(() => Category)
  categoryId: Category;

  @Prop({
    required: true,
  })
  productImg: string;
}

export const ProductSchema = SchemaFactory.createForClass(Products);
