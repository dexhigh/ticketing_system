// src/bus/bus.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusController } from './controller/bus.controller';
import { BusService } from './service/bus.service';
import { BusEntity } from './entity/bus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusEntity])],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}
