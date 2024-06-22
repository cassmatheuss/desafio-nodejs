export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
