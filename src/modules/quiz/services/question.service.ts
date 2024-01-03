import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question, Quiz } from 'src';
import { CreateQuestionDto } from 'src/dto/create_question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  getAllQuestion() {
    return [1, 2, 3];
  }

  async findQuestionById(id: number): Promise<Question> {
    return await this.questionRepository.findOne(id, {
      relations: ['quiz', 'options'],
    });
  }

  async createNewQuestion(
    createQuestionDto: CreateQuestionDto,
    quiz: Quiz,
  ): Promise<Question> {
    /*
    const newQuestion = await this.questionRepository.create(createQuestionDto)
    console.log(newQuestion, createQuestionDto.quizId)
    */
    const newQuestion = await this.questionRepository.save({
      question: createQuestionDto.question,
    });

    quiz.questions = [...quiz.questions, newQuestion];
    await quiz.save();

    return newQuestion;
  }
}

/*
const newQuestion = await this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save({
      newQuestion: newQuestion.question,
    });
    quiz.questions = [...quiz.questions, newQuestion];
    await quiz.save()
    */
