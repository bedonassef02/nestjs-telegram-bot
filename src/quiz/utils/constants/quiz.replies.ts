import { Reply } from '../../../telegram/utils/types/reply.type';

const quizCompleted: Reply = {
  message: 'You have been already Completed This Quiz',
  reply_markup: null,
};

const quizStarted: Reply = {
  message: 'You have been already Started This Quiz',
  reply_markup: null,
};

export const QuizReply = {
  COMPLETED: quizCompleted,
  STARTED: quizStarted,
};
