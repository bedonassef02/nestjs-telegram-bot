import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { UserModule } from '../user/user.module';
import { QuizSession } from './utils/quiz-session.service';

@Module({
  imports: [UserModule],
  providers: [QuizService, QuizSession],
  exports: [QuizService, QuizSession],
})
export class QuizModule {}
