type Theme = 
| 'blue'
| 'gray'

type Size = 
| 'hug'
| 'fill'

const themeDefaultMapping = new Map<Theme,string>([
    ['blue','bg-blue-100  text-sm text-white-100 font-bold'],
    ['gray','bg-white-5 text-sm text-black font-bold']
])

const themeHoverMapping = new Map<Theme,string>([
    ['blue','bg-blue-200 text-sm text-white-100 font-bold'],
    ['gray','bg-white-10 text-sm text-black font-bold']
])




interface Props {
  theme: Theme;
  size:Size
  label: string;
  onClick?: () => void;
  prefix?: JSX.Element;
}

export const Button = ({ theme,size, label, onClick,prefix }: Props) => {
  return (
    <div
      className={`transition cursor-pointer select-none px-4 py-2 flex flex-row gap-3 justify-center items-center h-10 ${
        size === "hug" ? "w-fit" : "w-full"
      } rounded-2xl ${themeDefaultMapping.get(theme)} hover:brightness-90`}
      onClick={() => {
        onClick?.();
      }}
    >
      {prefix && prefix}
      <div className={`text-inherit`}>{label}</div>
    </div>
  );
};