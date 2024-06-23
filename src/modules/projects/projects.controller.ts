import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectsService } from './services/projects.service';
import { Prisma } from '@prisma/client';
import { UpdateProjectDto } from './dtos/update-project.dto';

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
}
