'use client';

import InfoDialog from '@/components/info-dialog';
import Keyboard from '@/components/keyboard';
import TextTracker from '@/components/text-tracker';
import { Button } from '@/components/ui/button';
import { useKeybinds } from '@/hooks/useKeybinds';
import { createUseTypePractice } from '@/hooks/useTypePractice';
import { ChevronsRight } from 'lucide-react';

const useTypePractice = createUseTypePractice();

export default function Home() {
  const { tracker, wpm, onPress, restart } = useTypePractice();

  useKeybinds({
    keybinds: [
      {
        key: 'Escape',
        action: restart,
      },
      {
        key: 'ArrowRight',
        action: () => restart(true)
      }
    ],
  });

  return (
    <main className="flex h-full p-8">
      <div className="m-auto min-w-[768px] max-w-5xl space-y-16">
        <div className="space-y-12">
          <div className="flex w-full items-center  text-lg">
            <p className="text-lg">WPM: {wpm}</p>
            <div className="ml-auto">
              <Button
                variant="ghost"
                className="p-1"
                onClick={() => restart(true)}
              >
                <ChevronsRight className="size-8" />
              </Button>
              <InfoDialog />
            </div>
          </div>
          <TextTracker {...tracker} />
        </div>
        <div className="px-8">
          <Keyboard
            onPress={onPress}
            preventDefaultKeys={['tab', 'enter', 'alt']}
          />
        </div>
      </div>
    </main>
  );
}
