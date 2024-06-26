import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectsService } from './services/projects.service';
import { Prisma } from '@prisma/client';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { UserProjectDto } from './dtos/user-project.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 201, description: 'Project created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  delete(@Param() idToDelete: Prisma.ProjectWhereUniqueInput) {
    return this.projectsService.delete(idToDelete);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 200, description: 'Project created' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  update(
    @Param() id: Prisma.ProjectWhereUniqueInput,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param() idToFind: Prisma.ProjectWhereUniqueInput) {
    return this.projectsService.findOne(idToFind);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Get()
  findAll(@Query('size') size: number, @Query('page') page: number) {
    return this.projectsService.findAll(size, page);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized User' })
  @ApiParam({ name: 'id' })
  @Patch('add-user/:id')
  addUser(
    @Param() projectId: Prisma.ProjectWhereUniqueInput,
    @Body() entire_payload: UserProjectDto,
    @Query('validate_owner') ownerId: string,
  ) {
    return this.projectsService.addUser(entire_payload, projectId, ownerId);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized User' })
  @ApiParam({ name: 'id' })
  @Patch('remove-user/:id')
  removeUser(
    @Param() projectId: Prisma.ProjectWhereUniqueInput,
    @Body() userId: Prisma.UserProjectUserIdProjectIdCompoundUniqueInput,
    @Query('validate_owner') ownerId: string,
  ) {
    return this.projectsService.removeUser(userId, projectId, ownerId);
  }
}
