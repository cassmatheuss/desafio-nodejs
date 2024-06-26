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
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 201, description: 'Tag created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  create(@Body() tagDto: TagDto) {
    return this.tagsService.create(tagDto);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Delete(':id')
  delete(@Param() idToDelete: Prisma.TagWhereUniqueInput) {
    return this.tagsService.delete(idToDelete);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 200, description: 'Tag created' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Patch(':id')
  update(
    @Param() idToUpdate: Prisma.TagWhereUniqueInput,
    @Body() data: TagDto,
  ) {
    return this.tagsService.update(idToUpdate, data);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @ApiParam({ name: 'id' })
  @Get(':id')
  findOne(@Param() idToFind: Prisma.TagWhereUniqueInput) {
    return this.tagsService.findOne(idToFind);
  }

  @ApiResponse({ status: 500 })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get()
  findAll(@Query('size') size: number, @Query('page') page: number) {
    return this.tagsService.findAll(size, page);
  }
}
