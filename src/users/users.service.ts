import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './users.schema';
import { RegisterDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findById(id: Types.ObjectId) {
    return this.userModel.findOne({ _id: id });
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ 'userInfo.email': email });
  }

  async create(userBody: RegisterDto) {
    const newUser = new this.userModel({ ...userBody, token: null, likedTours: [] });
    return newUser.save();
  }

  async updateToken(_id: Types.ObjectId, token: string | null) {
    await this.userModel.findOneAndUpdate({ _id }, { token });
  }

  async addToLiked(user: User, tourId: Types.ObjectId) {
    await this.userModel.findByIdAndUpdate(user._id, {
      likedTours: [...user.likedTours, tourId],
    });
    return tourId;
  }

  async removeFromLiked(user: User, tourId: Types.ObjectId) {
    await this.userModel.findByIdAndUpdate(user._id, {
      likedTours: user.likedTours.filter(tour => tour._id !== tourId),
    });
    return tourId;
  }
}
