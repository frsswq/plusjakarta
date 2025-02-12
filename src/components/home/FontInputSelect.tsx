import { CaretDownIcon } from "@radix-ui/react-icons";
import { type FontInputSelectProps } from "../../types/commonProps";

export default function InputSelect({
  label,
  defaultValue,
  arrowIndicator = true,
  handleChange,
  children,
}: FontInputSelectProps) {
  return (
    <label className="flex items-center">
      <span className="sr-only">{label}</span>
      <div className="relative">
        <select
          className="appearance-none bg-transparent pr-4 text-sm font-medium focus:outline-none"
          onChange={handleChange}
          defaultValue={defaultValue}
        >
          {children}
        </select>
        {arrowIndicator && (
          <CaretDownIcon
            className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2"
            aria-hidden
          />
        )}
      </div>
    </label>
  );
}
