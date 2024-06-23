export class ProjectEntity {
  id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  ownerId: string;

  constructor(partial: Partial<ProjectEntity>) {
    Object.assign(this, partial);
  }
}
