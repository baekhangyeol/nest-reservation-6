import { Restaurant } from '../../entities/restaurant.entity';
import { MenuResponseDto } from './menu-response.dto';

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

  static from(entity: Restaurant): GetRestaurantResponseDto {
    const dto = new GetRestaurantResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.category = entity.category;
    dto.address = entity.address;
    dto.phoneNumber = entity.phoneNumber;
    dto.logoImage = entity.logoImage;
    dto.images = entity.images.map((image) => image.imageUrl);
    dto.menus = entity.menus.map(MenuResponseDto.from);
    dto.availableTime = entity.availableTime.map((availableTime) => availableTime.time.toISOString());
    return dto;
  }
}