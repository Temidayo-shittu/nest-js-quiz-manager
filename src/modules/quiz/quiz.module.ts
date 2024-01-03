import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src';
import { QuestionController } from './controllers/question.controller';
import { QuestionService } from './services/question.service';
import { QuizController } from './controllers/quiz.controller';
import { Quiz } from './entities/quiz.entity';
import { QuizService } from './services/quiz.service';
import { Option } from './entities/option.entity';
import { OptionController } from './controllers/option.controller';
import { OptionService } from './services/option.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  controllers: [QuizController, QuestionController, OptionController],
  imports: [
    TypeOrmModule.forFeature([Quiz, Question, Option]),
    UserModule,
    AuthModule,
  ],
  providers: [QuizService, QuestionService, OptionService],
})
export class QuizModule {}
