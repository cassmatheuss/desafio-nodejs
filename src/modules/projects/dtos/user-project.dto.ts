import { ApiProperty } from '@nestjs/swagger';

export class UserProjectDto {
  @ApiProperty({
    example: 'UserProjectTeste',
  })
  userId: string;

  @ApiProperty()
  projectId: string;
}
