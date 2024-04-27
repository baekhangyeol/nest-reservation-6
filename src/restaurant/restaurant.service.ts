import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateRestaurantRequestDto } from './dto/request/create-restaurant-request.dto';
import { CreateRestaurantResponseDto } from './dto/response/create-restaurant-response.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  async createRestaurant(createRestaurantDto: CreateRestaurantRequestDto, userId: number): Promise<CreateRestaurantResponseDto> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const restaurant = this.restaurantRepository.create({
      ...createRestaurantDto,
      user: user,
    });
    await this.restaurantRepository.save(restaurant);
    return CreateRestaurantResponseDto.from(restaurant);
  }
}
