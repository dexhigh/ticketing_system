// src/BusEntitys/BusEntitys.service.ts
import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusEntity } from '../entity/bus.entity';
import { CreateBusDTO, UpdateBusDTO } from '../model/bus.dto';

@Injectable()
export class BusService {
  constructor(
    @InjectRepository(BusEntity)
    private readonly BusEntitysRepository: Repository<BusEntity>,
  ) {}

  async getAllBus(): Promise<BusEntity[]> {
    return this.BusEntitysRepository.find();
  }

  async getBusById(id: number): Promise<BusEntity | undefined> {
    return this.BusEntitysRepository.findOneBy({ id });
  }

  async createBus(busData: CreateBusDTO): Promise<BusEntity> {
    const dateObj = new Date(Number(busData.departureTime));
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const bustime = `${hours}:${minutes}`;
    const BusEntity = this.BusEntitysRepository.create({
      name: busData.name,
      totalSeat: busData.totalSeat,
      departingFrom: busData.departingFrom,
      departureTime: bustime,
    });
    return this.BusEntitysRepository.save(BusEntity);
  }

  async updateBusStatus(
    id: number,
    busData: UpdateBusDTO,
  ): Promise<BusEntity | null> {
    const BusEntity = await this.BusEntitysRepository.findOneBy({ id });
    const dateObj = new Date(Number(busData.departureTime));
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const bustime = `${hours}:${minutes}`;

    if (!BusEntity) {
      return null;
    }

    BusEntity.totalSeat = busData.totalSeat;
    BusEntity.departureTime = bustime;
    BusEntity.departingFrom = busData.departingFrom;

    return this.BusEntitysRepository.save(BusEntity);
  }

  async deleteBus(id: number): Promise<boolean> {
    throw new BadGatewayException('Method not implemented');
    // const result = await this.BusEntitysRepository.delete(id);
    // return result.affected > 0;
  }

  async resetBus(): Promise<void> {
    await this.BusEntitysRepository.clear();
  }
}
