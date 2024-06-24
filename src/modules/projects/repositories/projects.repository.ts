import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
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
      return await this.prisma.project.findUnique({
        where: id,
      });
    } catch (error) {
      console.log(`An error ocurred while searching a project - ${error}`);
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
}
