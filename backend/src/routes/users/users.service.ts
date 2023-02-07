import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, telephone, password } = createUserDto;

    const uniqueUserName = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    const uniqueUserEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const uniqueUserTelephone = await this.prisma.user.findUnique({
      where: {
        telephone,
      },
    });

    if (uniqueUserName || uniqueUserEmail || uniqueUserTelephone) {
      throw new BadRequestException('Username, email or phone is already in use');
    }

    

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashSync(password, 10),
      },
    });

    return { ...newUser, password: undefined };
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany();

    return allUsers.map((user) => ({ ...user, password: undefined }));
  }

  async findOne(id: string) {
    const findOneUser = await this.prisma.user.findUnique({
      where: { id },
      include: {
        contacts: {
          select: { id: true, name: true, email: true, telephone: true, created_at: true, updated_at: true }
        },
        properties: {
          select: { id: true, name: true, details: true, localization: true, image_url: true, created_at: true, updated_at: true }
        },
      },
    });
    return { ...findOneUser, password: undefined };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { username, email, password, telephone, avatar_url } = updateUserDto;

    const data: any = {};

    if (username) {
      data.username = username;
    }

    if (email) {
      data.email = email;
    }

    if (password) {
      data.password = password;
    }

    if (telephone) {
      data.telephone = telephone;
    }

    if (avatar_url) {
      data.avatar_url = avatar_url;
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });

    return { ...updatedUser, password: undefined };
  }

  async remove(id: string) {
    return !!(await this.prisma.user.delete({ where: { id } }));
  }
}
