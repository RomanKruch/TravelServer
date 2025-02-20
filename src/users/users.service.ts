import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './users.schema';
import { RegisterDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findById(id: Types.ObjectId) {
    return await this.userModel
      .findById(id)
      .select('-password')
      .populate({
        path: 'likedTours',
        model: 'Tour',
      })
      .exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ 'userInfo.email': email }).exec();
  }

  async create(userBody: RegisterDto) {
    const newUser = new this.userModel({ ...userBody, token: null, likedTours: [], role: 'user' });
    return newUser.save();
  }

  async updateToken(_id: Types.ObjectId, token: string | null) {
    return await this.userModel
      .findOneAndUpdate({ _id }, { token })
      .select('-password')
      .populate({
        path: 'likedTours',
        model: 'Tour',
      })
      .exec();
  }

  async addToLiked(user: User, tourId: string) {
    await this.userModel.findByIdAndUpdate(user._id, {
      likedTours: [...user.likedTours, new Types.ObjectId(tourId)],
    });
    return new Types.ObjectId(tourId);
  }

  async removeFromLiked(user: User, tourId: string) {
    await this.userModel.findByIdAndUpdate(user._id, {
      likedTours: user.likedTours.filter(tour => tour._id.toString() !== tourId),
    });
    return tourId;
  }
}
