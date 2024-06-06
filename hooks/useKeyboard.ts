'use client';

import { getKeyboardKeyMap, getKeyboardKeys } from '@/lib/keyboard';
import { KeyboardLayout } from '@/types/keyboard.types';
import { useEffect, useMemo, useState } from 'react';

export const useKeyboard = (
  layout: KeyboardLayout,
  onPress?: (key: string) => void,
  preventDefaultKeys?: string[]
) => {
  const keys = useMemo(() => getKeyboardKeys(layout), [layout]);
  const [pressed, setPressed] = useState(getKeyboardKeyMap(keys));

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (!(keys.includes(e.key) || keys.includes(e.key.toLowerCase()))) {
        return;
      }

      onPress?.(e.key);
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (preventDefaultKeys?.includes(key)) {
        e.preventDefault();
      }

      if (!keys.includes(key)) {
        return;
      }

      setPressed((prev) => ({ ...prev, [key]: true }));
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!keys.includes(key)) return;
      setPressed((prev) => ({ ...prev, [key]: false }));
    };

    window.addEventListener('keypress', onKeyPress);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keypress', onKeyPress);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [keys, onPress]);

  return pressed;
};
