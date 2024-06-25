import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      console.log(`An error ocurred while creating a user - ${error}`);
      throw error;
    }
  }

  public async delete(id: Prisma.UserWhereUniqueInput): Promise<User> {
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
  ): Promise<User> {
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

  public async findOne(id: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: id,
        include: {
          projects: true,
        },
      });
    } catch (error) {
      console.log(`An error ocurred while searching a user - ${error}`);
      throw error;
    }
  }

  public async findAll(size: number, page: number): Promise<Array<User>> {
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
