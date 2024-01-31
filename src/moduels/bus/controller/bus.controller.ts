// src/bus/bus.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { BusService } from '../service/bus.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBusDTO, UpdateBusDTO } from '../model/bus.dto';

@ApiTags('Bus')
@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Get()
  getAllBus() {
    return this.busService.getAllBus();
  }

  @Get(':id')
  getBusById(@Param('id') id: number) {
    return this.busService.getBusById(id);
  }

  @Post()
  createBus(@Body() busData: CreateBusDTO) {
    return this.busService.createBus(busData);
  }

  @Patch(':id')
  updateBusStatus(@Param('id') id: number, @Body() busData: UpdateBusDTO) {
    return this.busService.updateBusStatus(id, busData);
  }

  @Delete(':id')
  deleteBus(@Param('id') id: number) {
    return this.busService.deleteBus(id);
  }
}
