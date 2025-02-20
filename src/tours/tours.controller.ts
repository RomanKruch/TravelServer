import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
  Body,
  ForbiddenException,
  Param,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserRequest } from 'src/types/userRequest';
import { TourDto } from './dto/tour.dto';
import { Types } from 'mongoose';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  async getTours(
    @Query('page') page = 1,
    @Query('limit') limit = 6,
    @Query('price') price?: string,
    @Query('name') name?: string,
    @Query('location') location?: string,
  ) {
    const filters = {
      price: price ? Number(price) : undefined,
      name,
      location,
    };

    return this.toursService.getTours(+page, +limit, filters);
  }

  @Get(':id')
  async getTourById(@Param('id') id: string) {
    return this.toursService.getTourById(new Types.ObjectId(id));
  }

  @Post()
  @UseGuards(new JwtGuard(JwtStrategy))
  async createTour(@Request() req: UserRequest, @Body() tourDto: TourDto) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('You are not ADMIN!');
    }

    const newTour = await this.toursService.create(tourDto);
    return {
      newTour,
    };
  }
}
