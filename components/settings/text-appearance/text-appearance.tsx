'use client';

import { useSettingsStore } from '@/hooks/useSettingsStore';
import CursorStyleSettings from './cursor-style';
import TextAppearancePreview from './appearance-preview';
import SpaceStyleSettings from './space-style';

export default function TextAppearanceSettings() {
  const { appearance, setAppearance } = useSettingsStore();

  return (
    <fieldset className="rounded-md border p-2 text-base">
      <legend className="ml-4">Text Appearance</legend>
      <div className="space-y-2 p-2">
        <TextAppearancePreview />
        <div className="flex w-fit gap-4">
          <CursorStyleSettings
            cursorStyle={appearance.cursorStyle}
            setCursorStyle={(cursorStyle) => setAppearance({ cursorStyle })}
          />
          <SpaceStyleSettings
            spaceStyle={appearance.spaceStyle}
            setSpaceStyle={(spaceStyle) => setAppearance({ spaceStyle })}
          />
        </div>
      </div>
    </fieldset>
  );
}
