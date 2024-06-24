import { Module } from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { TagsController } from './tags.controller';
import { PrismaService } from 'src/utils/prisma.service';
import { TagRepository } from './repositories/tag.repository';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagRepository, PrismaService],
})
export class TagsModule {}
