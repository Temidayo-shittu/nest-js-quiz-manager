/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateOptionDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  isCorrect: boolean;

  @IsNotEmpty()
  questionId: number;
}
