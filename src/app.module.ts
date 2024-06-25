import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { TagsModule } from './modules/tags/tags.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [UsersModule, ProjectsModule, TagsModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
