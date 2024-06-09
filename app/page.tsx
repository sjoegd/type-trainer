'use client';

import InfoDialog from '@/components/info-dialog';
import Keyboard from '@/components/keyboard';
import SettingsDialog from '@/components/settings/settings-dialog';
import StatsTracker from '@/components/tracker/stats-tracker';
import TextTracker from '@/components/tracker/text-tracker';
import ThemeToggle from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { useKeybinds } from '@/hooks/useKeybinds';
import { createUseTypePractice } from '@/hooks/useTypePractice';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

const useTypePractice = createUseTypePractice();

export default function Home() {
  const { textInfo, statsInfo, onPress, restart, forward, backward } =
    useTypePractice();

  useKeybinds({
    keybinds: [
      {
        key: 'Escape',
        action: restart,
      },
      {
        key: 'ArrowRight',
        action: forward,
      },
      {
        key: 'ArrowLeft',
        action: backward,
      },
    ],
  });

  return (
    <main className="flex h-full p-8">
      <div className="m-auto min-w-[768px] max-w-5xl space-y-16">
        <div className="space-y-12">
          <div className="flex w-full text-lg">
            <StatsTracker {...statsInfo} />
            <div className="ml-auto flex h-fit items-center gap-[2px]">
              <Button variant="ghost" size="icon" onClick={() => backward()}>
                <ChevronsLeft className="size-8" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => forward()}>
                <ChevronsRight className="size-8" />
              </Button>
              <ThemeToggle />
              <InfoDialog />
              <SettingsDialog />
            </div>
          </div>
          <TextTracker {...textInfo} />
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
