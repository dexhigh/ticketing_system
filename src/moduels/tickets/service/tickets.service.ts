// src/TicketEntitys/TicketEntitys.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from '../entity/ticket.entity';
import { UpdateTicketDTO } from '../model/ticket.dto';
import { BusEntity } from 'src/moduels/bus/entity/bus.entity';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly TicketEntitysRepository: Repository<TicketEntity>,

    @InjectRepository(BusEntity)
    private readonly BusRepository: Repository<BusEntity>,

    @InjectRepository(UserEntity)
    private readonly UserEntity: Repository<UserEntity>,
  ) {}

  async getAllTickets(busId: number, date: number): Promise<TicketEntity[]> {
    const dateObj = new Date(Number(date));
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const busDate = `${year}/${month}/${day}`;
    const tickets = await this.TicketEntitysRepository.createQueryBuilder(
      'ticket',
    )

      .leftJoinAndSelect('ticket.user', 'user')
      .leftJoinAndSelect('ticket.bus', 'bus')
      .where(
        // 'customer.customer_id= :customerId AND customer.status= :status',
        'bus.id= :busId AND ticket.date= :date',
        {
          busId: busId,
          date: busDate,
        },
      )
      .getMany();
    return tickets;
  }

  async getAllClosedTickets(
    busId: number,
    date: number,
  ): Promise<TicketEntity[]> {
    const dateObj = new Date(Number(date));
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const busDate = `${year}/${month}/${day}`;
    const tickets = await this.TicketEntitysRepository.createQueryBuilder(
      'ticket',
    )

      .leftJoinAndSelect('ticket.user', 'user')
      .leftJoinAndSelect('ticket.bus', 'bus')
      .where(
        // 'customer.customer_id= :customerId AND customer.status= :status',
        'bus.id= :busId AND ticket.date= :date AND ticket.status= :status',
        {
          busId: busId,
          date: busDate,
          status: 'closed',
        },
      )
      .getMany();
    return tickets;
  }

  async getAllOpenTickets(
    busId: number,
    date: number,
  ): Promise<TicketEntity[]> {
    const dateObj = new Date(Number(date));
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const busDate = `${year}/${month}/${day}`;
    const tickets = await this.TicketEntitysRepository.createQueryBuilder(
      'ticket',
    )

      .leftJoinAndSelect('ticket.user', 'user')
      .leftJoinAndSelect('ticket.bus', 'bus')
      .where(
        // 'customer.customer_id= :customerId AND customer.status= :status',
        'bus.id= :busId AND ticket.date= :date AND ticket.status= :status',
        {
          busId: busId,
          date: busDate,
          status: 'open',
        },
      )
      .getMany();
    return tickets;
  }

  async getTicketById(id: number): Promise<TicketEntity | undefined> {
    return this.TicketEntitysRepository.findOneBy({ id });
  }

  async assignTicket(ticketData: UpdateTicketDTO): Promise<TicketEntity> {
    const bus = await this.BusRepository.findOneBy({ id: ticketData.busId });
    if (!bus) {
      throw new BadRequestException('Bus doesnot exist');
    }
    if (ticketData.seatNumber > bus.totalSeat) {
      throw new BadRequestException('Seat Number Does not Exist');
    }
    const userData = await this.UserEntity.save(ticketData.userDetails);

    const dateObj = new Date(Number(ticketData.travelDate));
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const travelDate = `${year}/${month}/${day}`;

    const TicketEntity = this.TicketEntitysRepository.update(
      {
        busId: ticketData.busId,
        seatNumber: ticketData.seatNumber,
        date: travelDate,
      },
      {
        busId: ticketData.busId,
        date: travelDate,
        seatNumber: ticketData.seatNumber,
        status: 'closed',
        userId: userData.id,
      },
    );
    const ticket = await this.TicketEntitysRepository.findOneBy({
      busId: ticketData.busId,
      seatNumber: ticketData.seatNumber,
      date: travelDate,
    });
    return ticket;
  }
}
