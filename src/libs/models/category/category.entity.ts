import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  _id: true,
  timestamps: true,
})
export class Category {
  @Prop({
    required: true,
  })
  categoryName: string;

  @Prop({})
  deletedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
