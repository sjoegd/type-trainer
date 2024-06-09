import { useEffect } from 'react';

export const useKeybinds = ({
  keybinds,
}: {
  keybinds: { key: string; action: () => void }[];
}) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement !== document.body) {
        return;
      }

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
