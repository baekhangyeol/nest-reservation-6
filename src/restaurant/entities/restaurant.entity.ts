import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RestaurantCategory } from './restaurant-category.enum';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: RestaurantCategory,
  })
  category: RestaurantCategory;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  logoImage: string;

  @Column()
  availableTime: string[];

  @Column()
  imageList: string[];

  @Column()
  menuList: string[];
}
