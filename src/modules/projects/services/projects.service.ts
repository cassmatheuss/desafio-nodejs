import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectRepository } from '../repositories/projects.repository';
import { Prisma } from '@prisma/client';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { UserProjectEntity } from '../entities/user-project.entity';
import { UserProjectDto } from '../dtos/user-project.dto';

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

  async delete(id: Prisma.ProjectWhereUniqueInput) {
    try {
      const deletedProject = await this.projectRepository.delete(id);
      return {
        message: `Project ${deletedProject.name} deleted successfully.`,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: Prisma.ProjectWhereUniqueInput,
    updateProjectDto: UpdateProjectDto,
  ) {
    try {
      const updatedProject = await this.projectRepository.update(
        id,
        updateProjectDto,
      );
      return {
        message: `Project ${updateProjectDto.name} updated successfully.`,
        project_data: new ProjectEntity(updatedProject),
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: Prisma.ProjectWhereUniqueInput) {
    try {
      const searchedProject = await this.projectRepository.findOne(id);
      return new ProjectEntity(searchedProject);
    } catch (error) {
      throw error;
    }
  }

  async addUser(
    entire_payload: UserProjectDto,
    projectId: Prisma.ProjectWhereUniqueInput,
    ownerId: string,
  ) {
    try {
      const checkUser =
        (await this.findOne({ id: projectId.id })).ownerId === ownerId;
      if (checkUser) {
        entire_payload.projectId = projectId.id;
        const addedUser = await this.projectRepository.addUser(entire_payload);
        return new UserProjectEntity(addedUser);
      } else {
        throw Error('User not allowed.');
      }
    } catch (error) {
      throw error;
    }
  }
}
