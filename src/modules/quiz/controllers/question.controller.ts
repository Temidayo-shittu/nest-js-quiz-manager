import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Question } from 'src';
import { CreateQuestionDto } from 'src/dto/create_question.dto';
import { QuestionService } from '../services/question.service';
import { QuizService } from '../services/quiz.service';

@Controller('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private readonly quizService: QuizService,
  ) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async saveQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const quiz = await this.quizService.getQuizById(createQuestionDto.quizId);
    console.log(quiz, createQuestionDto.quizId);
    return await this.questionService.createNewQuestion(
      createQuestionDto,
      quiz,
    );
  }
}
