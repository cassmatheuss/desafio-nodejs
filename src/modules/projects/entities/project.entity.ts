import { UserProject } from '@prisma/client';

export class ProjectEntity {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  ownerId: string;
  members: UserProject[];
  constructor(init: Partial<ProjectEntity>) {
    Object.assign(this, init);
  }
}
