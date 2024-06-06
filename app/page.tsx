'use client';

import Keyboard from '@/components/Keyboard';
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState<string>('');

  return (
    <main className="p-4">
      <Keyboard
        onPress={(key) => {
          setText((text) => text + key);
        }}
        preventDefaultKeys={['tab', 'enter', 'alt']}
      />
      <text>{text}</text>
    </main>
  );
}
