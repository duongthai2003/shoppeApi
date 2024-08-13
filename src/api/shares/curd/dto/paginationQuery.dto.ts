import { ApiProperty } from '@nestjs/swagger';

export class paginationQuery {
  @ApiProperty({
    default: 10,
  })
  limit?: number;
  @ApiProperty({
    default: 0,
  })
  start?: number;
}
