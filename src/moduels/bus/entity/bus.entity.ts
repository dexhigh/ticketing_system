// src/bus/bus.entity.ts
import { TicketEntity } from 'src/moduels/tickets/entity/ticket.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class BusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  totalSeat: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  departureTime: string;

  @Column({ nullable: false })
  departingFrom: string;

  @OneToMany(() => TicketEntity, (ticket) => ticket.busId)
  tickets: TicketEntity;
}
