import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserRequest } from 'src/types/userRequest';
import { Types } from 'mongoose';
import { ToursService } from 'src/tours/tours.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private toursService: ToursService) {}

  @Post('like/:tourId')
  @UseGuards(new JwtGuard(JwtStrategy))
  async toggleLike(@Req() req: UserRequest, @Param('tourId') tourId: string) {
    const isInLiked = req.user.likedTours.includes(new Types.ObjectId(tourId));

    if (isInLiked) {
      const res = await this.usersService.removeFromLiked(req.user, new Types.ObjectId(tourId));
      return {
        id: res,
      };
    } else {
      const res = await this.usersService.addToLiked(req.user, new Types.ObjectId(tourId));
      const tour = this.toursService.getTourById(res);
      return {
        tour,
      };
    }
  }
  // @Get(':email')
  // async getUserByEmail(@Param('email') email: string) {
  //   return this.usersService.findByEmail(email);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('like/:tourId')
  // async toggleLike(@Req() req, @Param('tourId') tourId: string) {
  //   return this.usersService.toggleLikeTour(req.user.userId, tourId);
  // }
}
