export enum CursorStyle {
  BOX = 'box',
  LINE = 'line',
  UNDERLINE = 'underline',
}

export enum SpaceStyle {
  DOT = 'dot',
  EMPTY = 'empty',
  DASH = 'line',
}

export interface GenerationSettings {
  addCapitals: boolean;
  addPunctuation: boolean;
  textLength: number;
}

export interface SettingsStore {
  appearance: {
    cursorStyle: CursorStyle;
    spaceStyle: SpaceStyle;
  };
  generation: GenerationSettings,
  setAppearance: (appearance: Partial<SettingsStore['appearance']>) => void;
  setGeneration: (generation: Partial<SettingsStore['generation']>) => void;
}
