import * as React from "react"

interface Props {
  className: string;
}

export const TaskIcon = ({ className }: Props) => (
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
        d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm2 1v11a1 1 0 001 1h12a1 1 0 001-1V7H5zm2 3a1 1 0 011-1h8a1 1 0 110 2H8a1 1 0 01-1-1z"
        clipRule="evenodd"
      ></path>
  </svg>
);
