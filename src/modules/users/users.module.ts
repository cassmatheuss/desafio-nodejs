import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/utils/prisma.service';
import { UserRepository } from './repositories/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository, PrismaService],
})
export class UsersModule {}
