import { SettingsIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import TextAppearanceSettings from './text-appearance/text-appearance';
import TextGenerationSettings from './text-generation/text-generation';

export default function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="size-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="size-fit min-w-[600px] max-w-screen-sm select-none gap-0 text-lg sm:max-w-screen-md lg:min-w-[950px]">
        <DialogHeader className="space-y-3">
          <DialogTitle className="border-b text-3xl font-medium">
            Settings
          </DialogTitle>
          <TextAppearanceSettings />
          <TextGenerationSettings />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
