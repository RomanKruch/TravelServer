import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { Tour, TourSchema } from './tours.schema';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/users.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [ToursController],
  providers: [ToursService],
  exports: [ToursService],
})
export class ToursModule {}
