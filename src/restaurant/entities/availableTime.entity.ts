import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Reservation } from './reservation.entity';

@Entity()
export class AvailableTime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date;

  @ManyToOne(() => Restaurant, restaurant => restaurant.availableTime)
  restaurant: Restaurant;

  @OneToMany(() => Reservation, reservation => reservation.availableTime)
  reservations: Reservation[];
}