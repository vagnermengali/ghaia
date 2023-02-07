import { PartialType } from '@nestjs/swagger';
import { CreatePropertieDto } from './create-properties.dto';

export class UpdatePropertieDto extends PartialType(CreatePropertieDto) { }
