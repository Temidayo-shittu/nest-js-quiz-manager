/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src';
import { CreateOptionDto } from 'src/dto/create_option.dto';
import { Repository } from 'typeorm';
import { Option } from '../entities/option.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(Option)
    private readonly optionRepository: Repository<Option>,
  ) {}

  async createNewOption(
    createOptionDto: CreateOptionDto,
    question: Question,
  ): Promise<Option> {
    const newOption = await this.optionRepository.save({
      text: createOptionDto.text,
      isCorrect: createOptionDto.isCorrect,
    });

    question.options = [...question.options, newOption];
    await question.save()

    return newOption;
  }
}
