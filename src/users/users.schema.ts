import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { genSalt, hash } from 'bcrypt';

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

  @Prop()
  token: string | null;

  @Prop({ type: Types.ObjectId })
  likedTours: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const SALT = await genSalt(parseInt(process.env.SALT));
  this.password = await hash(this.password, SALT);
});
