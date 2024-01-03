import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOptionDto } from 'src/dto/create_option.dto';
import { Option } from '../entities/option.entity';
import { OptionService } from '../services/option.service';
import { QuestionService } from '../services/question.service';

@Controller('question/option')
export class OptionController {
  constructor(
    private readonly optionService: OptionService,
    private readonly questionService: QuestionService,
  ) {}

  @Post('')
  @UsePipes(ValidationPipe)
  async saveOptionsToQuestion(@Body() createOptionDto: CreateOptionDto) {
    const question = await this.questionService.findQuestionById(
      createOptionDto.questionId,
    );
    const option = await this.optionService.createNewOption(
      createOptionDto,
      question,
    );
    return { question, createOptionDto, option };
  }
}
