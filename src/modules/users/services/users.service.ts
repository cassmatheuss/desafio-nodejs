import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/users.repository';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';
import { Prisma } from '@prisma/client';
import { UpdateUserDto } from '../dtos/update-user.dto';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = await this.userRepository.create(createUserDto);
      return {
        message: `User ${createdUser.email} created successfully.`,
        user_data: new UserEntity(createdUser),
      };
    } catch (error) {
      if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
    }
  }

  async delete(id: Prisma.UserWhereUniqueInput) {
    try {
      const deletedUser = await this.userRepository.delete(id);
      return {
        message: `User ${deletedUser.email} deleted successfully.`,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new NotFoundException('User not found', error.message);
      else if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
    }
  }

  async update(id: Prisma.UserWhereUniqueInput, updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }
      const updatedUser = await this.userRepository.update(id, updateUserDto);
      return {
        message: `User ${updatedUser.email} updated successfully.`,
        user_data: new UserEntity(updatedUser),
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new NotFoundException('User not found', error.message);
      else if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
    }
  }

  async findOne(id: Prisma.UserWhereUniqueInput) {
    try {
      const searchedUser = await this.userRepository.findOne(id);
      return new UserEntity(searchedUser);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        throw new NotFoundException('User not found', error.message);
      else if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
    }
  }

  async findAll(size: number, page: number) {
    try {
      const searchedUser = await this.userRepository.findAll(size, page);
      return searchedUser;
    } catch (error) {
      if (error instanceof PrismaClientValidationError)
        throw new BadRequestException(error.message);
      else throw error;
    }
  }
}
