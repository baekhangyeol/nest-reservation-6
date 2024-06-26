import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Like, MoreThanOrEqual, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateRestaurantRequestDto } from './dto/request/create-restaurant-request.dto';
import { CreateRestaurantResponseDto } from './dto/response/create-restaurant-response.dto';
import { AvailableTime } from './entities/availableTime.entity';
import { GetRestaurantResponseDto } from './dto/response/get-restaurant-response.dto';
import { ReservationRestaurantRequestDto } from './dto/request/reservation-restaurant-request.dto';
import { Reservation } from './entities/reservation.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { createPaginationResult, PaginationResult } from '../common/util/pagination.util';
import { GetReservationsResponseDto } from './dto/response/get-reservations-response.dto';
import { GetRestaurantsResponseDto } from './dto/response/get-restaurants-response.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AvailableTime)
    private availableTimeRepository: Repository<AvailableTime>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
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
    restaurant.clickCount += 1;
    return GetRestaurantResponseDto.from(restaurant);
  }

  async getAvailableTimes(restaurantId: number): Promise<AvailableTime[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.availableTimeRepository.find({
      where: {
        restaurant: { id: restaurantId },
        time: MoreThanOrEqual(today),
      },
      order: {
        time: 'ASC',
      }
    })
  }

  async reservationRestaurant(userId: number, restaurantId: number, availableTimeId: number, reservationRestaurantRequestDto: ReservationRestaurantRequestDto): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userId });

    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
    });

    const availableTime = await this.availableTimeRepository.findOne({
      where: { id: availableTimeId },
      relations: ['restaurant'],
    });

    const newReservation = this.reservationRepository.create({
      ...reservationRestaurantRequestDto,
      user: user,
      restaurant: restaurant,
      availableTime: availableTime,
    });

    await this.reservationRepository.save(newReservation);
  }

  async getMyReservations(dto: PaginationDto, userId: number): Promise<PaginationResult<GetReservationsResponseDto>> {
    const [reservations, total] = await this.reservationRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.restaurant', 'restaurant')
      .leftJoinAndSelect('restaurant.user', 'user')
      .where('reservation.userId = :userId', { userId })
      .skip((dto.page - 1) * dto.limit)
      .take(dto.limit)
      .getManyAndCount();

    const result = reservations.map(reservation => GetReservationsResponseDto.from(reservation));

    return createPaginationResult(result, total, dto.page, dto.limit)
  }

  async getRestaurants(dto: GetRestaurantsResponseDto): Promise<PaginationResult<GetRestaurantResponseDto>> {
    const whereOptions: any = {};

    if (dto.search) {
      whereOptions.name = Like(`%${dto.search}%`);
    }

    if (dto.category) {
      whereOptions.category = dto.category;
    }

    let orderOptions: any = {};

    switch (dto.sortBy) {
      case 'popular':
        orderOptions = { clickCount: 'DESC' };
        break;
      case 'latest':
        orderOptions = { createdAt: 'DESC' };
        break;
      case 'name':
        orderOptions = { name: 'ASC' };
        break;
      default:
        orderOptions = { createdAt: 'DESC' };
        break;
    }

    const [restaurants, total] = await this.restaurantRepository.findAndCount({
      where: whereOptions,
      order: orderOptions,
      take: dto.limit,
      skip: (dto.page - 1) * dto.limit,
      relations: ['images', 'menus', 'availableTime'],
    });

    const result = restaurants.map(restaurant => GetRestaurantResponseDto.from(restaurant));

    return createPaginationResult(result, total, dto.page, dto.limit);
  }

  async checkOwner(restaurantId: number, userId: number): Promise<boolean> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId, user: { id: userId } },
    });
    return !!restaurant;
  }
}
