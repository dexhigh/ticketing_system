// src/tickets/ticket.entity.ts
import { BusEntity } from 'src/moduels/bus/entity/bus.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  busId: number;

  @Column({ nullable: true })
  userId: number;

  @Column()
  seatNumber: number;

  @Column()
  status: string;

  @Column()
  date: string;

  @ManyToOne(() => BusEntity, (bus) => bus.id)
  @JoinColumn()
  bus: BusEntity;

  @OneToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;
}
