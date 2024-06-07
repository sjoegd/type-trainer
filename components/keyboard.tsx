import { createKeyboardLayout } from '@/lib/keyboard';
import { KeyProps, KeySize } from '@/types/keyboard.types';
import { AspectRatio } from './ui/aspect-ratio';
import { cn } from '@/lib/cn';
import { useKeyboard } from '@/hooks/useKeyboard';

const layout = createKeyboardLayout();

export default function Keyboard({
  onPress,
  preventDefaultKeys,
}: {
  onPress?: (key: string) => void;
  preventDefaultKeys?: string[];
}) {
  const pressed = useKeyboard(layout, onPress, preventDefaultKeys);

  return (
    <AspectRatio ratio={3 / 1}>
      <div
        className="grid size-full select-none grid-rows-5 rounded-md border text-base capitalize shadow-lg"
        style={{ containerType: 'inline-size', padding: '1cqw', gap: '0.4cqw' }}
      >
        {layout.map((row, i) => (
          <KeyRow key={i}>
            {row.map((key, j) => (
              <Key
                {...key}
                key={key.key1 + j}
                pressed={
                  pressed[key.key1] || (key.key2 && pressed[key.key2]) || false
                }
              />
            ))}
          </KeyRow>
        ))}
      </div>
    </AspectRatio>
  );
}

function KeyRow({ children }: { children?: React.ReactNode }) {
  return (
    <div className="row-span-1 grid grid-cols-60" style={{ gap: '0.8cqw' }}>
      {children}
    </div>
  );
}

function Key({
  key1,
  key2,
  label,
  size,
  pressed,
}: KeyProps & { pressed: boolean }) {
  return (
    <div
      className={cn(
        'border max-h-full h-full flex flex-col overflow-hidden justify-center items-center rounded-sm shadow-sm',
        size ?? KeySize.STANDARD,
        pressed && 'bg-gray-100'
      )}
      style={{ fontSize: '1.8cqw', lineHeight: '0', gap: '2cqw' }}
    >
      {key2 && <p className="size-fit">{key2}</p>}
      <p className="size-fit">{label ?? key1}</p>
    </div>
  );
}
