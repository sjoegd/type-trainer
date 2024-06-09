'use client';

import TextTracker from '@/components/tracker/text-tracker';
import { useEffect, useState } from 'react';

const text = 'The quick brown fox jumps over the lazy dog';

export default function TextAppearancePreview() {
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlight((highlight) => (highlight % text.length) + 1);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center rounded-md border p-2">
      <TextTracker text={text} highlight={highlight} fails={new Set()} />
    </div>
  );
}
