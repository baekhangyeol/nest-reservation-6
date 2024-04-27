import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { User } from './entities/user.entity';
import { Reservation } from './entities/reservation.entity';
import { Image } from './entities/image.entity';
import { Menu } from './entities/menu.entity';
import { AvailableTime } from './entities/availableTime.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, User, Reservation, Image, Menu, AvailableTime])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
