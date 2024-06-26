import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class CreateTaskInputDto {
  @ApiProperty({
    example: 'TaskTeste',
  })
  title: string;
  @ApiProperty({
    example: 'Teste de Task',
  })
  description: string;
  @ApiProperty({
    example: 'EM_ANDAMENTO',
    enum: ['EM_ANDAMENTO', 'PENDENTE', 'CONCLUIDA'],
  })
  status: Status;
  @ApiProperty({
    type: Array<string>,
  })
  tags: Array<string>;
}
