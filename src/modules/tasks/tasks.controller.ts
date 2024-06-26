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
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 201, description: 'Task created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'User are not in the project' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  @ApiParam({ name: 'id' })
  @Post(':id')
  create(
    @Param() projectId: Prisma.TaskWhereUniqueInput,
    @Body() data: CreateTaskInputDto,
    @Query('validate_user') userId: string,
  ) {
    return this.tasksService.create(data, projectId, userId);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  delete(@Param() taskId: Prisma.TaskWhereUniqueInput) {
    return this.tasksService.delete(taskId);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  update(
    @Param() taskId: Prisma.TaskWhereUniqueInput,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(taskId, updateTaskDto);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Patch('change-status/:id')
  changeStatus(
    @Param() taskId: Prisma.TaskWhereUniqueInput,
    @Body() status: ChangeStatusDto,
  ) {
    return this.tasksService.changeStatus(taskId, status);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param() taskId: Prisma.TaskWhereUniqueInput) {
    return this.tasksService.findOne(taskId);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Patch('add-tag/:id')
  addTag(
    @Param() taskId: Prisma.TaskWhereUniqueInput,
    @Body() addTagDto: AddTagDto,
  ) {
    return this.tasksService.addTag(addTagDto, taskId);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Patch('remove-tag/:id')
  removeTag(
    @Param() taskId: Prisma.TaskWhereUniqueInput,
    @Body() removeTagDto: AddTagDto,
  ) {
    return this.tasksService.removeTag(removeTagDto, taskId);
  }
}
