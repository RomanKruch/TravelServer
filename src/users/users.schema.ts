import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import { Tour } from 'src/tours/tours.schema';

class UserInfo {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

@Schema()
export class User extends Document {
  @Prop({ required: true, type: UserInfo })
  userInfo: UserInfo;

  @Prop({ required: true })
  password: string;

  @Prop({ default: null })
  token: string | null;

  @Prop({ default: 0 })
  totalToursViewed: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: Tour.name }], default: [] })
  likedTours: Types.ObjectId[];

  @Prop({ default: 'user' })
  role: 'user' | 'admin';
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const SALT = await genSalt(parseInt(process.env.SALT));
  this.password = await hash(this.password, SALT);
});
