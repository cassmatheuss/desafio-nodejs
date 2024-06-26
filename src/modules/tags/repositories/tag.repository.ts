import { Injectable } from '@nestjs/common';
import { Prisma, Tag } from '@prisma/client';
import { PrismaService } from 'src/infrastructure/prisma.service';
import { TagDto } from '../dtos/tag.dto';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.TagUncheckedCreateInput): Promise<Tag> {
    try {
      return await this.prisma.tag.create({
        data,
      });
    } catch (error) {
      console.log(`An error ocurred while creating a tag - ${error}`);
      throw error;
    }
  }

  public async delete(idToDelete: Prisma.TagWhereUniqueInput): Promise<Tag> {
    try {
      return await this.prisma.tag.delete({
        where: idToDelete,
      });
    } catch (error) {
      console.log(`An error ocurred while deleting a tag - ${error}`);
      throw error;
    }
  }

  public async findOne(idToFind: Prisma.TagWhereUniqueInput): Promise<Tag> {
    try {
      return await this.prisma.tag.findFirstOrThrow({
        where: idToFind,
        include: {
          tasks: true,
        },
      });
    } catch (error) {
      console.log(`An error ocurred while searching a tag - ${error}`);
      throw error;
    }
  }

  public async findAll(size: number, page: number): Promise<Array<Tag>> {
    const limit = size * (parseInt(page as any) - 1);
    try {
      return await this.prisma.tag.findMany({
        take: parseInt(size as any),
        skip: limit,
        include: {
          tasks: true,
        },
      });
    } catch (error) {
      console.log(`An error ocurred while searching a tag - ${error}`);
      throw error;
    }
  }

  public async update(
    idToUpdate: Prisma.TagWhereUniqueInput,
    data: TagDto,
  ): Promise<Tag> {
    try {
      return await this.prisma.tag.update({
        where: idToUpdate,
        data,
      });
    } catch (error) {
      console.log(`An error ocurred while creating a tag - ${error}`);
      throw error;
    }
  }
}
