import * as React from "react"

interface Props {
  className: string;
}

export const TimeIcon = ({ className }: Props) => (
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
      d="M8 14.667A6.667 6.667 0 108 1.333a6.667 6.667 0 000 13.334zm0-1.334A5.333 5.333 0 108 2.667a5.333 5.333 0 000 10.666zm.667-6V4.667H7.333v4h3.334V7.333h-2z"
      clipRule="evenodd"
    ></path>
  </svg>
);
