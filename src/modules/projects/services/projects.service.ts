import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectRepository } from '../repositories/projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRepository: ProjectRepository) {}
  async create(createProjectDto: CreateProjectDto) {
    try {
      const createdProject =
        await this.projectRepository.create(createProjectDto);
      return {
        message: `Project ${createdProject.name} created successfully.`,
        project_data: new ProjectEntity(createdProject),
      };
    } catch (error) {
      throw error;
    }
  }
}
