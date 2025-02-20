import { Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserRequest } from 'src/types/userRequest';
import { ToursService } from 'src/tours/tours.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private toursService: ToursService) {}

  @Post('like/:tourId')
  @UseGuards(new JwtGuard(JwtStrategy))
  async toggleLike(@Req() req: UserRequest, @Param('tourId') tourId: string) {
    const isInLiked = req.user.likedTours.some(tour => tour._id.toString() === tourId);

    if (isInLiked) {
      const res = await this.usersService.removeFromLiked(req.user, tourId);
      return {
        id: res,
      };
    } else {
      const res = await this.usersService.addToLiked(req.user, tourId);
      const tour = await this.toursService.getTourById(res);
      return tour;
    }
  }
}
