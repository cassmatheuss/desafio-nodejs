import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repositories/task.repository';
import { AddTagDto } from '../dtos/add-tag.dto';
import { Prisma } from '@prisma/client';
import { CreateTaskInputDto } from '../dtos/create-task-input.dto';
import { TaskEntity } from '../entities/task.entity';
import { TagsService } from 'src/modules/tags/services/tags.service';
import { ProjectsService } from 'src/modules/projects/services/projects.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly tagService: TagsService,
    private readonly projectService: ProjectsService,
  ) {}
  // function to generate a payload to TagInTask
  private generatePayloadArray(taskId: string, tags: Array<string>) {
    return tags.map((tag) => ({
      taskId: taskId,
      tagId: tag,
    }));
  }
  // function to generate a payload to Task
  private generatePayloadTask(
    data: CreateTaskInputDto,
    projectId: Prisma.TaskWhereUniqueInput,
  ) {
    return {
      title: data.title,
      description: data.description,
      status: data.status,
      projectId: projectId.id,
    };
  }

  private async checkTagExistence(tags: Array<string>) {
    try {
      await Promise.all(
        tags.map((tag) => this.tagService.findOne({ id: tag })),
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  private async checkProjectExistence(project: string) {
    try {
      await this.projectService.findOne({ id: project });
      return true;
    } catch (error) {
      return false;
    }
  }

  async create(
    data: CreateTaskInputDto,
    projectId: Prisma.TaskWhereUniqueInput,
  ) {
    try {
      if (await this.checkProjectExistence(projectId.id)) {
        if (data.tags && data.tags.length !== 0) {
          if (await this.checkTagExistence(data.tags)) {
            const payload = this.generatePayloadTask(data, projectId);
            const createdTask = await this.taskRepository.create(payload);
            this.addTag({ tagId: data.tags }, { id: createdTask.id });
            return {
              message: `Task ${createdTask.title} created successfully.`,
              task_data: new TaskEntity(createdTask),
            };
          } else {
            throw new Error('Tag(s) does not exist!');
          }
        } else {
          throw new Error('Tags are not provided!');
        }
      } else {
        throw new Error('Project does not exist!');
      }
    } catch (error) {
      throw error;
    }
  }

  async addTag(data: AddTagDto, taskId: Prisma.TaskWhereUniqueInput) {
    try {
      const payload = this.generatePayloadArray(taskId.id, data.tagId);
      await this.taskRepository.addTag(payload);
      return {
        message: 'Tag(s) added successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async removeTag(data: AddTagDto, taskId: Prisma.TaskWhereUniqueInput) {
    try {
      const payload = this.generatePayloadArray(taskId.id, data.tagId);
      await this.taskRepository.removeTag(payload);
      return {
        message: 'Tag(s) removed successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
