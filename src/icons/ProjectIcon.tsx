import * as React from "react"

interface Props {
  className: string;
}

export const ProjectIcon = ({ className }: Props) => (
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
      d="M5 1a4 4 0 00-4 4v14a4 4 0 004 4h14a4 4 0 004-4V5a4 4 0 00-4-4H5zm14 2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM6 12.071l4.243 4.243 7.07-7.071L15.9 7.828l-5.657 5.657-2.829-2.828L6 12.07z"
      clipRule="evenodd"
    ></path>
  </svg>
);
