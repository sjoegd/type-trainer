import { ChevronRight, InfoIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";

export default function InfoDialog() {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-1" onClick={() => {}}>
          <InfoIcon className="size-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="size-fit gap-0 text-lg sm:max-w-screen-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="border-b text-3xl font-medium">
            Info
          </DialogTitle>
          <DialogDescription>
            Type Trainer is a tool created using Next.js to help you improve
            your typing speed.
            <br />
          </DialogDescription>
          <DialogTitle className="border-b text-2xl font-medium">
            How to use
          </DialogTitle>
          <DialogDescription>
            When you&apos;re ready, press any key to start typing.
            <div className="space-y-1">
              <span className="flex gap-1">
                <div className="w-fit rounded-md border px-1 text-base">
                  ESC
                </div>
                to restart the text.
              </span>
              <span className="flex gap-1">
                <div className="w-fit rounded-md border px-[6.5px]">
                  <ChevronRight />
                </div>
                to skip to the next text.
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-x-1 sm:space-x-1">
          <span>Created by</span>
          <Link className="font-medium" href="https://github.com/sjoegd">
            Sjoegd
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

}