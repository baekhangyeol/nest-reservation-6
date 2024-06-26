import { Body, Controller, Get, Param, Post, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantRequestDto } from './dto/request/create-restaurant-request.dto';
import { ReservationRestaurantRequestDto } from './dto/request/reservation-restaurant-request.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { PaginationResult } from '../common/util/pagination.util';
import { CreateRestaurantResponseDto } from './dto/response/create-restaurant-response.dto';
import { GetRestaurantResponseDto } from './dto/response/get-restaurant-response.dto';
import { GetRestaurantsResponseDto } from './dto/response/get-restaurants-response.dto';
import JwtAuthenticationGuard from 'src/auth/jwt/jwtAuthentication.guard';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('/:userId')
  async createRestaurant(@Param('userId') userId: number, @Body() request: CreateRestaurantRequestDto) {
    return this.restaurantService.createRestaurant(request, userId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('/:restaurantId/available-time')
  async addAvailableTime(
    @Req() req,
    @Param('restaurantId') restaurantId: number, 
    @Body() request: { availableTime: string[] }
  ) {
    const userId = req.user.id;
    const isOwner = await this.restaurantService.checkOwner(restaurantId, userId);
    if (!isOwner) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
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

  @UseGuards(JwtAuthenticationGuard)
  @Post('/:restaurantId/:availableTimeId/reservation')
  async reservationRestaurant(
    @Req() req: Request,
    @Param('restaurantId') restaurantId: number,
    @Param('availableTimeId') availableTimeId: number,
    @Body() request: ReservationRestaurantRequestDto,
  ) {
    const user = req.user as User;
    return this.restaurantService.reservationRestaurant(user.id, restaurantId, availableTimeId, request);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/reservations')
  async getReservations(@Req() req: Request, @Query() request: PaginationDto) {
    const user = req.user as User;
    return this.restaurantService.getMyReservations(request, user.id);
  }

  @Get()
  async getRestaurants(@Query() dto: GetRestaurantsResponseDto): Promise<PaginationResult<GetRestaurantResponseDto>> {
    return this.restaurantService.getRestaurants(dto);
  }
}
