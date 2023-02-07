import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePropertieDto } from './dto/create-properties.dto';
import { UpdatePropertieDto } from './dto/update-properties.dto';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(CreatePropertieDto: CreatePropertieDto, id: string) {
    const { name } = CreatePropertieDto;

    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        properties: true,
      },
    });

    const alreadyExistingPropertie = findUser.properties.find(
      (elem) => elem.name === name,
    );

    if (alreadyExistingPropertie) {
      throw new BadRequestException('This propertie already exists');
    }

    const newPropertie = await this.prisma.properties.create({
      data: { ...CreatePropertieDto, userId: id },
    });
    return newPropertie;
  }

  async findAll() {
    const allProperties = await this.prisma.properties.findMany();

    return allProperties.map((properties) => ({ ...properties}));
  }


  async findOne(id: string) {
    const propertie = await this.prisma.properties.findUnique({ where: { id } });

    if (!propertie) {
      throw new NotFoundException('Propertie does not exists!');
    }

    return propertie;
  }

  async findAllPropertiesByUserId(id: string) {
    const findUserWithProperties = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        properties: true,
      },
    });
    return { ...findUserWithProperties, password: undefined };
  }

  async update(id: string, updatePropertieDto: UpdatePropertieDto) {
    const { name, image_url, details, localization } = updatePropertieDto;
    const propertie = await this.prisma.properties.findUnique({ where: { id } });

    if (!propertie) {
      throw new NotFoundException('Propertie does not exists!');
    }

    const propertieUpdate = await this.prisma.properties.update({
      where: { id },
      data: { name, image_url, details, localization },
    });

    return propertieUpdate;
  }

  async delete(id: string) {
    const deleteById = await this.prisma.properties.findUnique({
      where: {
        id,
      },
    });

    if (!deleteById) {
      throw new NotFoundException('Propertie does not exists!');
    }

    await this.prisma.properties.delete({
      where: {
        id,
      },
    });

    return deleteById;
  }
}
