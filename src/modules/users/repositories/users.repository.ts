import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Prisma } from '@prisma/client';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      console.log(`An error ocurred while creating a user - ${error}`);
      throw error;
    }
  }

  public async delete(id: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    try {
      return await this.prisma.user.delete({
        where: id,
      });
    } catch (error) {
      console.log(`An error ocurred while deleting a user - ${error}`);
      throw error;
    }
  }

  public async update(
    id: Prisma.UserWhereUniqueInput,
    data: Partial<UpdateUserDto>,
  ): Promise<UserEntity> {
    try {
      return await this.prisma.user.update({
        where: id,
        data,
      });
    } catch (error) {
      console.log(`An error ocurred while updating a user - ${error}`);
      throw error;
    }
  }

  public async findOne(id: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    try {
      return await this.prisma.user.findUnique({
        where: id,
      });
    } catch (error) {
      console.log(`An error ocurred while searching a user - ${error}`);
      throw error;
    }
  }

  public async findAll(size: number, page: number) {
    const limit = size * (parseInt(page as any) - 1);
    try {
      return await this.prisma.user.findMany({
        take: parseInt(size as any),
        skip: limit,
      });
    } catch (error) {
      console.log(`An error ocurred while searching users - ${error}`);
      throw error;
    }
  }
}
