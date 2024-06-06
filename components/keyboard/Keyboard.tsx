'use client';

import {
  createKeyboardLayout,
  getKeyboardKeyMap,
  getKeyboardKeys,
} from '@/lib/keyboard';
import { cn } from '@/lib/utils';
import { type KeyProps, KeySize } from '@/types/keyboard.types';
import { useEffect, useState } from 'react';

const layout = createKeyboardLayout();
const keys = getKeyboardKeys(layout);

export default function Keyboard({
  onPress,
  metaKeys,
  onMetaPress,
}: {
  onPress?: (key: string) => void;
  metaKeys?: string[];
  onMetaPress?: (key: string) => void;
}) {
  const [pressed, setPressed] = useState(getKeyboardKeyMap(keys));

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (!(keys.includes(e.key) || keys.includes(e.key.toLowerCase()))) return;
      onPress?.(e.key);
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (metaKeys && metaKeys.includes(key)) {
        onMetaPress?.(key);
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
  }, [onPress, metaKeys, onMetaPress]);

  return (
    <div className="flex w-fit select-none flex-col gap-1 rounded-md border p-4 text-base capitalize">
      {layout.map((row, i) => (
        <KeyRow key={i}>
          {row.map((key, j) => (
            <KeyComponent
              {...key}
              key={key.p_key + j}
              pressed={
                pressed[key.p_key] ||
                (key.p_key2 && pressed[key.p_key2]) ||
                false
              }
            />
          ))}
        </KeyRow>
      ))}
    </div>
  );
}

function KeyRow({ children }: { children?: React.ReactNode }) {
  return <div className="flex h-12 gap-1">{children}</div>;
}

function KeyComponent({
  p_key: key,
  p_key2: key2,
  label,
  size,
  grow,
  pressed,
}: KeyProps & { pressed: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-col h-full shrink-0 items-center justify-center border',
        grow && 'grow',
        pressed && 'bg-gray-100'
      )}
      style={{
        width: size ?? KeySize.STANDARD,
      }}
    >
      {key2 && <span>{key2}</span>}
      <span>{label ?? key}</span>
    </div>
  );
}
