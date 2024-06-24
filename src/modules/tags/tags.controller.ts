import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Query,
  Patch,
} from '@nestjs/common';
import { TagsService } from './services/tags.service';
import { TagDto } from './dtos/tag.dto';
import { Prisma } from '@prisma/client';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() tagDto: TagDto) {
    return this.tagsService.create(tagDto);
  }

  @Delete(':id')
  delete(@Param() idToDelete: Prisma.TagWhereUniqueInput) {
    return this.tagsService.delete(idToDelete);
  }

  @Patch(':id')
  update(
    @Param() idToUpdate: Prisma.TagWhereUniqueInput,
    @Body() data: TagDto,
  ) {
    return this.tagsService.update(idToUpdate, data);
  }

  @Get(':id')
  findOne(@Param() idToFind: Prisma.TagWhereUniqueInput) {
    return this.tagsService.findOne(idToFind);
  }

  @Get('')
  findAll(@Query('size') size: number, @Query('page') page: number) {
    return this.tagsService.findAll(size, page);
  }
}
