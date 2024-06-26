import { ApiProperty } from '@nestjs/swagger';

export class AddTagDto {
  @ApiProperty({
    type: Array<string>,
  })
  tagId: string[];
}
