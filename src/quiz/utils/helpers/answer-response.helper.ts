import { Reply } from '../../../telegram/utils/types/reply.type';

export function answerResponse(isCorrect: boolean, next: number): Reply {
  if (isCorrect) {
    return { message: 'Correct Answer', reply_markup: null, next };
  } else {
    return { message: 'Wrong Answer', reply_markup: null, next };
  }
}
