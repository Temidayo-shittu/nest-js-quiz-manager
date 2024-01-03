/* eslint-disable prettier/prettier */
import { Option } from './modules/quiz/entities/option.entity';
import { Question } from './modules/quiz/entities/question.entity';
import { Quiz } from './modules/quiz/entities/quiz.entity';
import { User } from './modules/quiz/modules/user/user.entity';

const entities = [Quiz, Question, Option, User];

export { Quiz, Question, Option, User};

export default entities;