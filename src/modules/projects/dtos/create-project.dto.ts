import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    example: 'ProjetoTeste',
  })
  name: string;

  @ApiProperty({
    example: 'Teste de projeto',
  })
  description: string;

  @ApiProperty()
  ownerId: string;
}
