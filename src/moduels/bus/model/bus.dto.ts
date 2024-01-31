import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBusDTO {
  /** DTO to create a new bus */

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  totalSeat: number;

  @ApiProperty()
  @IsNotEmpty()
  departureTime: number;

  @ApiProperty()
  @IsNotEmpty()
  departingFrom: string;
}

export class UpdateBusDTO {
  /** DTO to update bus details */

  @ApiProperty()
  @IsNotEmpty()
  totalSeat: number;

  @ApiProperty()
  @IsNotEmpty()
  departureTime: number;

  @ApiProperty()
  @IsNotEmpty()
  departingFrom: string;
}
