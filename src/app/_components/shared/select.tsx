import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/app/_lib/utils";
import { RightArrow } from "@/app/_assets/svg/right-arrow";

export interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
}

const Select = React.forwardRef<
  HTMLButtonElement,
  SelectProps
>(({ options, placeholder, className, triggerClassName, contentClassName, itemClassName, ...props }, ref) => {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-[10px] bg-[#D1B69F] px-3 py-2 text-sm text-[#745061] ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-none focus:none focus:ring-offset-none disabled:cursor-not-allowed disabled:opacity-50",
          triggerClassName
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          {/* <ChevronDownIcon className="h-4 w-4 opacity-50" /> */}
          <RightArrow className="w-4 h-4 rotate-90" color="#917377" shadow={false}/>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className={cn(
            "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-[#A96415] bg-[#EED1B8] text-[#745061] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            contentClassName
          )}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={cn(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-[#E3BEAA] focus:text-[#745061] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  itemClassName
                )}
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  <SelectPrimitive.ItemIndicator>
                    {/* <ChevronDownIcon className="h-4 w-4" /> */}
                  </SelectPrimitive.ItemIndicator>
                </span>
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

Select.displayName = "Select";

export { Select }; 