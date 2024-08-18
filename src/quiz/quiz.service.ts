import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Progress } from '../user/utils/progress.type';
import { MCQ } from './utils/types/mcq.type';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class QuizService {
  private mcqs: MCQ[];

  constructor(private readonly userService: UserService) {
    this.loadMcqs();
  }

  start(user: number): Progress {
    let progress: Progress = this.userService.findOne(user);
    if (!progress) {
      progress = this.userService.init(user);
    }
    return progress;
  }

  findQuestion(index: number): MCQ {
    return this.mcqs[index];
  }

  isComplete(index: number): boolean {
    return index >= this.mcqs.length;
  }

  checkAnswer(progress: Progress, correct: number): boolean {
    const isCorrect = this.mcqs[progress.index++].correct === correct;
    if (isCorrect) {
      progress.score++;
    }
    this.userService.update(progress);
    return isCorrect;
  }

  findScore(user: number): number {
    return this.userService.findScore(user);
  }

  private loadMcqs() {
    const filePath = path.join('questions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    this.mcqs = JSON.parse(fileContent);
  }
}
