import * as React from "react"

interface Props {
  className: string;
}

export const AttachmentIcon = ({ className }: Props) => (
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
      d="M9.333 0a3.333 3.333 0 013.334 3.333v8a4.667 4.667 0 11-9.334 0V6h1.334v5.333a3.333 3.333 0 106.666 0v-8a2 2 0 10-4 0v8a.667.667 0 101.334 0V4H10v7.333a2 2 0 11-4 0v-8A3.333 3.333 0 019.333 0z"
      clipRule="evenodd"
    ></path>
  </svg>
);
