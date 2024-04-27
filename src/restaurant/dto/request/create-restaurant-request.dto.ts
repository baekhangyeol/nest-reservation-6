import { IsNotEmpty } from 'class-validator';
import { RestaurantCategory } from '../../entities/restaurant-category.enum';
import { Image } from '../../entities/image.entity';

export class CreateRestaurantRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: RestaurantCategory;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  logoImage: string;

  @IsNotEmpty()
  images: Image[];
}
