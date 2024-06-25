import {
  Controller,
  Body,
  Param,
  Patch,
  Post,
  Delete,
  Query,
  Get,
} from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { Prisma } from '@prisma/client';
import { AddTagDto } from './dtos/add-tag.dto';
import { CreateTaskInputDto } from './dtos/create-task-input.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { ChangeStatusDto } from './dtos/change-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':id')
  create(
    @Param() projectId: Prisma.TaskWhereUniqueInput,
    @Body() data: CreateTaskInputDto,
    @Query('validate_user') userId: string,
  ) {
    return this.tasksService.create(data, projectId, userId);
  }

  @Delete(':id')
  delete(@Param() taskId: Prisma.TaskWhereUniqueInput) {
    return this.tasksService.delete(taskId);
  }

  @Patch(':id')
  update(
    @Param() taskId: Prisma.TaskWhereUniqueInput,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(taskId, updateTaskDto);
  }

  @Patch('change-status/:id')
  changeStatus(
    @Param() taskId: Prisma.TaskWhereUniqueInput,
    @Body() status: ChangeStatusDto,
  ) {
    return this.tasksService.changeStatus(taskId, status);
  }

  @Get(':id')
  findOne(@Param() taskId: Prisma.TaskWhereUniqueInput) {
    return this.tasksService.findOne(taskId);
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
