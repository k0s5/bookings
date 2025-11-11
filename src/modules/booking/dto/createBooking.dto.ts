import { IsNotEmpty, IsInt, IsNumber, IsString } from 'class-validator'

export class CreateBookingDto {
  @IsInt()
  @IsNumber()
  eventId: number

  @IsNotEmpty()
  @IsString()
  userId: string
}
