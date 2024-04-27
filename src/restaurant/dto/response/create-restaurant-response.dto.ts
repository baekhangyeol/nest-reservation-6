import { Restaurant } from '../../entities/restaurant.entity';
import { RestaurantCategory } from '../../entities/restaurant-category.enum';
import { Image } from '../../entities/image.entity';

export class CreateRestaurantResponseDto {
  id: number;
  name: string;
  description: string;
  category: RestaurantCategory;
  address: string;
  phoneNumber: string;
  logoImage: string;
  images: Image[];

  public static from(entity: Restaurant): CreateRestaurantResponseDto {
    const dto = new CreateRestaurantResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.category = entity.category;
    dto.address = entity.address;
    dto.phoneNumber = entity.phoneNumber;
    dto.logoImage = entity.logoImage;
    dto.images = entity.images;
    return dto;
  }
}