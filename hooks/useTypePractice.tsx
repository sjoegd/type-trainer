'use client';

import { generatePracticeText } from '@/lib/generation';
import { StatsTrackerInfo, TextTrackerInfo } from '@/types/tracker.types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSettingsStore } from './useSettingsStore';

const maxPracticeTexts = 5;

export const createUseTypePractice = () => {
  let started: Date | null = null;

  return (): {
    textInfo: TextTrackerInfo;
    statsInfo: StatsTrackerInfo;
    onPress: (key: string) => void;
    restart: () => void;
    forward: () => void;
    backward: () => void;
  } => {
    const { generation: generationSettings } = useSettingsStore();
    const [practiceText, setPracticeText] = useState('');
    const [lastPracticeTexts, setLastPracticeTexts] = useState<string[]>([]);
    const [text, setText] = useState('');
    const [fails, setFails] = useState(new Set<number>());
    const [statsInfo, setStatsInfo] = useState<StatsTrackerInfo>({
      wpm: null,
      accuracy: null,
      progress: 0,
    });

    const firstWord = useMemo(() => practiceText.split(' ')[0], [practiceText]);

    useEffect(() => {
      const practiceText = generatePracticeText(generationSettings);
      setPracticeText(practiceText);
      setLastPracticeTexts([]);
    }, [generationSettings]);

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

    const restart = useCallback(() => {
      setText('');
      setFails(new Set());
      started = null;
    }, []);

    const forward = useCallback(() => {
      setLastPracticeTexts((lastPracticeTexts) =>
        [...lastPracticeTexts, practiceText].slice(-maxPracticeTexts)
      );
      setPracticeText(generatePracticeText(generationSettings));
      restart();
    }, [practiceText, restart, generationSettings]);

    const backward = useCallback(() => {
      if (lastPracticeTexts.length === 0) {
        return;
      }

      const newLastPracticeTexts = [...lastPracticeTexts];
      const practiceText = newLastPracticeTexts.pop() as string;
      setLastPracticeTexts(newLastPracticeTexts);
      setPracticeText(practiceText);
      restart();
    }, [lastPracticeTexts, restart]);

    useEffect(() => {
      if (practiceText.length > 0 && text.length === practiceText.length) {
        forward();
      }
    }, [text, practiceText, forward]);

    const wpm = useMemo(() => {
      if (practiceText.length === 0 || text.length === 0 || !started) {
        return null;
      }

      const words = text.split(' ');
      if (words[0] !== firstWord) {
        return null;
      }

      const ms = new Date().getTime() - started.getTime();
      const wpm = (words.length / ms) * 1000 * 60;
      return Math.round(wpm);
    }, [practiceText, text, firstWord]);

    const accuracy = useMemo(() => {
      if (text.length === 0) {
        return null;
      }

      return Math.round(((text.length - fails.size) / text.length) * 100);
    }, [text, fails]);

    const progress = useMemo(() => {
      if (practiceText.length === 0) {
        return null;
      }

      return Math.round((text.length / practiceText.length) * 100);
    }, [practiceText, text]);

    useEffect(() => {
      setStatsInfo((lastStatsInfo) => ({
        wpm: wpm ?? lastStatsInfo.wpm,
        accuracy: accuracy ?? lastStatsInfo.accuracy,
        progress: progress ?? lastStatsInfo.progress,
      }));
    }, [wpm, accuracy, progress]);

    return {
      textInfo: {
        text: practiceText,
        fails,
        highlight: text.length,
      },
      statsInfo: statsInfo,
      onPress,
      restart,
      forward,
      backward,
    };
  };
};
