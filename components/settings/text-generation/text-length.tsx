import { Slider } from '@/components/ui/slider';
import {
  maxTextLength,
  minTextLength,
  useSettingsStore,
} from '@/hooks/useSettingsStore';

export default function TextLengthSettings() {
  const { generation, setGeneration } = useSettingsStore();

  return (
    <div className="h-full space-y-2">
      <p className="mr-20">Text Length</p>
      <div className='flex flex-col gap-2'>
        <p>{generation.textLength} words</p>
        <Slider
          min={minTextLength}
          max={maxTextLength}
          step={1}
          value={[generation.textLength]}
          onValueChange={([textLength]: [number]) =>
            setGeneration({ textLength })
          }
        />
      </div>
    </div>
  );
}
