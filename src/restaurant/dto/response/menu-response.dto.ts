import { Menu } from '../../entities/menu.entity';

export class MenuResponseDto {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;

  static from(entity: Menu): MenuResponseDto {
    const dto = new MenuResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.price = entity.price;
    dto.description = entity.description;
    dto.image = entity.image;
    return dto;
  }
}