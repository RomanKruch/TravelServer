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
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserRequest } from 'src/types/userRequest';
import { TourDto } from './dto/tour.dto';
import { Types } from 'mongoose';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  async getTours(
    @Query('page') page = 1,
    @Query('limit') limit = 6,
    @Query('price') price?: string,
    @Query('title') title?: string,
    @Query('location') location?: string,
  ) {
    const filters = {
      price: price ? Number(price) : undefined,
      title,
      location,
    };

    return this.toursService.getTours(+page, +limit, filters);
  }

  @Get('cords')
  async getTourCoordinates() {
    return this.toursService.getTourCords();
  }

  @Get(':id')
  async getTourById(@Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid tour ID format');
    }

    const tour = await this.toursService.getTourById(new Types.ObjectId(id));

    if (!tour) {
      throw new NotFoundException('Invalid tour ID format');
    }

    return tour;
  }

  @Post()
  @UseGuards(new JwtGuard(JwtStrategy), AdminGuard)
  async createTour(@Request() req: UserRequest, @Body() tourDto: TourDto) {
    const newTour = await this.toursService.create(tourDto);
    return {
      newTour,
    };
  }
}
