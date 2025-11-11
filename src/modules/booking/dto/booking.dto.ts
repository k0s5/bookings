export class BookingResponseDto {
  id: number
  eventId: number
  userId: string
  event?: {
    name: string
    totalSeats: number
    createdAt: Date
  }
  createdAt: Date

  constructor(partial: Partial<BookingResponseDto>) {
    Object.assign(this, partial)
  }
}
