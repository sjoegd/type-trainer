import { SpaceStyle } from '@/types/settings.types';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

export default function SpaceStyleSettings({
  spaceStyle,
  setSpaceStyle,
}: {
  spaceStyle: SpaceStyle;
  setSpaceStyle: (spaceStyle: SpaceStyle) => void;
}) {
  return (
    <div className="space-y-2">
      <p>Space Style</p>
      <RadioGroup
        value={spaceStyle}
        className="flex"
        onValueChange={(v: SpaceStyle) => setSpaceStyle(v)}
      >
        {Object.values(SpaceStyle).map((style) => (
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
