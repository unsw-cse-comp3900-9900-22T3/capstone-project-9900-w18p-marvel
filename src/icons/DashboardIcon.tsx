import * as React from "react"

interface Props {
  className: string;
}

export const DashboardIcon = ({ className }: Props) => (
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
        d="M7 3a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zm10-2a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4zm-6 12a4 4 0 10-8 0 4 4 0 008 0zm-6 0a2 2 0 114 0 2 2 0 01-4 0zm12-4a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z"
        clipRule="evenodd"
      ></path>
  </svg>
);
