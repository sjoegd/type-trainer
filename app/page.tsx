'use client';

import Keyboard from '@/components/keyboard';
import Tracker from '@/components/text-tracker';
import { useKeybinds } from '@/hooks/useKeybinds';
import { createUseTextPractice } from '@/hooks/usePracticeText';
import { useEffect } from 'react';

const useTextPractice = createUseTextPractice();

export default function Home() {
  const { tracker, wpm, onPress, restart } =
    useTextPractice();

  useKeybinds({
    keybinds: [
      {
        key: 'Escape',
        action: restart,
      },
    ],
  });

  return (
    <main className="flex h-full p-4 px-16">
      <div className="m-auto max-w-5xl space-y-8">
        <div>WPM: {wpm}</div>
        <Tracker {...tracker} />
        <div className="px-20">
          <Keyboard
            onPress={onPress}
            preventDefaultKeys={['tab', 'enter', 'alt']}
          />
        </div>
      </div>
    </main>
  );
}
