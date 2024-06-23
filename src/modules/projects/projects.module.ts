import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './services/projects.service';
import { ProjectRepository } from './repositories/projects.repository';
import { PrismaService } from 'src/utils/prisma.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectRepository, PrismaService],
})
export class ProjectsModule {}
