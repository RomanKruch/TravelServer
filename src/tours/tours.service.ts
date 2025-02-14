import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tour } from './tours.schema';

@Injectable()
export class ToursService {
  constructor(@InjectModel(Tour.name) private tourModel: Model<Tour>) {}

  async getTours(page: number, limit: number) {
    return this.tourModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async getTourById(id: Types.ObjectId) {
    return this.tourModel.findById(id);
  }
}
