import { cn } from "@/app/_lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { DialogClose } from "../ui/dialog";
import { CloseHandelIcon, CloseIcon } from "@/app/_assets/svg/close";

export default function DialogContainer({
  children,
  className,
  title,
  titleClassName,
}: {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode | string;
  titleClassName?: string;
}) {
  return (
    <>
      {title && (
        <DialogTitle className={cn("font-bold text-xl", titleClassName)}>
          {title}
        </DialogTitle>
      )}
      <div className={cn("rounded-2xl p-2", className)}>
        {children}
      </div>
      <DialogCloseButton />
    </>
  );
}

export function DialogCloseButton({ className }: { className?: string }) {
  return (
    <DialogClose
      className={cn(
        "mx-auto w-fit flex items-center justify-center -translate-y-[calc(50%+3px)] left-1/2",
        className
      )}
    >
      <CloseHandelIcon className="absolute -z-[1]" />
      <CloseIcon />
    </DialogClose>
  );
}
