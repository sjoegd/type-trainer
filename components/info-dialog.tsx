import { ChevronLeft, ChevronRight, InfoIcon } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import Link from 'next/link';

export default function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <InfoIcon className="size-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="size-fit gap-0 text-lg sm:max-w-screen-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="border-b text-3xl font-medium">
            Information
          </DialogTitle>
          <DialogDescription>
            Type Trainer is a tool created using Next.js to help you improve
            your typing speed.
          </DialogDescription>
          <DialogTitle className="border-b text-2xl font-medium">
            How to use
          </DialogTitle>
          <DialogDescription>
            When you&apos;re ready, press any key to start typing.
            <div className="mt-1 space-y-[6px]">
              <span className="flex items-center gap-1">
                <div className="w-fit rounded-md border p-1 text-base">ESC</div>
                to restart the text.
              </span>
              <span className="flex items-center gap-1">
                <div className="mr-[2px] w-fit rounded-md border px-[7px] py-1">
                  <ChevronRight />
                </div>
                to generate new text.
              </span>
              <span className="flex items-center gap-1">
                <div className="mr-[2px] w-fit rounded-md border px-[7px] py-1">
                  <ChevronLeft />
                </div>
                to go back to previous text.
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-x-1 sm:space-x-1">
          <span>Created by</span>
          <Link
            className="font-medium"
            href="https://github.com/sjoegd/type-trainer"
          >
            Sjoegd
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
