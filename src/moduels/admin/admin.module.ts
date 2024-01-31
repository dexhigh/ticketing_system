// src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './service/admin.service';
import { AdminController } from './controller/admin.controller';
import { TicketEntity } from '../tickets/entity/ticket.entity';
import { BusEntity } from '../bus/entity/bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity, BusEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AddminModule {}
