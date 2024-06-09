export type KeyboardLayout = KeyProps[][];

export interface KeyProps {
  key1: string;
  key2?: string;
  label?: string;
  size?: KeySize;
}

export enum KeySize {
  STANDARD = 'col-span-4',
  SMALL = 'col-span-6',
  MEDIUM = 'col-span-8',
  BIG = 'col-span-10',
  SPACE = 'col-span-36',
}
