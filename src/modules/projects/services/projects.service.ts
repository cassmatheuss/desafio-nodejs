import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectRepository } from '../repositories/projects.repository';
import { Prisma } from '@prisma/client';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { UserProjectDto } from '../dtos/user-project.dto';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

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
      if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
    }
  }

  async delete(id: Prisma.ProjectWhereUniqueInput) {
    try {
      const deletedProject = await this.projectRepository.delete(id);
      return {
        message: `Project ${deletedProject.name} deleted successfully.`,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new NotFoundException('Project not found', error.message);
      else if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
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
      if (error instanceof PrismaClientKnownRequestError)
        throw new NotFoundException('Project not found', error.message);
      else if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
    }
  }

  async findOne(id: Prisma.ProjectWhereUniqueInput) {
    try {
      const searchedProject = await this.projectRepository.findOne(id);
      return new ProjectEntity(searchedProject);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new NotFoundException('Project not found', error.message);
      else if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
    }
  }

  async findAll(size: number, page: number) {
    try {
      const searchedProjects = await this.projectRepository.findAll(size, page);
      return searchedProjects;
    } catch (error) {
      if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
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
        await this.projectRepository.addUser(entire_payload);
        return {
          message: `User added successfully.`,
        };
      } else {
        throw new UnauthorizedException('User not allowed.');
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new NotFoundException('User not found', error.message);
      else if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
    }
  }

  async removeUser(
    userId: Prisma.UserProjectUserIdProjectIdCompoundUniqueInput,
    projectId: Prisma.ProjectWhereUniqueInput,
    ownerId: string,
  ) {
    try {
      const checkUser =
        (await this.findOne({ id: projectId.id })).ownerId === ownerId;
      if (checkUser) {
        await this.projectRepository.removeUser(userId, projectId);
        return {
          message: `User removed successfully.`,
        };
      } else {
        throw new UnauthorizedException('User not allowed.');
      }
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new NotFoundException('User not found', error.message);
      else if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
    }
  }
}
