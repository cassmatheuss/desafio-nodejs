import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Teste',
  })
  name: string;

  @ApiProperty({
    example: 'teste@teste.com',
  })
  email: string;

  @ApiProperty({
    example: 'thisisnotapass',
  })
  password: string;
}
