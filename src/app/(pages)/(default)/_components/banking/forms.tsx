"use client";

import { RightArrow } from "@/app/_assets/svg/right-arrow";
import { cn } from "@/app/_lib/utils";
import React, { useCallback, useEffect, useState } from "react";

export function Input(props: React.ComponentProps<"input">) {
  return (
    <input
      {...props}
      className={cn(
        "rounded-[5px] border border-[#D1B69F] bg-gradient-to-b from-[#D0D0D0] to-[#F4F4F0] shadow-[inset_0px_3px_6px_0px_rgba(0,0,0,0.20)] flex justify-center items-center px-2 h-full",
        "text-[#5F3F57] font-made-tommy font-bold text-[14px] py-1.5",
        props?.className
      )}
    />
  );
}

type Option = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type SelectProps = {
  label?: string;
  options: Option[];
  value?: string;
  name?: string;
  id?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export function Select({
  label,
  options,
  name,
  value,
  id,
  onChange,
  className,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleChange = useCallback(
    (newValue: string) => {
      setSelected(options.find((opt) => opt?.value === newValue) || options[0]);
      onChange?.(newValue);
      setIsOpen(false);
    },
    [onChange, options]
  );

  useEffect(() => {
    const values = options.map((opt) => opt?.value);
    if (!values?.includes(value || "")) return;

    setSelected(options.find((opt) => opt?.value === value) || options[0]);
  }, [options, value]);

  return (
    <div className={cn("flex flex-col w-full relative", className)}>
      {label && (
        <span className="text-[#7C5C6B] font-made-tommy text-[14px] font-bold leading-normal pt-1 px-2 mb-0.5">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full rounded-[10px] bg-[#D1B69F] text-sm text-[#745061]",
          "flex items-center justify-between gap-3 px-3 py-2 font-made-tommy font-bold text-[14px]"
        )}
      >
        <span className="flex items-center gap-2 text-[#5F3F57]">
          {selected.icon}
          {selected.label}
        </span>
        <RightArrow
          className={cn(
            "w-4 h-4 transition-transform",
            isOpen && "rotate-[90deg]"
          )}
          color="#917377"
          shadow={false}
        />
      </button>
      <input
        id={id}
        name={name}
        value={selected?.value}
        onChange={() => {}}
        className="absolute size-0 opacity-0"
      />

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full z-10 rounded-[10px] bg-[#d1b69f] p-1 shadow-lg overflow-hidden flex flex-col gap-0.5">
          {options.map((option) => (
            <div
              key={option?.value}
              onClick={() => {
                handleChange?.(option?.value);
                setIsOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 px-2 py-2 cursor-pointer font-made-tommy text-[#5F3F57] text-[14px] rounded-md",
                selected?.value != option?.value ? "bg-[#eed1b8] border-2" : ""
              )}
            >
              {option.icon}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
