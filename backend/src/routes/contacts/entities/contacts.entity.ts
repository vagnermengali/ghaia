import { ApiProperty } from '@nestjs/swagger';
import { Contacts } from '@prisma/client';

export class ContactsEntity implements Contacts {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    telephone: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
}
