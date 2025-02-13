import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async get() {
    return 'users';
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
