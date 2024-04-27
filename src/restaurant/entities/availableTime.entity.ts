import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity()
export class AvailableTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @ManyToOne(() => Restaurant, restaurant => restaurant.availableTime)
  restaurant: Restaurant;
}