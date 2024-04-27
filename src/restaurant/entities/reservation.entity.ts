import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { User } from './user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  numberOfPeople: number;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  request: string;

  @Column()
  reservationDate: Date;

  @ManyToOne(() => Restaurant, restaurant => restaurant.reservations)
  restaurant: Restaurant;

  @ManyToOne(() => User, user => user.reservations)
  user: User;
}