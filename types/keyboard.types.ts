export type KeyboardLayout = KeyProps[][];

export interface KeyProps {
  p_key: string;
  p_key2?: string;
  label?: string;
  size?: KeySize;
  grow?: boolean;
}

export enum KeySize {
  STANDARD = 48,
  WIDE_SM = 72,
  WIDE_MD = 96,
  WIDE_LG = 112,
}
