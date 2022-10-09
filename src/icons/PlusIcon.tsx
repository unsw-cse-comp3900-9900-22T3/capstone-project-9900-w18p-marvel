import * as React from "react"

interface Props {
  className: string;
}

export const PlusIcon = ({ className }: Props) => (
  <svg
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 4a1 1 0 00-1 1v6H5a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2h-6V5a1 1 0 00-1-1z"
        clipRule="evenodd"
      ></path>
  </svg>
);
