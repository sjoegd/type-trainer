import { CursorStyle } from '@/types/settings.types';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

export default function CursorStyleSettings({
  cursorStyle,
  setCursorStyle,
}: {
  cursorStyle: CursorStyle;
  setCursorStyle: (cursorStyle: CursorStyle) => void;
}) {
  return (
    <div className="space-y-2">
      <p>Cursor Style</p>
      <RadioGroup
        value={cursorStyle}
        className="flex"
        onValueChange={(v: CursorStyle) => setCursorStyle(v)}
      >
        {Object.values(CursorStyle).map((style) => (
          <div key={style} className="flex items-center space-x-2">
            <RadioGroupItem value={style} id={style} />
            <Label htmlFor={style} className="capitalize">
              {style}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
