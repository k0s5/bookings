import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNumber()
  totalSeats: number
}
