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

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Delete(':id')
  delete(@Param() idToDelete: Prisma.ProjectWhereUniqueInput) {
    return this.projectsService.delete(idToDelete);
  }

  @Patch(':id')
  update(
    @Param() id: Prisma.ProjectWhereUniqueInput,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Get(':id')
  findOne(@Param() idToFind: Prisma.ProjectWhereUniqueInput) {
    return this.projectsService.findOne(idToFind);
  }

  @Patch('add-user/:id')
  addUser(
    @Param() projectId: Prisma.ProjectWhereUniqueInput,
    @Body() entire_payload: UserProjectDto,
    @Query('validate_owner') ownerId: string,
  ) {
    return this.projectsService.addUser(entire_payload, projectId, ownerId);
  }

  @Patch('remove-user/:id')
  removeUser(
    @Param() projectId: Prisma.ProjectWhereUniqueInput,
    @Body() userId: Prisma.UserProjectUserIdProjectIdCompoundUniqueInput,
    @Query('validate_owner') ownerId: string,
  ) {
    return this.projectsService.removeUser(userId, projectId, ownerId);
  }
}
