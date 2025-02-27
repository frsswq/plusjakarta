import { memo } from "react";
import { type SVGProps } from "react";

const MynauiTextAlignCenter = (props: SVGProps<SVGSVGElement>) => {
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
        d="M4.5 6h15M7 10h10M4.5 14h15M7 18h10"
      />
    </svg>
  );
};

export default memo(MynauiTextAlignCenter);
