import { Controller, Get, Query } from '@nestjs/common';
import { ToursService } from './tours.service';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  async getTours(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.toursService.getTours(+page, +limit);
  }
}