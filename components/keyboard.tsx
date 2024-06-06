import { type KeyProps, KeySize } from '@/types/keyboard.types';
import { useKeyboard } from '@/hooks/useKeyboard';
import { createKeyboardLayout } from '@/lib/keyboard';
import { cn } from '@/lib/cn';

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
    <div className="flex w-fit select-none flex-col gap-1 rounded-md border p-4 text-base capitalize">
      {layout.map((row, i) => (
        <KeyRow key={i}>
          {row.map((key, j) => (
            <Key
              {...key}
              key={key.p_key + j}
              pressed={
                pressed[key.p_key] ||
                (key.p_key2 && pressed[key.p_key2]) ||
                false
              }
            />
          ))}
        </KeyRow>
      ))}
    </div>
  );
}

function KeyRow({ children }: { children?: React.ReactNode }) {
  return <div className="flex h-12 gap-1">{children}</div>;
}

function Key({
  p_key: key,
  p_key2: key2,
  label,
  size,
  grow,
  pressed,
}: KeyProps & { pressed: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-col h-full shrink-0 items-center justify-center border',
        grow && 'grow',
        pressed && 'bg-gray-100'
      )}
      style={{
        width: size ?? KeySize.STANDARD,
      }}
    >
      {key2 && <span>{key2}</span>}
      <span>{label ?? key}</span>
    </div>
  );
}
