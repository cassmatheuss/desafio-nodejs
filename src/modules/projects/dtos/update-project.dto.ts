import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({
    example: 'Teste',
  })
  name: string;
  @ApiProperty({
    example: 'ProjetoTeste',
  })
  description: string;
}
