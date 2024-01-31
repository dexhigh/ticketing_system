// src/tickets/tickets.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsController } from './controller/tickets.controller';
import { TicketsService } from './service/tickets.service';
import { TicketEntity } from './entity/ticket.entity';
import { UserEntity } from './entity/user.entity';
import { BusEntity } from '../bus/entity/bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity, UserEntity, BusEntity])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
