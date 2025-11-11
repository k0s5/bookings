import { IsInt, IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class BookingIdDto {
  @Type(() => Number)
  @IsInt()
  @IsNumber()
  @Min(1)
  bookingId: number
}
