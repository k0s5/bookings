import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { EventService } from './event.service'
import { CreateEventDto } from './dto/createEvent.dto'
import { EventIdDto } from './dto/eventId.dto'

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getEvents() {
    return await this.eventService.getEvents()
  }

  @Get(':eventId')
  async getEvent(
    @Param(new ValidationPipe({ transform: true })) params: EventIdDto
  ) {
    return await this.eventService.getEvent(params.eventId)
  }

  @UsePipes(ValidationPipe)
  @Put('create')
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.createEvent(createEventDto)
  }

  @UsePipes(ValidationPipe)
  @Patch(':eventId')
  async updateEvent(
    @Param(new ValidationPipe({ transform: true })) params: EventIdDto,
    @Body() updateEventDto: Partial<CreateEventDto>
  ) {
    return await this.eventService.updateEvent(params.eventId, updateEventDto)
  }

  @Delete(':eventId')
  async deleteEvent(
    @Param(new ValidationPipe({ transform: true })) params: EventIdDto
  ) {
    return await this.eventService.deleteEvent(params.eventId)
  }
}
