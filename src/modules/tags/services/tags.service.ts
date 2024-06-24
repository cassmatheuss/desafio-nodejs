import { Injectable } from '@nestjs/common';
import { TagDto } from '../dtos/tag.dto';
import { TagRepository } from '../repositories/tag.repository';
import { TagEntity } from '../entities/tag.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private readonly tagRepository: TagRepository) {}
  async create(tagDto: TagDto) {
    try {
      const createdTag = await this.tagRepository.create(tagDto);
      return {
        message: `Tag ${createdTag.title} created successfully.`,
        tag_data: new TagEntity(createdTag),
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(idToDelete: Prisma.TagWhereUniqueInput) {
    try {
      await this.tagRepository.delete(idToDelete);
      return {
        message: `Tag deleted successfully.`,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(idToFind: Prisma.TagWhereUniqueInput) {
    try {
      const searchedTag = await this.tagRepository.findOne(idToFind);
      return new TagEntity(searchedTag);
    } catch (error) {
      throw error;
    }
  }

  async findAll(size: number, page: number) {
    try {
      const searchedTag = await this.tagRepository.findAll(size, page);
      return searchedTag;
    } catch (error) {
      throw error;
    }
  }

  async update(idToUpdate: Prisma.TagWhereUniqueInput, data: TagDto) {
    try {
      const updatedTag = await this.tagRepository.update(idToUpdate, data);
      return {
        message: `Tag ${updatedTag.title} updated successfully.`,
        tag_data: updatedTag,
      };
    } catch (error) {
      throw error;
    }
  }
}
