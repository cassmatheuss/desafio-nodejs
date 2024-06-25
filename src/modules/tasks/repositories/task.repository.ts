import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    try {
      return await this.prisma.task.create({
        data,
        include: {
          tags: true,
        },
      });
    } catch (error) {
      console.log(`An error ocurred while creating a task - ${error}`);
      throw error;
    }
  }

  public async addTag(data: Array<Prisma.TagInTaskCreateManyInput>) {
    try {
      return await this.prisma.tagInTask.createMany({
        data,
      });
    } catch (error) {
      console.log(`An error ocurred while adding a tag to a task - ${error}`);
      throw error;
    }
  }
  public async removeTag(data: Array<Prisma.TagInTaskUncheckedCreateInput>) {
    try {
      return await this.prisma.tagInTask.deleteMany({
        where: {
          OR: data.map((payload) => ({
            taskId: payload.taskId,
            tagId: payload.tagId,
          })),
        },
      });
    } catch (error) {
      console.log(`An error ocurred while adding a tag to a task - ${error}`);
      throw error;
    }
  }
}
