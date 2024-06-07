'use client';

import { generatePracticeText } from '@/lib/practice-text';
import { Tracker } from '@/types/tracker.types';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const createUseTypePractice = () => {
  let started: Date | null = null;

  return (): {
    tracker: Tracker;
    wpm: number | null;
    onPress: (key: string) => void;
    restart: (generate?: boolean) => void;
  } => {
    const [practiceText, setPracticeText] = useState('');
    const [text, setText] = useState('');
    const [fails, setFails] = useState(new Set<number>());
    const [wpm, setWpm] = useState<number | null>(null);

    useEffect(() => {
      setPracticeText(generatePracticeText());
    }, []);

    const firstWord = useMemo(() => practiceText.split(' ')[0], [practiceText]);

    const onPress = useCallback(
      (key: string) => {
        if (practiceText.length === 0) {
          return;
        }

        if (practiceText[text.length] === key) {
          if (!started) {
            started = new Date();
          }

          setText((text) => text + key);
          return;
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
      if (practiceText.length > 0 && text.length === practiceText.length) {
        restart(true);
      }
    }, [text, practiceText, restart]);

    useEffect(() => {
      if (practiceText.length === 0 || text.length === 0 || !started) {
        return;
      }

      const words = text.split(' ');
      if (words[0] !== firstWord) {
        return;
      }

      const ms = new Date().getTime() - started.getTime();
      const wpm = (words.length / ms) * 1000 * 60;
      setWpm(Math.round(wpm));
    }, [practiceText, text, firstWord]);

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
