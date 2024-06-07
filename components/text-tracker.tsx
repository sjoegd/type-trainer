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
        'flex flex-wrap justify-start select-none',
        robotoMono.className
      )}
      style={{ containerType: 'normal', fontSize: '1.5cqw' }}
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
        highlight && 'border-black',
        complete && 'text-gray-300',
        fail && complete && 'text-red-500'
      )}
    >
      {isSpace ? <Space complete={complete} fail={fail} /> : letter}
    </div>
  );
}

function Space({ complete, fail }: { complete: boolean; fail: boolean }) {
  return (
    <div className="flex size-full w-[0.8cqw] items-center justify-center pt-[0.2cqw]">
      <div
        className={cn(
          'size-[0.3cqw] rounded-full',
          complete ? 'bg-gray-300' : 'bg-black',
          fail && complete && 'bg-red-500'
        )}
      />
    </div>
  );
}
