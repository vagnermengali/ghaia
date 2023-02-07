import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePropertieDto {
  @ApiProperty()
  id: string;

  @IsString()
  @Length(3, 45)
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image_url: string | null;

  @IsString()
  @Length(3, 255)
  @ApiProperty()
  details: string;

  @IsString()
  @Length(3, 30)
  @ApiProperty()
  localization: string;

  @ApiProperty()
  userId: string;
}
