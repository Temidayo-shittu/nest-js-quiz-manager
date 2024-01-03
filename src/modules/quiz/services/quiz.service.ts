/* eslint-disable prettier/prettier */
import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { Question, Quiz } from "src";
import { CreateQuizDto } from "src/dto/CreateQuiz.dto";
import { Repository } from "typeorm";

@Injectable()
export class QuizService{
    constructor(@InjectRepository(Quiz) private readonly quizRepository:Repository<Quiz>){}

    async getAllQuiz() : Promise<Quiz[]> {
        return await this.quizRepository.createQueryBuilder('q')
        .leftJoinAndSelect('q.questions', 'qt')
        .leftJoinAndSelect('qt.options', 'o')
        .getMany()
    }

    async paginate(options: IPaginationOptions) : Promise<Pagination<Quiz>> {
        const qb = this.quizRepository.createQueryBuilder('q');
        qb.orderBy('q.id', 'DESC')
        return paginate<Quiz>(qb,options)

    }

    async getQuizById(id:number) : Promise<Quiz> {
        return await this.quizRepository.findOne(id, { relations: ['questions','questions.options']})
    }

    
    async createNewQuiz(createQuizDto: CreateQuizDto) : Promise<Quiz> {
        return await this.quizRepository.save(createQuizDto);
      }
}