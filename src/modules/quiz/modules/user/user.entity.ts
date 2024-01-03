/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty({ description: 'Primary key as User ID', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'User name', example: 'Jhon Doe' })
  @Column()
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'jhon.doe@gmail.com',
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({ description: 'Hashed user password' })
  @Column()
  password: string;

  @ApiProperty({ description: 'When user was created' })
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
}
