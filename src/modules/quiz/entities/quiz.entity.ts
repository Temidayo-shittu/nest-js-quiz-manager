import { ApiProperty } from '@nestjs/swagger';
import { Question } from 'src';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('quizes')
export class Quiz extends BaseEntity {
  @ApiProperty({ description: 'Primary key as Quiz ID', example: 1 })
  @PrimaryGeneratedColumn({
    comment: 'The quiz unique identifier',
  })
  id: number;

  @ApiProperty({
    description: 'Title of the quiz',
    example: 'Sample Laravel quiz',
  })
  @Column({
    type: 'varchar',
    name: 'title',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the quiz',
    example: 'Lorem ipsum',
  })
  @Column({
    type: 'text',
    name: 'description',
  })
  description: string;

  @ApiProperty({
    description: 'Quiz active or inactive state',
    example: true,
  })
  @Column({
    type: 'boolean',
    default: true,
    name: 'isActive',
  })
  isActive: boolean;

  @ApiProperty({
    description: 'List of questions',
  })
  @OneToMany(() => Question, (question) => question.quiz)
  questions: Question[];
}
