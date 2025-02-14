import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
  Body,
  ForbiddenException,
} from '@nestjs/common';
import { ToursService } from './tours.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserRequest } from 'src/types/userRequest';
import { TourDto } from './dto/tour.dto';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  async getTours(@Query('page') page = 1, @Query('limit') limit = 6) {
    return this.toursService.getTours(+page, +limit);
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
