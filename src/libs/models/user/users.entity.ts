import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export enum TypeUer {
  Admin = 1,
  User = 2,
}

@Schema({
  _id: true,
  timestamps: true,
  toObject: {
    virtuals: true,
  },
})
export class Users extends Model {
  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    required: true,
  })
  userName: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  passwordHash: string;

  @Prop({
    type: Number,
    enum: TypeUer,
  })
  type: TypeUer;

  @Prop({})
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);
UserSchema.virtual('fullName').get(function () {
  return `${this.firstName}${this.lastName}`;
});
