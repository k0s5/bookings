import { IsInt, IsString, IsNotEmpty } from 'class-validator'

export class ReserveBookingDto {
  @IsInt()
  @IsNotEmpty()
  eventId: number

  @IsString()
  @IsNotEmpty()
  userId: string
}
