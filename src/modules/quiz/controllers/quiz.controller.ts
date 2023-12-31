import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Quiz } from 'src';
import { CreateQuizDto } from 'src/dto/CreateQuiz.dto';
import { QuizService } from '../services/quiz.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/common/decorator/api_pagination.response';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private quizService: QuizService) {}
  @Get('/')
  @ApiPaginatedResponse({ model: Quiz, description: 'List of quizzes' })
  async getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
  ): Promise<Pagination<Quiz>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.quizService.paginate(options);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get a Quiz by id' })
  async getQuizById(@Param('id', ParseIntPipe) id: number) {
    return await this.quizService.getQuizById(id);
  }

  @Post('create')
  @ApiCreatedResponse({ description: 'The quiz that got created', type: Quiz })
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizService.createNewQuiz(createQuizDto);
  }
}
