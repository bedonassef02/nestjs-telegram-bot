import { MCQ } from '../../../quiz/utils/types/mcq.type';

export function generateMCQ(mcq: MCQ) {
  return {
    inline_keyboard: mcq.options.map((option, i) => [
      { text: option, callback_data: `${i}` },
    ]),
  };
}
