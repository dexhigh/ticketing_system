import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TicketEntity } from './ticket.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => TicketEntity, (ticket) => ticket.userId)
  tickets: TicketEntity;
}
