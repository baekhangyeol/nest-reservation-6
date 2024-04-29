import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantRequestDto } from './dto/request/create-restaurant-request.dto';
import { ReservationRestaurantRequestDto } from './dto/request/reservation-restaurant-request.dto';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('/:userId')
  async createRestaurant(@Param('userId') userId: number, @Body() request: CreateRestaurantRequestDto) {
    return this.restaurantService.createRestaurant(request, userId);
  }

  @Post('/:restaurantId/available-time')
  async addAvailableTime(@Param('restaurantId') restaurantId: number, @Body() request: { availableTime: string[] }) {
    return this.restaurantService.addAvailableTime(restaurantId, request.availableTime);
  }

  @Get('/:restaurantId')
  async getRestaurantById(@Param('restaurantId') restaurantId: number) {
    return this.restaurantService.getRestaurantById(restaurantId);
  }

  @Get('/:restaurantId/available-time')
  async getAvailableTimes(@Param('restaurantId') restaurantId: number) {
    return this.restaurantService.getAvailableTimes(restaurantId);
  }

  @Post('/:userId/:restaurantId/:availableTimeId/reservation')
  async reservationRestaurant(
    @Param('userId') userId: number,
    @Param('restaurantId') restaurantId: number,
    @Param('availableTimeId') availableTimeId: number,
    @Body() request: ReservationRestaurantRequestDto,
  ) {
    return this.restaurantService.reservationRestaurant(userId, restaurantId, availableTimeId, request);
  }
}
