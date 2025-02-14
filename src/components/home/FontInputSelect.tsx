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
    <label className="flex items-center border-1 border-zinc-200">
      <span className="sr-only">{label}</span>
      <div className="relative flex items-center">
        <select
          className="peer h-full w-full appearance-none px-3 py-2 pr-50 text-sm tracking-tight
            text-zinc-500 focus-within:text-zinc-800 hover:text-zinc-800 focus:outline-none"
          onChange={handleChange}
          defaultValue={defaultValue}
        >
          {children}
        </select>
        {arrowIndicator && (
          <CaretDownIcon
            className="pointer-events-none absolute top-50/100 right-2.5 -translate-y-1/2 text-zinc-500
              peer-focus-within:text-zinc-800 peer-hover:text-zinc-800"
            aria-hidden
          />
        )}
      </div>
    </label>
  );
}
