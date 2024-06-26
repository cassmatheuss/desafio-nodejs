import { Project, Status, TagInTask } from '@prisma/client';

export class TaskEntity {
  title: string;
  description: string;
  status: Status;
  project: Project;
  tags: TagInTask;
  created_at: Date;
  updated_at: Date;
  constructor(init: Partial<TaskEntity>) {
    Object.assign(this, init);
  }
}
