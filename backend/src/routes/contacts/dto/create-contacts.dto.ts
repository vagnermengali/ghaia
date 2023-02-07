import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @Length(6, 25)
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Matches(/^\+\d{2,3} \d{2} \d{8,9}$.*$/, {
    message:
      'The number must follow the displayed model Ex: +012 34 567890123',
  })
  @ApiProperty()
  telephone: string;

  @ApiProperty()
  userId: string;
}
