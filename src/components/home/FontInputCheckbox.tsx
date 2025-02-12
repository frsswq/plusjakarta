import { type FontInputCheckboxProps } from "../../types/commonProps";

export default function InputCheckbox({
  label,
  checked,
  value,
  handleChange,
}: FontInputCheckboxProps) {
  return (
    <label className="flex h-fit w-fit items-center">
      <input
        type="checkbox"
        className="peer cursor-pointer appearance-none"
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <span
        className="flex cursor-pointer items-center text-sm font-medium text-gray-500 select-none
          peer-checked:text-black"
      >
        {label}
      </span>
    </label>
  );
}
