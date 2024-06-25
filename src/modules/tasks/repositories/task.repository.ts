import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma.service';
import { UpdateTaskDto } from '../dtos/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(data: Prisma.TaskUncheckedCreateInput): Promise<Task> {
    try {
      return await this.prisma.task.create({
        data,
      });
    } catch (error) {
      console.log(`An error ocurred while creating a task - ${error}`);
      throw error;
    }
  }

  public async delete(taskId: Prisma.TaskWhereUniqueInput) {
    try {
      return await this.prisma.task.delete({
        where: {
          id: taskId.id,
        },
      });
    } catch (error) {
      console.log(`An error ocurred while deleting a task - ${error}`);
      throw error;
    }
  }

  public async update(
    taskId: Prisma.TaskWhereUniqueInput,
    data: Partial<UpdateTaskDto>,
  ): Promise<Task> {
    try {
      return await this.prisma.task.update({
        where: taskId,
        data,
      });
    } catch (error) {
      console.log(`An error ocurred while updating a task - ${error}`);
      throw error;
    }
  }

  public async findOne(id: Prisma.TaskWhereUniqueInput): Promise<Task> {
    try {
      return await this.prisma.task.findFirstOrThrow({
        where: id,
      });
    } catch (error) {
      console.log(`An error ocurred while searching a task - ${error}`);
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
