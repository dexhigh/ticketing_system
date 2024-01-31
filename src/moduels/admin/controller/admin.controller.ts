// src/bus/bus.controller.ts
import {
  Controller,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { AdminService } from '../service/admin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly busService: AdminService) {}

  @Post('/tickets/:busId/:date')
  createBus(@Param('busId') busId: number, @Param('date') date: number) {
    return this.busService.createBusTickets(busId, date);
  }

  @Patch('tickets/:busId/:date')
  updateBusStatus(@Param('busId') busId: number, @Param('date') date: number) {
    return this.busService.updateBusTickets(busId, date);
  }
}
