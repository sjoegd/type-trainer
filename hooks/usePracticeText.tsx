'use client';

import { generatePracticeText } from '@/lib/practice-text';
import { Tracker } from '@/types/tracker.types';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const createUseTextPractice = () => {
  let started: Date | null = null;

  return (): {
    tracker: Tracker;
    wpm: number | null;
    onPress: (key: string) => void;
    restart: (generate?: boolean) => void;
  } => {
    const [practiceText, setPracticeText] = useState(generatePracticeText());
    const [text, setText] = useState('');
    const [fails, setFails] = useState(new Set<number>());
    const [wpm, setWpm] = useState<number | null>(null);

    const firstWord = useMemo(() => practiceText.split(' ')[0], [practiceText]);

    const onPress = useCallback(
      (key: string) => {
        if (practiceText[text.length] === key) {
          if (!started) {
            started = new Date();
          }
          return setText((text) => text + key);
        }

        setFails((fails) => new Set(fails).add(text.length));
      },
      [practiceText, text]
    );

    const restart = useCallback(
      (generate?: boolean) => {
        setPracticeText(generate ? generatePracticeText() : practiceText);
        setText('');
        setFails(new Set());
        started = null;
      },
      [practiceText]
    );

    useEffect(() => {
      if (text.length !== practiceText.length) {
        return;
      }
      restart(true);
    }, [text, practiceText, restart]);

    useEffect(() => {
      if (text.length === 0 || !started) {
        return;
      }

      const words = text.split(' ');
      if (words[0] !== firstWord) {
        return;
      }

      const ms = new Date().getTime() - started.getTime();
      const wpm = (words.length / ms) * 1000 * 60;
      setWpm(Math.round(wpm));
    }, [text, firstWord]);

    return {
      tracker: {
        text: practiceText,
        fails,
        highlight: text.length,
      },
      wpm,
      onPress,
      restart,
    };
  };
};
