'use client';

import Keyboard from '@/components/keyboard/Keyboard';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState<string>('');

  return (
    <main className="p-10">
      <Keyboard
        onPress={(key) => {
          setText((text) => text + key);
        }}
        metaKeys={['tab', 'backspace', 'enter', 'alt', 'control']}
        onMetaPress={(key) => {
          if (key === 'backspace') {
            setText((text) => text.slice(0, -1));
          }
        }}
      />
      <text>{text}</text>
    </main>
  );
}
