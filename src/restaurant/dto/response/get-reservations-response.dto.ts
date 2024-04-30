import { Reservation } from '../../entities/reservation.entity';

export class GetReservationsResponseDto {
  id: number;
  name: string;
  numberOfPeople: number;
  phoneNumber: string;
  email: string;
  request: string;
  createdAt: Date;
  updatedAt: Date;

  static from(entity: Reservation): GetReservationsResponseDto {
    const dto = new GetReservationsResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.numberOfPeople = entity.numberOfPeople;
    dto.phoneNumber = entity.phoneNumber;
    dto.email = entity.email;
    dto.request = entity.request;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}