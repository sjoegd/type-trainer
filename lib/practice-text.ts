'use client';

import words from '@/public/words.json'

export function generatePracticeText() {
  const text = [];
  for (let i = 0; i < 30; i++) {
    text.push(words[Math.floor(Math.random() * words.length)]);
  }
  return text.join(' ');
}
