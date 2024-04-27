import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Reservation } from './reservation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Restaurant, restaurant => restaurant.owner)
  restaurants: Restaurant[];
}