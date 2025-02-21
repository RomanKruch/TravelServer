import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Param,
  Post,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserRequest } from 'src/types/userRequest';
import { ToursService } from 'src/tours/tours.service';
import { Types } from 'mongoose';
import { UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private toursService: ToursService) {}

  @Patch()
  @UseGuards(new JwtGuard(JwtStrategy))
  async updateUser(@Req() req: UserRequest, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto.email && updateUserDto.email !== req.user.userInfo.email) {
      const existingUser = await this.usersService.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw new ConflictException('Email already here!');
      }
    }

    const updatedUser = await this.usersService.update(req.user.id, updateUserDto);

    return updatedUser;
  }

  @Post('like/:tourId')
  @UseGuards(new JwtGuard(JwtStrategy))
  async toggleLike(@Req() req: UserRequest, @Param('tourId') tourId: string) {
    if (!Types.ObjectId.isValid(tourId)) {
      throw new BadRequestException('Invalid tour ID format');
    }

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
