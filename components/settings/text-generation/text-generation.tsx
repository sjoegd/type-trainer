'use client';

import TextGenerationPreview from './generation-preview';
import CharacterGenerationSettings from './character-generation';
import TextLengthSettings from './text-length';

export default function TextGenerationSettings() {
  return (
    <fieldset className="rounded-md border p-2 text-base">
      <legend className="ml-4">Text Generation</legend>
      <div className="space-y-4 p-2">
        <div className="flex w-fit gap-4">
          <CharacterGenerationSettings />
          <TextLengthSettings />
        </div>
        <TextGenerationPreview />
      </div>
    </fieldset>
  );
}
