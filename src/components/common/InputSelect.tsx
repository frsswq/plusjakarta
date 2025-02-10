import { CaretDownIcon } from "@radix-ui/react-icons";
import React, { type ReactNode } from "react";

interface InputSelectProps {
  label: string;
  defaultValue: number | string;
  arrowIndicator?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}

export default function InputSelect({
  label,
  defaultValue,
  arrowIndicator = true,
  handleChange,
  children,
}: InputSelectProps) {
  return (
    <label className="flex items-center">
      <span className="sr-only">{label}</span>
      <select
        className={"appearance-none text-xs focus:outline-none"}
        onChange={handleChange}
        defaultValue={defaultValue}
      >
        {children}
      </select>
      {arrowIndicator && <CaretDownIcon />}
    </label>
  );
}
