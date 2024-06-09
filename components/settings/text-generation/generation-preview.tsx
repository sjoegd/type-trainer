'use client';

import TextTracker from '@/components/tracker/text-tracker';
import { maxTextLength, useSettingsStore } from '@/hooks/useSettingsStore';
import { generatePracticeText } from '@/lib/generation';
import { useMemo } from 'react';

const preGeneratedText = generatePracticeText({
  textLength: maxTextLength,
  addCapitals: false,
  addPunctuation: false,
});

export default function TextGenerationPreview() {
  const { addCapitals, addPunctuation, textLength } = useSettingsStore(
    (state) => state.generation
  );

  const totalText = useMemo(() => {
    return generatePracticeText({
      previousText: preGeneratedText,
      textLength: maxTextLength,
      addCapitals,
      addPunctuation,
    });
  }, [addCapitals, addPunctuation]);

  const practiceText = useMemo(() => {
    return totalText.split(' ').slice(0, textLength).join(' ');
  }, [totalText, textLength]);

  return (
    <div className="flex h-fit min-h-[325px] justify-center rounded-md border p-2">
      <TextTracker text={practiceText} highlight={-1} fails={new Set()} />
    </div>
  );
}
