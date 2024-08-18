import { Injectable } from '@nestjs/common';
import { Progress } from './utils/progress.type';

@Injectable()
export class UserService {
  private progresses: Map<number, Progress> = new Map();

  init(user: number): Progress {
    const progress: Progress = { user, index: 0, score: 0 };
    this.progresses.set(user, progress);
    return progress;
  }

  findOne(user: number): Progress | undefined {
    return this.progresses.get(user);
  }

  findScore(user: number): number {
    return this.findOne(user)?.score || 0;
  }

  update(progress: Progress): void {
    this.progresses.set(progress.user, progress);
  }

  remove(user: number): void {
    this.progresses.delete(user);
  }
}
