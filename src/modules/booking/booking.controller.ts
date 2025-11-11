import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { BookingService } from './booking.service'
import { BookingIdDto } from './dto/bookingId.dto'
import { UserIdDto } from './dto/userId.dto'
import { EventIdDto } from '@modules/event/dto/eventId.dto'
import { CreateBookingDto } from './dto/createBooking.dto'
import { BookingResponseDto } from './dto/booking.dto'

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getBookings(): Promise<BookingResponseDto[]> {
    return await this.bookingService.getBookings()
  }

  @Get(':bookingId')
  async getBookingById(
    @Param(new ValidationPipe({ transform: true })) params: BookingIdDto
  ): Promise<BookingResponseDto> {
    return await this.bookingService.getBookingById(params.bookingId)
  }

  @Get('user/:userId')
  async getBookingsByUserId(
    @Param(ValidationPipe) params: UserIdDto
  ): Promise<BookingResponseDto[]> {
    return await this.bookingService.getBookingsByUserId(params.userId)
  }

  @Get('event/:eventId')
  async getBookingsByEventId(
    @Param(new ValidationPipe({ transform: true })) params: EventIdDto
  ): Promise<BookingResponseDto[]> {
    return await this.bookingService.getBookingsByEventId(params.eventId)
  }

  @UsePipes(ValidationPipe)
  @Put('reserve')
  async createBooking(
    @Body() createBookingDto: CreateBookingDto
  ): Promise<BookingResponseDto> {
    return await this.bookingService.createBooking(createBookingDto)
  }

  @Delete(':bookingId')
  async deleteBooking(
    @Param(new ValidationPipe({ transform: true })) params: BookingIdDto
  ): Promise<BookingResponseDto> {
    return await this.bookingService.deleteBooking(params.bookingId)
  }
}
