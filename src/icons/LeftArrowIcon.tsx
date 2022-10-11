import * as React from "react"

interface Props {
  className: string;
}

export const LeftArrowIcon = ({ className }: Props) => (
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
        d="M16.243 6.343L14.83 4.93 7.758 12l7.07 7.071 1.415-1.414L10.586 12l5.657-5.657z"
        clipRule="evenodd"
      ></path>
  </svg>
);
