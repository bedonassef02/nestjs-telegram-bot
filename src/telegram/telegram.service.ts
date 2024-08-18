import { Injectable } from '@nestjs/common';
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { QuizSession } from '../quiz/utils/quiz-session.service';
import { QuizReply } from '../quiz/utils/constants/quiz.replies';

@Update()
@Injectable()
export class TelegramService {
  constructor(private readonly quizSession: QuizSession) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Welcome to the Quiz Bot! Type /quiz to start.');
  }

  @Command('quiz')
  async quiz(@Ctx() ctx: Context) {
    const user: number = ctx.from.id;
    const { message, reply_markup } = this.quizSession.start(user);
    await ctx.reply(message, { reply_markup });
  }

  @Action(/\d+/)
  async handleAnswer(@Ctx() ctx: any) {
    const user = ctx.from.id;
    const selectedOption: number = parseInt(ctx.callbackQuery.data, 10);
    const { message, reply_markup, next } = this.quizSession.handleAnswer(
      user,
      selectedOption,
    );
    await ctx.reply(message, { reply_markup });
    if (next !== 0) {
      const { message, reply_markup } = this.quizSession.findQuestion(next);
      await ctx.reply(message, { reply_markup });
    } else {
      await ctx.reply(QuizReply.COMPLETED.message);
      const score: number = this.quizSession.findScore(user);
      await ctx.reply(`You final score is ${score}`);
    }
  }
}
