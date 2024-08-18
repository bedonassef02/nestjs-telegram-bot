import { Injectable } from '@nestjs/common';
import { QuizService } from '../quiz.service';
import { Reply } from '../../telegram/utils/types/reply.type';
import { Progress } from '../../user/utils/progress.type';
import { startQuiz } from './helpers/start-quiz.helper';
import { answerResponse } from './helpers/answer-response.helper';
import { QuizReply } from './constants/quiz.replies';
import { MCQ } from './types/mcq.type';
import { generateMCQ } from '../../telegram/utils/helpers/telegram-bot.helper';

@Injectable()
export class QuizSession {
  constructor(private readonly quizService: QuizService) {}

  start(user: number): Reply {
    const progress: Progress = this.quizService.start(user);
    return startQuiz(progress.index, this.quizService);
  }

  handleAnswer(user: number, selectedOption: number): Reply {
    const progress: Progress = this.quizService.start(user);
    if (this.quizService.isComplete(progress.index)) {
      return QuizReply.COMPLETED;
    }
    const isCorrect: boolean = this.quizService.checkAnswer(
      progress,
      selectedOption,
    );

    const next: number = this.hasNext(progress.index) ? progress.index : 0;
    return answerResponse(isCorrect, next);
  }

  findQuestion(index: number): Reply {
    const mcq: MCQ = this.quizService.findQuestion(index);
    if (!mcq) {
      return { message: 'No More Questions', reply_markup: null };
    }
    return { message: mcq.question, reply_markup: generateMCQ(mcq) };
  }

  private hasNext(index: number): boolean {
    return !this.quizService.isComplete(index);
  }

  findScore(user: number): number {
    return this.quizService.findScore(user);
  }
}
