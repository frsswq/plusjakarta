import { CaretDownIcon } from "@radix-ui/react-icons";
import React, { type ReactNode } from "react";

interface InputSelectProps {
  defaultValue?: number;
  arrowIndicator?: boolean;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
}

export default function InputSelect({
  defaultValue,
  arrowIndicator = true,
  handleChange,
  children,
}: InputSelectProps) {
  return (
    <label className="flex items-center">
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
