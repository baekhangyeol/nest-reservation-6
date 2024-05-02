import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RestaurantCategory } from './restaurant-category.enum';
import { Image } from './image.entity';
import { Menu } from './menu.entity';
import { AvailableTime } from './availableTime.entity';
import { User } from '../../user/entities/user.entity';
import { Reservation } from './reservation.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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
  clickCount: number;

  @OneToMany(() => AvailableTime, (availableTime) => availableTime.restaurant)
  availableTime: AvailableTime[];

  @OneToMany(() => Image, (image) => image.restaurant)
  images: Image[];

  @OneToMany(() => Menu, (menu) => menu.restaurant)
  menus: Menu[];

  @OneToMany(() => Reservation, (reservation) => reservation.restaurant)
  reservations: Reservation[];

  @ManyToOne(() => User, user => user.restaurants)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
