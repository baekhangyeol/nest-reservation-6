import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Reservation } from '../../restaurant/entities/reservation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Restaurant, restaurant => restaurant.user)
  restaurants: Restaurant[];
}