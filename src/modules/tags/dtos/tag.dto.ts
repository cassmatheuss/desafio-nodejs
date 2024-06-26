import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty({
    example: 'TagTeste',
  })
  title: string;
}
