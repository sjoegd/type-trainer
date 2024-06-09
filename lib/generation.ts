import words from '@/public/words.json';
import { GenerationSettings } from '@/types/settings.types';

const capitalChance = 1 / 5;
const punctuationChance = 1 / 10;

const punctations = ['.', '!', '?', ',', ';'];

export function generatePracticeText({
  textLength,
  addCapitals,
  addPunctuation,
}: GenerationSettings) {
  const text = [];
  for (let i = 0; i < textLength; i++) {
    let word = words[Math.floor(Math.random() * words.length)];

    if (addCapitals && Math.random() < capitalChance) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    if (addPunctuation && Math.random() < punctuationChance) {
      word += punctations[Math.floor(Math.random() * punctations.length)];
    }

    text.push(word);
  }
  return text.join(' ');
}
