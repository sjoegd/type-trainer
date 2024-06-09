'use client';

import { useSettingsStore } from '@/hooks/useSettingsStore';
import { cn } from '@/lib/cn';
import { robotoMono } from '@/lib/fonts';
import { getCursorStyling, getSpaceStyling } from '@/lib/settings';
import { SpaceStyle } from '@/types/settings.types';
import { TextTrackerInfo } from '@/types/tracker.types';
import { useMemo } from 'react';

export default function TextTracker({
  text,
  highlight,
  fails,
}: TextTrackerInfo) {
  const words = useMemo(() => text.split(' '), [text]);

  const { words: wordComponents } = useMemo(() => {
    const failArray = Array.from(fails);

    return words.reduce(
      (acc, word, i) => {
        const space = i < words.length - 1;

        acc.words.push(
          <Word
            key={i}
            word={word}
            space={space}
            highlight={highlight - acc.totalLength}
            fails={failArray.map((v) => v - acc.totalLength)}
          />
        );

        acc.totalLength += word.length;

        if (space) {
          acc.totalLength += 1;
        }

        return acc;
      },
      { totalLength: 0, words: [] } as {
        totalLength: number;
        words: React.ReactNode[];
      }
    );
  }, [words, highlight, fails]);

  return (
    <div
      className={cn(
        'flex max-w-full h-fit flex-wrap justify-start select-none text-xl lg:text-2xl xl:text-3xl',
        robotoMono.className
      )}
    >
      {wordComponents}
    </div>
  );
}

function Word({
  word,
  space,
  highlight,
  fails,
}: {
  word: string;
  space: boolean;
  highlight: number;
  fails: number[];
}) {
  const fullWord = useMemo(() => {
    const fullWord = word.split('');
    if (space) {
      fullWord.push(' ');
    }
    return fullWord;
  }, [word, space]);

  return (
    <div className="flex">
      {fullWord.map((letter, i) => (
        <>
          <Letter
            key={i}
            letter={letter}
            highlight={i == highlight}
            complete={i < highlight}
            fail={fails.includes(i)}
          />
        </>
      ))}
    </div>
  );
}

function Letter({
  letter,
  highlight,
  complete,
  fail,
}: {
  letter: string;
  highlight: boolean;
  complete: boolean;
  fail: boolean;
}) {
  const cursorStyle = useSettingsStore((state) => state.appearance.cursorStyle);
  const isSpace = letter === ' ';

  const styling = useMemo(() => {
    return cn(
      'border-transparent box-border border',
      highlight && 'border-foreground',
      getCursorStyling(cursorStyle),
      complete && 'text-complete',
      fail && complete && 'text-destructive'
    );
  }, [cursorStyle, highlight, complete, fail]);

  return (
    <div className={styling}>
      {isSpace ? <Space complete={complete} fail={fail} /> : letter}
    </div>
  );
}

function Space({ complete, fail }: { complete: boolean; fail: boolean }) {
  const spaceStyle = useSettingsStore((state) => state.appearance.spaceStyle);

  const styling = useMemo(() => {
    return cn(
      complete ? 'bg-complete' : 'bg-foreground',
      fail && complete && 'bg-destructive',
      getSpaceStyling(spaceStyle)
    );
  }, [complete, fail, spaceStyle]);

  return (
    <div className='flex h-full justify-center pb-1 pt-2'>
      <div className='flex w-4'>
        <div className={styling} />
      </div>
    </div>
  );
}
