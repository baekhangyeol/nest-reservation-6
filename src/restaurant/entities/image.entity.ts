import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.images)
  restaurant: Restaurant;
}