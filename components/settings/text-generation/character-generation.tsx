import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useSettingsStore } from '@/hooks/useSettingsStore';

export default function CharacterGenerationSettings() {
  const { generation, setGeneration } = useSettingsStore();

  return (
    <div className="h-full space-y-2">
      <p>Characters</p>
      <div className="flex flex-col gap-3">
        <CharacterGenerationCheckbox
          label="Add capitals"
          checked={generation.addCapitals}
          onCheckedChange={(checked) => setGeneration({ addCapitals: checked })}
        />
        <CharacterGenerationCheckbox
          label="Add punctuation"
          checked={generation.addPunctuation}
          onCheckedChange={(addPunctuation) =>
            setGeneration({ addPunctuation })
          }
        />
      </div>
    </div>
  );
}

function CharacterGenerationCheckbox({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={(e) => onCheckedChange(Boolean(e.valueOf()))}
        className="rounded-md"
      />
      <Label htmlFor={label}>{label}</Label>
    </div>
  );
}
