import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tour } from './tours.schema';
import { TourDto } from './dto/tour.dto';

interface TourFilters {
  price?: number;
  title?: string;
  location?: string;
}

@Injectable()
export class ToursService {
  constructor(@InjectModel(Tour.name) private tourModel: Model<Tour>) {}

  async getTours(page: number, limit: number, filters: TourFilters) {
    const query: any = {};

    if (filters.price) {
      query.price = { $lte: filters.price }; // Find tours with price <= given value
    }
    if (filters.title) {
      query.title = { $regex: filters.title, $options: 'i' }; // Case-insensitive search
    }
    if (filters.location) {
      query.location = { $regex: filters.location, $options: 'i' };
    }

    return this.tourModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async getTourById(id: Types.ObjectId) {
    return this.tourModel.findById(id).exec();
  }

  async create(tourBody: TourDto) {
    const newTour = new this.tourModel(tourBody);
    return newTour.save();
  }
}
