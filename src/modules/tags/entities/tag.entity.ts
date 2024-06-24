import { TagInTask } from '@prisma/client';

export class TagEntity {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  tasks: TagInTask[];

  constructor(partial: Partial<TagEntity>) {
    Object.assign(this, partial);
  }
}
