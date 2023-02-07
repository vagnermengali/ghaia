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
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PrismaClientExceptionFilter } from '../../prisma-client-exception/prisma-client-exception.filter';
import { PropertiesService } from './properties.service';
import { CreatePropertieDto } from './dto/create-properties.dto';
import { UpdatePropertieDto } from './dto/update-properties.dto';
import { PropertiesEntity } from './entities/properties.entity';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('properties')
@ApiTags('properties')
@UseFilters(PrismaClientExceptionFilter)
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) { }
  
  @SkipThrottle()
  @Post()
  @ApiCreatedResponse({ type: PropertiesEntity })
  async create(
    @Req() req: Request,
    @Body() createPropertieDto: CreatePropertieDto,
  ) {
    const { id } = req.user
    return await this.propertiesService.create(createPropertieDto, id);
  }

  @SkipThrottle()
  @Get('')
  @ApiCreatedResponse({ type: PropertiesEntity, isArray: true })
  async findAll() {
    return await this.propertiesService.findAll();
  }

  @SkipThrottle()
  @Get('/:id')
  @ApiCreatedResponse({ type: PropertiesEntity })
  async findOne(@Param('id') id: string) {
    return await this.propertiesService.findOne(id);
  }

  @SkipThrottle()
  @Get('/user/info')
  @ApiCreatedResponse({ type: PropertiesEntity, isArray: true })
  async findAllPropertiesByUserId(@Req() req: Request) {
    const { id } = req.user;

    return await this.propertiesService.findAllPropertiesByUserId(id);
  }

  @SkipThrottle()
  @Patch('/:id')
  @ApiCreatedResponse({ type: PropertiesEntity })
  async update(
    @Param('id') id: string,
    @Body() updatePropertieDto: UpdatePropertieDto,
  ) {
    return await this.propertiesService.update(id, updatePropertieDto);
  }

  @SkipThrottle()
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.propertiesService.delete(id);
  }
}
