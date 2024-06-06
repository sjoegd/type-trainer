import { KeyboardLayout, KeySize } from '@/types/keyboard.types';

export const createKeyboardLayout = (): KeyboardLayout => {
  return [
    [
      { p_key: '`', p_key2: '~' },
      { p_key: '1', p_key2: '!' },
      { p_key: '2', p_key2: '@' },
      { p_key: '3', p_key2: '#' },
      { p_key: '4', p_key2: '$' },
      { p_key: '5', p_key2: '%' },
      { p_key: '6', p_key2: '^' },
      { p_key: '7', p_key2: '&' },
      { p_key: '8', p_key2: '*' },
      { p_key: '9', p_key2: '(' },
      { p_key: '0', p_key2: ')' },
      { p_key: '-', p_key2: '_' },
      { p_key: '=', p_key2: '+' },
      {
        p_key: 'backspace',
        size: KeySize.WIDE_MD,
        grow: true,
      },
    ],
    [
      { p_key: 'tab', size: KeySize.WIDE_SM },
      { p_key: 'q' },
      { p_key: 'w' },
      { p_key: 'e' },
      { p_key: 'r' },
      { p_key: 't' },
      { p_key: 'y' },
      { p_key: 'u' },
      { p_key: 'i' },
      { p_key: 'o' },
      { p_key: 'p' },
      { p_key: '[', p_key2: '{' },
      { p_key: ']', p_key2: '}' },
      { p_key: '\\', p_key2: '|', size: KeySize.WIDE_SM, grow: true },
    ],
    [
      {
        p_key: 'capslock',
        label: 'Caps Lock',
        size: KeySize.WIDE_MD,
        grow: true,
      },
      { p_key: 'a' },
      { p_key: 's' },
      { p_key: 'd' },
      { p_key: 'f' },
      { p_key: 'g' },
      { p_key: 'h' },
      { p_key: 'j' },
      { p_key: 'k' },
      { p_key: 'l' },
      { p_key: ';', p_key2: ':' },
      { p_key: "'", p_key2: '"' },
      { p_key: 'enter', size: KeySize.WIDE_LG },
    ],
    [
      { p_key: 'shift', size: KeySize.WIDE_LG, grow: true },
      { p_key: 'z' },
      { p_key: 'x' },
      { p_key: 'c' },
      { p_key: 'v' },
      { p_key: 'b' },
      { p_key: 'n' },
      { p_key: 'm' },
      { p_key: ',', p_key2: '<' },
      { p_key: '.', p_key2: '>' },
      { p_key: '/', p_key2: '?' },
      { p_key: 'shift', size: KeySize.WIDE_LG, grow: true },
    ],
    [
      { p_key: 'control', label: 'ctrl', size: KeySize.WIDE_SM },
      { p_key: 'alt', size: KeySize.WIDE_SM },
      { p_key: ' ', label: 'space', grow: true },
      { p_key: 'alt', size: KeySize.WIDE_SM },
      { p_key: 'control', label: 'ctrl', size: KeySize.WIDE_SM },
    ],
  ];
};

export const getKeyboardKeys = (layout: KeyboardLayout) => {
  return layout
    .flat()
    .map((key) => key.p_key2 ? [key.p_key, key.p_key2] : [key.p_key])
    .flat()
};

export const getKeyboardKeyMap = (keys: string[]) => {
  return keys.reduce((acc, key) => {
    acc[key] = false;
    return acc;
  }, {} as Record<string, boolean>);
};
