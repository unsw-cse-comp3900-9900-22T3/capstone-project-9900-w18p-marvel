import { useEffect, useState } from "react";



interface Props {
  disabled: boolean;
  placeholder?: string
  onChange?: (val: string) => void;
  onComplete?: (val: string) => void;
  defaultValue?: string;
  defaultFocus?: boolean;
  fontWeight?: string;
  MaxCharacter?: number;
  boxheight?: number;
}
// placeholder='',
export const TextInput_forDes = ({
  disabled,
  onChange,
  onComplete,
  defaultValue,
  defaultFocus,
  placeholder,
  MaxCharacter,
  boxheight,
  fontWeight = "font-medium"
}: Props) => {
  const [focus, setFocus] = useState<boolean>(defaultFocus || false);
  const [value, setValue] = useState<string>(defaultValue || "");
  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);
  return (
    <form
      className={`transition-all w-full h-68 rounded-2xl
      ${focus && !disabled ? "bg-white-5 px-6 break-all" : "px-2"} py-3  ${!disabled ? "hover:bg-white-5" : ""
        } flex flex-row gap-4 items-center font-inherit text-inherit`}
      onFocus={() => {
        if (!disabled) setFocus(true);
      }} //focus 鼠标移上去点击事件
      onBlur={() => {
        if (!disabled) setFocus(false);
      }}
    >
      <textarea
        disabled={disabled} //{}代表变量
        style={{ border: "" }}
        height={boxheight}

        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        className={`grow text-sm word-wrap  ${fontWeight} ${value.length > 0 ? "text-inherit" : "text-gray-100"
          }`
        }
        value={value}
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="opacity-0 w-0 h-0"
        onClick={(e) => {
          e.preventDefault();
          onComplete?.(value);
          if (!disabled) setFocus(false);
        }}
      ></button>
    </form>
  );
};
