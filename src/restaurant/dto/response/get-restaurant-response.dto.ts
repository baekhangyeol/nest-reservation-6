import { Restaurant } from '../../entities/restaurant.entity';
import { MenuResponseDto } from './menu-response.dto';
import { Image } from '../../entities/image.entity';
import { AvailableTime } from '../../entities/availableTime.entity';

export class GetRestaurantResponseDto {
  id: number;
  name: string;
  description: string;
  category: string;
  address: string;
  phoneNumber: string;
  logoImage: string;
  images: string[];
  menus: MenuResponseDto[];
  availableTime: string[];
  createdAt: Date;
  updatedAt: Date;

  static from(entity: Restaurant): GetRestaurantResponseDto {
    const dto = new GetRestaurantResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.category = entity.category;
    dto.address = entity.address;
    dto.phoneNumber = entity.phoneNumber;
    dto.logoImage = entity.logoImage;
    dto.images = entity.images?.map((image: Image) => image.imageUrl) || [];
    dto.menus = entity.menus?.map((menu) => MenuResponseDto.from(menu)) || [];
    dto.availableTime = entity.availableTime?.map((availableTime: AvailableTime) => availableTime.time.toISOString()) || [];
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}