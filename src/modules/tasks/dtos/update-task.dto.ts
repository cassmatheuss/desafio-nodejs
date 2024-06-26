import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    example: 'TaskTeste',
  })
  title: string;
  @ApiProperty({
    example: 'Teste de Task',
  })
  description: string;
}
