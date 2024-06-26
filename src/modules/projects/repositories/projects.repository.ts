import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma.service';
import { Prisma, Project, UserProject } from '@prisma/client';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { UserProjectDto } from '../dtos/user-project.dto';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(
    data: Prisma.ProjectUncheckedCreateInput,
  ): Promise<Project> {
    try {
      return await this.prisma.project.create({
        data,
      });
    } catch (error) {
      console.log(`An error ocurred while creating a project - ${error}`);
      throw error;
    }
  }

  public async delete(id: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    try {
      return await this.prisma.project.delete({
        where: id,
      });
    } catch (error) {
      console.log(`An error ocurred while deleting a project - ${error}`);
      throw error;
    }
  }

  public async update(
    id: Prisma.ProjectWhereUniqueInput,
    data: Partial<UpdateProjectDto>,
  ): Promise<Project> {
    try {
      return await this.prisma.project.update({
        where: id,
        data,
      });
    } catch (error) {
      console.log(`An error ocurred while updating a project - ${error}`);
      throw error;
    }
  }

  public async findOne(id: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    try {
      return await this.prisma.project.findFirstOrThrow({
        where: id,
        include: {
          members: true,
        },
      });
    } catch (error) {
      console.log(`An error ocurred while searching a project - ${error}`);
      throw error;
    }
  }

  public async findAll(size: number, page: number): Promise<Array<Project>> {
    const limit = size * (parseInt(page as any) - 1);
    try {
      return await this.prisma.project.findMany({
        take: parseInt(size as any),
        skip: limit,
        include: {
          members: true,
          tasks: true,
        },
      });
    } catch (error) {
      console.log(`An error ocurred while searching projects - ${error}`);
      throw error;
    }
  }

  public async addUser(data: UserProjectDto): Promise<UserProject> {
    try {
      return await this.prisma.userProject.create({
        data,
      });
    } catch (error) {
      console.log(
        `An error ocurred while adding a user to a project - ${error}`,
      );
      throw error;
    }
  }

  public async removeUser(
    userId: Prisma.UserProjectUserIdProjectIdCompoundUniqueInput,
    projectId: Prisma.ProjectWhereUniqueInput,
  ): Promise<UserProject> {
    try {
      return await this.prisma.userProject.delete({
        where: {
          userId_projectId: {
            userId: userId.userId,
            projectId: projectId.id,
          },
        },
      });
    } catch (error) {
      console.log(
        `An error ocurred while removing a user in a project - ${error}`,
      );
      throw error;
    }
  }
}
