import { Reply } from '../../../telegram/utils/types/reply.type';
import { MCQ } from '../types/mcq.type';
import { generateMCQ } from '../../../telegram/utils/helpers/telegram-bot.helper';
import { QuizService } from '../../quiz.service';
import { QuizReply } from '../constants/quiz.replies';

export function startQuiz(index: number, quizService: QuizService): Reply {
  if (index === 0) {
    const mcq: MCQ = quizService.findQuestion(index);
    return { message: mcq.question, reply_markup: generateMCQ(mcq) };
  } else if (quizService.isComplete(index)) {
    return QuizReply.COMPLETED;
  } else {
    return QuizReply.STARTED;
  }
}
