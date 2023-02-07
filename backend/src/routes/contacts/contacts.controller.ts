import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseFilters,
  Req,
  Res,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { PrismaClientExceptionFilter } from '../../prisma-client-exception/prisma-client-exception.filter';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contacts.dto';
import { UpdateContactDto } from './dto/update-contacts.dto';
import { ContactsEntity } from './entities/contacts.entity';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('contacts')
@ApiTags('contacts')
@UseFilters(PrismaClientExceptionFilter)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @SkipThrottle()
  @Post()
  @ApiCreatedResponse({ type: ContactsEntity })
  async create(
    @Req() req: Request,
    @Body() createContactDto: CreateContactDto,
  ) {
    const { id } = req.user
    return await this.contactsService.create(createContactDto, id);
  }

  @SkipThrottle()
  @Get('/:id')
  @ApiCreatedResponse({ type: ContactsEntity })
  async findOne(@Param('id') id) {
    return await this.contactsService.findOne(id);
  }

  @Get('/download/info')
  @ApiOkResponse({ type: Buffer, description: 'Download PDF file' })
  async downloadPDF(@Req() req: Request, @Res() res: Response) {
    const { id } = req.user;

    const pdf = await this.contactsService.findAllContactsPdf(id);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="contacts.pdf"');
    pdf.pipe(res);
    
  }

  @SkipThrottle()
  @Get('/user/info')
  @ApiCreatedResponse({ type: ContactsEntity, isArray: true })
  async findAllContactsByUserId(@Req() req: Request) {
    const { id } = req.user;

    return await this.contactsService.findAllContactsByUserId(id);
  }

  @SkipThrottle()
  @Patch('/:id')
  @ApiCreatedResponse({ type: ContactsEntity })
  async update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return await this.contactsService.update(id, updateContactDto);
  }

  @SkipThrottle()
  @Delete('/:id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.contactsService.delete(id);
  }
}
