import type { SVGProps } from "react";

export function AddTask(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 1h10v2h4v9h-2V5h-2v2H7V5H5v16h7v2H3V3h4zm2 4h6V3H9zm11 9v4h4v2h-4v4h-2v-4h-4v-2h4v-4z"
      ></path>
    </svg>
  );
}
