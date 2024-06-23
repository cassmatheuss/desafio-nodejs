import { Controller, Post, Body } from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectsService } from './services/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }
}
