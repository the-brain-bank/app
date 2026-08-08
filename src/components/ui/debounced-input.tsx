"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

interface DebouncedInputProps extends React.ComponentProps<typeof Input> {
  debounceTime: number;
  onValueChange: (value: string) => void;
}

export function DebouncedInput({
  value: initialValue,
  debounceTime = 500,
  onValueChange,
  ...props
}: DebouncedInputProps) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onValueChange((value as string) ?? "");
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [value, debounceTime, onValueChange]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
