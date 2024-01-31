// src/tickets/tickets.controller.ts
import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { TicketsService } from '../service/tickets.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTicketDTO } from '../model/ticket.dto';

@ApiTags('Tickets')
@Controller('ticket')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('all/:busId/:date')
  getAllTickets(@Param('busId') busId: number, @Param('date') date: number) {
    return this.ticketsService.getAllTickets(busId, date);
  }
  @Get('closed/:busId/:date')
  getAllClosedTickets(
    @Param('busId') busId: number,
    @Param('date') date: number,
  ) {
    return this.ticketsService.getAllClosedTickets(busId, date);
  }

  @Get('open/:busId/:date')
  getAllOpenTickets(
    @Param('busId') busId: number,
    @Param('date') date: number,
  ) {
    return this.ticketsService.getAllOpenTickets(busId, date);
  }

  @Get(':id')
  getTicketById(@Param('id') id: number) {
    return this.ticketsService.getTicketById(id);
  }

  @Patch('/')
  assignTicket(@Body() ticketData: UpdateTicketDTO) {
    return this.ticketsService.assignTicket(ticketData);
  }
}
