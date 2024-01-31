import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class UserDetailsDTO {
  @ApiProperty()
  name: string;
}

export class UpdateTicketDTO {
  /** DTO to create a new bus */

  @ApiProperty()
  @IsNotEmpty()
  busId: number;

  @ApiProperty()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  seatNumber: number;

  @ApiProperty()
  @IsNotEmpty()
  travelDate: number;

  @ApiProperty()
  @IsNotEmpty()
  userDetails: UserDetailsDTO;
}
