import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(6, 25)
  @ApiProperty()
  username: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiProperty({ required: false })
  avatar_url: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(4, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must have one letter UpperCase, one special Character, one Number 0-9',
  })
  @ApiProperty()
  password: string;

  @IsString()
  @Matches(/^\+\d{2,3} \d{2} \d{8,9}$.*$/, {
    message:
      'The number must follow the displayed model Ex: +012 34 567890123',
  })
  @ApiProperty()
  telephone: string;

}