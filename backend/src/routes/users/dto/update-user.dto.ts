import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(6, 25)

  @ApiProperty()
  username: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+\d{2} \d{2} \d{9}$.*$/, {
    message:
      'The number must follow the displayed model Ex: (12) 123456789',
  })
  @ApiProperty()
  telephone: string;

  @IsOptional()
  @IsString()
  @Length(4, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must have one letter UpperCase, one special Character, one Number 0-9',
  })
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  avatar_url: string;

}
