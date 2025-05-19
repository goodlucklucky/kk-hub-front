import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/app/_lib/utils";
import { RightArrow } from "@/app/_assets/svg/right-arrow";

export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  options: { value: string; label: React.ReactNode | string }[];
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      placeholder,
      className,
      triggerClassName,
      contentClassName,
      itemClassName,
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = React.useState<
      string | undefined
    >(props.defaultValue as string);

    const sortedOptions = React.useMemo(() => {
      if (!selectedValue) return options;
      return [
        ...options.filter((opt) => opt.value === selectedValue),
        ...options.filter((opt) => opt.value !== selectedValue),
      ];
    }, [options, selectedValue]);

    return (
      <SelectPrimitive.Root
        {...props}
        onValueChange={(value) => {
          setSelectedValue(value);
          props.onValueChange?.(value);
          props.value = value;
        }}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(
            "flex h-[32px] w-full items-center justify-between rounded-[7px] bg-[#D1B69F] p-2 text-[#5F3F57] font-made-tommy text-[14px] font-bold leading-normal tracking-[0.14px] ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-none focus:none focus:ring-offset-none disabled:cursor-not-allowed disabled:opacity-50",
            triggerClassName
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            {/* <ChevronDownIcon className="h-4 w-4 opacity-50" /> */}
            <RightArrow
              className="w-4 h-4 rotate-90"
              color="#917377"
              shadow={false}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              "relative z-150 w-full px-1 overflow-hidden rounded-md bg-[#D1B69F] text-[#745061] shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              contentClassName
            )}
          >
            <SelectPrimitive.Viewport>
              {sortedOptions.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "relative flex w-full cursor-default select-none items-center rounded-[7px] my-0.5 p-1 outline-none text-[#5F3F57] bg-[#EED1B8] border border-[#917377] font-made-tommy text-[14px] font-bold leading-normal tracking-[0.14px] shadow-[0px_1px_0px_0px_rgba(0,0,0,0.20)]",
                    "data-[state=checked]:bg-[#D1B69F] data-[state=checked]:text-[#745061] data-[state=checked]:border-none data-[state=checked]:shadow-none",
                    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                    itemClassName
                  )}
                >
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  }
);

Select.displayName = "Select";

export { Select };
