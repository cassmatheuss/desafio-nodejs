import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { Prisma, Project } from '@prisma/client';

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
}
