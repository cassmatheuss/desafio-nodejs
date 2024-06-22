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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  delete(@Param() idToDelete: Prisma.UserWhereUniqueInput) {
    return this.usersService.delete(idToDelete);
  }

  @Patch(':id')
  update(
    @Param() id: Prisma.UserWhereUniqueInput,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Get(':id')
  findOne(@Param() idToFind: Prisma.UserWhereUniqueInput) {
    return this.usersService.findOne(idToFind);
  }

  @Get()
  findAll(@Query('size') size: number, @Query('page') page: number) {
    return this.usersService.findAll(size, page);
  }
}
