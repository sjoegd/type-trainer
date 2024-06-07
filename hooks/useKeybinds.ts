import { useEffect } from 'react';

export const useKeybinds = ({
  keybinds,
}: {
  keybinds: { key: string; action: () => void }[];
}) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      for (const { key, action } of keybinds) {
        if (e.key === key) {
          action();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [keybinds]);
};
