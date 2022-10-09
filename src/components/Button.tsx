type Theme = "blue" | "gray" | "transparent";

type Size = "hug" | "fill";

type Rounded = "none" | "2xl";

const themeDefaultMapping = new Map<Theme, string>([
  ["blue", "bg-blue-100  text-sm text-white-100 font-bold"],
  ["gray", "bg-white-5 text-sm text-black font-bold"],
  ["transparent", "bg-transparent text-sm text-black font-bold hover:bg-white-5"],
]);

const themeHoverMapping = new Map<Theme, string>([
  ["blue", "bg-blue-200 text-sm text-white-100 font-bold"],
  ["gray", "bg-white-10 text-sm text-black font-bold"],
  ["transparent", ""],
]);

interface Props {
  theme: Theme;
  size: Size;
  label: string;
  onClick?: () => void;
  prefix?: JSX.Element;
  rounded?: Rounded;
}

export const Button = ({
  theme,
  size,
  label,
  onClick,
  prefix,
  rounded = "2xl",
}: Props) => {
  return (
    <div
      className={`transition cursor-pointer select-none px-4 py-2 flex flex-row gap-3 justify-center items-center h-10 ${
        size === "hug" ? "w-fit" : "w-full"
      } rounded-${rounded} ${themeDefaultMapping.get(
        theme
      )}`}
      onClick={() => {
        onClick?.();
      }}
    >
      {prefix && prefix}
      <div className={`text-inherit`}>{label}</div>
    </div>
  );
};
