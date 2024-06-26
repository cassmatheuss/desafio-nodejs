import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class ChangeStatusDto {
  @ApiProperty({
    example: 'EM_ANDAMENTO',
    enum: ['EM_ANDAMENTO', 'PENDENTE', 'CONCLUIDA'],
  })
  status: Status;
}
