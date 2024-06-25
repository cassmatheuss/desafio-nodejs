import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/utils/prisma.service';
import { TaskRepository } from './repositories/task.repository';
import { TagsService } from '../tags/services/tags.service';
import { TagRepository } from '../tags/repositories/tag.repository';
import { ProjectsService } from '../projects/services/projects.service';
import { ProjectRepository } from '../projects/repositories/projects.repository';
import { UserRepository } from '../users/repositories/users.repository';
import { UsersService } from '../users/services/users.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskRepository,
    TagsService,
    TagRepository,
    PrismaService,
    ProjectsService,
    ProjectRepository,
    UsersService,
    UserRepository,
  ],
})
export class TasksModule {}
