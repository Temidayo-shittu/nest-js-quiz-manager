/* eslint-disable prettier/prettier */
import { Option, Quiz } from 'src';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('questions')
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  question: string;


  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  
  @OneToMany(() => Option, (option) => option.question)
  options: Option[];
}
