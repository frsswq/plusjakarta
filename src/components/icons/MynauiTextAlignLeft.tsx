import { type SVGProps } from "react";

export function MynauiTextAlignLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.5 6h15m-15 4h10m-10 4h15m-15 4h10"
      >
      </path>
    </svg>
  );
}
