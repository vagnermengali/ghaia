import { ApiProperty } from '@nestjs/swagger';
import { Properties } from '@prisma/client';

export class PropertiesEntity implements Properties {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    details: string;

    @ApiProperty()
    image_url: string | null;

    @ApiProperty()
    localization: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}
