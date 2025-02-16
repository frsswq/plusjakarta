import { type FontInputCheckboxProps } from "@/types/commonProps";

export default function InputCheckbox({
  label,
  checked,
  value,
  handleChange,
}: FontInputCheckboxProps) {
  return (
    <label className="flex items-center px-2 py-2">
      <input
        type="checkbox"
        className="peer hidden cursor-pointer appearance-none"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <span
        className="flex cursor-pointer items-center text-sm text-zinc-500 select-none
          peer-checked:text-zinc-800"
      >
        {label}
      </span>
    </label>
  );
}
