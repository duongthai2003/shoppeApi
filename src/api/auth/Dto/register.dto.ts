import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RegisterDto {
  @ApiProperty({})
  firstName: string;
  @ApiProperty({})
  lastName: string;
  @ApiProperty({})
  userName: string;

  @ApiProperty({
    example: 'thaiq9577@gmail.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '12345678',
  })
  password: '' | string;
}
