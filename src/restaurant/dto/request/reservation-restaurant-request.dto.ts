import { IsEmail, IsNotEmpty, IsString, IsInt, Min, MaxLength } from 'class-validator';

export class ReservationRestaurantRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  numberOfPeople: number;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(500)
  request?: string;
}
