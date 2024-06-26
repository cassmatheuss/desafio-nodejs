import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Query,
  Patch,
} from '@nestjs/common';
import { UsersService } from './services/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  delete(@Param() idToDelete: Prisma.UserWhereUniqueInput) {
    return this.usersService.delete(idToDelete);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  update(
    @Param() id: Prisma.UserWhereUniqueInput,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param() idToFind: Prisma.UserWhereUniqueInput) {
    return this.usersService.findOne(idToFind);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get()
  findAll(@Query('size') size: number, @Query('page') page: number) {
    return this.usersService.findAll(size, page);
  }
}
