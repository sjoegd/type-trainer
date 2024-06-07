import { KeyboardLayout, KeySize } from '@/types/keyboard.types';

export const createKeyboardLayout = (): KeyboardLayout => {
  return [
    [
      { key1: '`', key2: '~' },
      { key1: '1', key2: '!' },
      { key1: '2', key2: '@' },
      { key1: '3', key2: '#' },
      { key1: '4', key2: '$' },
      { key1: '5', key2: '%' },
      { key1: '6', key2: '^' },
      { key1: '7', key2: '&' },
      { key1: '8', key2: '*' },
      { key1: '9', key2: '(' },
      { key1: '0', key2: ')' },
      { key1: '-', key2: '_' },
      { key1: '=', key2: '+' },
      {
        key1: 'backspace',
        size: KeySize.MEDIUM,
      },
    ],
    [
      { key1: 'tab', size: KeySize.SMALL },
      { key1: 'q' },
      { key1: 'w' },
      { key1: 'e' },
      { key1: 'r' },
      { key1: 't' },
      { key1: 'y' },
      { key1: 'u' },
      { key1: 'i' },
      { key1: 'o' },
      { key1: 'p' },
      { key1: '[', key2: '{' },
      { key1: ']', key2: '}' },
      { key1: '\\', key2: '|', size: KeySize.SMALL },
    ],
    [
      {
        key1: 'capslock',
        label: 'Caps Lock',
        size: KeySize.MEDIUM,
      },
      { key1: 'a' },
      { key1: 's' },
      { key1: 'd' },
      { key1: 'f' },
      { key1: 'g' },
      { key1: 'h' },
      { key1: 'j' },
      { key1: 'k' },
      { key1: 'l' },
      { key1: ';', key2: ':' },
      { key1: "'", key2: '"' },
      { key1: 'enter', size: KeySize.MEDIUM },
    ],
    [
      { key1: 'shift', size: KeySize.BIG },
      { key1: 'z' },
      { key1: 'x' },
      { key1: 'c' },
      { key1: 'v' },
      { key1: 'b' },
      { key1: 'n' },
      { key1: 'm' },
      { key1: ',', key2: '<' },
      { key1: '.', key2: '>' },
      { key1: '/', key2: '?' },
      { key1: 'shift', size: KeySize.BIG },
    ],
    [
      { key1: 'control', label: 'ctrl', size: KeySize.SMALL },
      { key1: 'alt', size: KeySize.SMALL },
      { key1: ' ', label: 'space', size: KeySize.SPACE },
      { key1: 'alt', size: KeySize.SMALL },
      { key1: 'control', label: 'ctrl', size: KeySize.SMALL },
    ],
  ];
};

export const getKeyboardKeys = (layout: KeyboardLayout) => {
  return layout
    .flat()
    .map((key) => (key.key2 ? [key.key1, key.key2] : [key.key1]))
    .flat();
};

export const getKeyboardKeyMap = (keys: string[]) => {
  return keys.reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as Record<string, boolean>);
};
