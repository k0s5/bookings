import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'

import { PrismaService } from '@core/prisma'
import { CreateBookingDto } from './dto/createBooking.dto'
import {
  BOOKING_ALREADY_EXISTS,
  BOOKING_NOT_FOUND,
  EVENT_IS_FULL,
  EVENT_NOT_FOUND
} from '@/shared/constants'

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async getBookings() {
    return await this.prisma.booking.findMany()
  }

  async getBookingById(bookingId: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        event: {
          select: {
            name: true,
            totalSeats: true,
            createdAt: true
          }
        }
      }
    })

    if (!booking) {
      throw new NotFoundException(BOOKING_NOT_FOUND)
    }

    return booking
  }

  async getBookingsByUserId(userId: string) {
    return await this.prisma.booking.findMany({
      where: { userId },
      include: {
        event: {
          select: {
            name: true,
            totalSeats: true,
            createdAt: true
          }
        }
      }
    })
  }

  async getBookingsByEventId(eventId: number) {
    return await this.prisma.booking.findMany({
      where: { eventId }
    })
  }

  async createBooking(createBookingDto: CreateBookingDto) {
    const { eventId, userId } = createBookingDto

    const event = await this.prisma.event.findFirst({
      where: { id: eventId }
    })

    if (event === null) {
      throw new NotFoundException(EVENT_NOT_FOUND)
    }

    const existingBooking = await this.prisma.booking.findFirst({
      where: { eventId, userId }
    })

    if (existingBooking !== null) {
      throw new ConflictException(BOOKING_ALREADY_EXISTS)
    }

    const eventCount = await this.prisma.booking.count({
      where: { eventId }
    })

    if (eventCount >= event.totalSeats) {
      throw new ConflictException(EVENT_IS_FULL)
    }

    return await this.prisma.booking.create({
      data: createBookingDto
    })
  }

  async deleteBooking(id: number) {
    try {
      return await this.prisma.booking.delete({
        where: { id }
      })
    } catch (e: any) {
      if (e.code === 'P2025') {
        throw new NotFoundException(BOOKING_NOT_FOUND)
      } else {
        throw new InternalServerErrorException(e)
      }
    }
  }
}
