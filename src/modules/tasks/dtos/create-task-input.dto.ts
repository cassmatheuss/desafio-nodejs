import { Status } from '@prisma/client';

export class CreateTaskInputDto {
  title: string;
  description: string;
  status: Status;
  tags: Array<string>;
}
