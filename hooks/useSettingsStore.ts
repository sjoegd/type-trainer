import { create } from 'zustand';
import { CursorStyle, SettingsStore, SpaceStyle } from '@/types/settings.types';

export const minTextLength = 10;
export const maxTextLength = 50;

export const useSettingsStore = create<SettingsStore>((set) => ({
  appearance: {
    cursorStyle: CursorStyle.UNDERLINE,
    spaceStyle: SpaceStyle.DOT,
  },
  generation: {
    addCapitals: false,
    addPunctuation: false,
    textLength: 30,
  },
  setAppearance: (appearance: Partial<SettingsStore['appearance']>) => {
    set(({ appearance: previousAppearance }) => ({
      appearance: { ...previousAppearance, ...appearance },
    }));
  },
  setGeneration: (generation: Partial<SettingsStore['generation']>) => {
    set(({ generation: previousGeneration }) => ({
      generation: { ...previousGeneration, ...generation },
    }));
  },
}));
