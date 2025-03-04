import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './users.schema';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { UpdateUserDto } from './dto/user.dto';

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

  async getPassword(id: Types.ObjectId) {
    return (await this.userModel.findById(id)).password;
  }

  async create(userBody: RegisterDto) {
    const newUser = new this.userModel(userBody);
    return newUser.save();
  }

  async update(id: Types.ObjectId, userInfo: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(
        id,
        { userInfo },
        {
          new: true,
          runValidators: true,
        },
      )
      .select('-password')
      .populate({
        path: 'likedTours',
        model: 'Tour',
      })
      .exec();
  }

  async updateToken(id: Types.ObjectId, token: string | null) {
    return await this.userModel
      .findByIdAndUpdate(
        id,
        { token },
        {
          new: true,
          runValidators: true,
        },
      )
      .select('-password')
      .populate({
        path: 'likedTours',
        model: 'Tour',
      })
      .exec();
  }

  async updatePassword(id: Types.ObjectId, password: string) {
    return this.userModel.findByIdAndUpdate(id, { password });
  }

  async countTotalViewed(id: Types.ObjectId) {
    return this.userModel.findByIdAndUpdate(id, { $inc: { totalToursViewed: 1 } });
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

  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
