// src/TicketEntitys/TicketEntity.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusEntity } from 'src/moduels/bus/entity/bus.entity';
import { TicketEntity } from 'src/moduels/tickets/entity/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly TicketEntitysRepository: Repository<TicketEntity>,

    @InjectRepository(BusEntity)
    private readonly BusEntitysRepository: Repository<BusEntity>,
  ) {}

  async updateBusTickets(busId, date: number): Promise<string> {
    const busDetails = await this.BusEntitysRepository.findOneBy({ id: busId });

    const dateObj = new Date(Number(date));
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const busDate = `${year}/${month}/${day}`;

    for (let index = 1; index <= busDetails.totalSeat; index++) {
      this.TicketEntitysRepository.update(
        { seatNumber: index },
        { busId, seatNumber: index, status: 'open', date: busDate },
      );
    }
    return 'Success';
  }

  async createBusTickets(busId, date: number): Promise<string> {
    const busDetails = await this.BusEntitysRepository.findOneBy({ id: busId });

    const dateObj = new Date(Number(date));
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const busDate = `${year}/${month}/${day}`;

    const ticketExist = await this.TicketEntitysRepository.findOneBy({
      busId,
      date: busDate,
    });

    if (ticketExist) {
      throw new BadRequestException('Tickets already exist');
    }

    for (let index = 1; index <= busDetails.totalSeat; index++) {
      this.TicketEntitysRepository.save({
        busId,
        seatNumber: index,
        status: 'open',
        date: busDate,
      });
    }
    return 'Success';
  }
}
