import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsModule } from './moduels/tickets/tickets.module';
import { BusModule } from './moduels/bus/bus.module';
import { AddminModule } from './moduels/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BusModule,
    AddminModule,
    TicketsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
