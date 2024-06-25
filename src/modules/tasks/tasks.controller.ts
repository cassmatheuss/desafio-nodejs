import { Controller, Body, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { Prisma } from '@prisma/client';
import { AddTagDto } from './dtos/add-tag.dto';
import { CreateTaskInputDto } from './dtos/create-task-input.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':id')
  create(
    @Param() projectId: Prisma.TaskWhereUniqueInput,
    @Body() data: CreateTaskInputDto,
  ) {
    return this.tasksService.create(data, projectId);
  }

  @Patch('add-tag/:id')
  addTag(
    @Param() taskId: Prisma.TaskWhereUniqueInput,
    @Body() addTagDto: AddTagDto,
  ) {
    return this.tasksService.addTag(addTagDto, taskId);
  }
  @Patch('remove-tag/:id')
  removeTag(
    @Param() taskId: Prisma.TaskWhereUniqueInput,
    @Body() removeTagDto: AddTagDto,
  ) {
    return this.tasksService.removeTag(removeTagDto, taskId);
  }
}
