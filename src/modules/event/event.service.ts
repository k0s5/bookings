import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException
} from '@nestjs/common'
import { PrismaService } from '@core/prisma'
import { CreateEventDto } from './dto/createEvent.dto'
import { EVENT_NAME_EXISTS, EVENT_NOT_FOUND } from '@/shared/constants'

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  async getEvents() {
    return await this.prismaService.event.findMany()
  }

  async getTopEventBookings() {
    return await this.prismaService.$queryRaw`
    SELECT
      e.name,
      e.total_seats,
      e.created_at,
      COUNT(b.id) as booking_count
    FROM "bookings" b
    JOIN "events" e ON b."event_id" = e.id
    WHERE e.created_at > NOW() - INTERVAL '30 days'
    GROUP BY e.id
    ORDER BY booking_count DESC
    LIMIT 10
    `
  }

  async getEvent(eventId: number) {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId
      }
    })

    if (!event) {
      throw new NotFoundException(EVENT_NOT_FOUND)
    }

    return event
  }

  async createEvent(createEventDto: CreateEventDto) {
    try {
      return await this.prismaService.event.create({
        data: createEventDto
      })
    } catch (e: any) {
      if (e.code === 'P2002') {
        throw new BadRequestException(EVENT_NAME_EXISTS)
      } else {
        throw new InternalServerErrorException(e)
      }
    }
  }

  async deleteEvent(eventId: number) {
    try {
      return await this.prismaService.event.delete({
        where: {
          id: eventId
        }
      })
    } catch (e: any) {
      if (e.code === 'P2025') {
        throw new NotFoundException(EVENT_NOT_FOUND)
      } else {
        throw new InternalServerErrorException(e)
      }
    }
  }

  async updateEvent(eventId: number, updateData: Partial<CreateEventDto>) {
    try {
      return await this.prismaService.event.update({
        where: {
          id: eventId
        },
        data: updateData
      })
    } catch (e: any) {
      if (e.code === 'P2025') {
        throw new NotFoundException(EVENT_NOT_FOUND)
      } else {
        throw new InternalServerErrorException(e)
      }
    }
  }
}
