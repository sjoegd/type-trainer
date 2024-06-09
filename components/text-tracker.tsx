'use client';

import { cn } from '@/lib/cn';
import { robotoMono } from '@/lib/fonts';
import { Tracker } from '@/types/tracker.types';
import { useMemo } from 'react';

export default function TextTracker({ text, highlight, fails }: Tracker) {
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
        'flex w-full flex-wrap justify-start select-none text-xl lg:text-2xl xl:text-3xl',
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
  const isSpace = letter === ' ';
  return (
    <div
      className={cn(
        'box-border border-b border-transparent',
        highlight && 'border-foreground',
        complete && 'text-complete',
        fail && complete && 'text-destructive'
      )}
    >
      {isSpace ? <Space complete={complete} fail={fail} /> : letter}
    </div>
  );
}

function Space({ complete, fail }: { complete: boolean; fail: boolean }) {
  return (
    <div className="flex size-full w-4 items-center justify-center pt-1">
      <div
        className={cn(
          'size-[4px] lg:size-[5px] xl:size-[6px] rounded-full',
          complete ? 'bg-complete' : 'bg-foreground',
          fail && complete && 'bg-destructive'
        )}
      />
    </div>
  );
}
