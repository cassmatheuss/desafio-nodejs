export class UserProjectEntity {
  userId: string;
  projectId: string;

  constructor(partial: Partial<UserProjectEntity>) {
    Object.assign(this, partial);
  }
}
