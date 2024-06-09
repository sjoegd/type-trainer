import words from '@/public/words.json';
import { GenerationSettings } from '@/types/settings.types';

const capitalChance = 1 / 5;
const punctuationChance = 1 / 10;

const punctations = ['.', '!', '?', ',', ';'];

export function generatePracticeText({
  textLength,
  addCapitals,
  addPunctuation,
  previousText,
}: GenerationSettings & { previousText?: string }) {
  const words = generateWords(textLength, previousText);

  const updatedWords = words.map((word) => {
    if (addCapitals && Math.random() < capitalChance) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    if (addPunctuation && Math.random() < punctuationChance) {
      word += punctations[Math.floor(Math.random() * punctations.length)];
    }

    return word;
  });

  return updatedWords.join(' ');
}

function generateWords(amount: number, previousText?: string) {
  return previousText
    ? previousText.split(' ').slice(0, amount)
    : Array.from({ length: amount }).map(
        () => words[Math.floor(Math.random() * words.length)]
      );
}
