import { IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class EventIdDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  eventId: number
}
