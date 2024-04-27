import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateRestaurantRequestDto } from './dto/request/create-restaurant-request.dto';
import { CreateRestaurantResponseDto } from './dto/response/create-restaurant-response.dto';
import { AvailableTime } from './entities/availableTime.entity';
import { GetRestaurantResponseDto } from './dto/response/get-restaurant-response.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AvailableTime)
    private availableTimeRepository: Repository<AvailableTime>,
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

  async addAvailableTime(restaurantId: number, availableTimes: string[]): Promise<void> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['availableTime'],
    });

    for (const timeString of availableTimes) {
      const time = new Date(timeString);
      const newAvailableTime = this.availableTimeRepository.create({
        time: time,
        restaurant: restaurant,
      });
      await this.availableTimeRepository.save(newAvailableTime);
    }
  }

  async getRestaurantById(restaurantId: number): Promise<GetRestaurantResponseDto> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['images', 'menus', 'availableTime'],
    })
    return GetRestaurantResponseDto.from(restaurant);
    }
}
