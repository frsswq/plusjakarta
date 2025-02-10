import { CaretDownIcon } from "@radix-ui/react-icons";
import React, { type ReactNode, useId } from "react";

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
  const inputSelectID = useId();

  return (
    <label htmlFor={inputSelectID} className="flex items-center">
      <select
        id={inputSelectID}
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
