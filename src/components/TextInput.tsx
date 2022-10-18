import { useEffect, useState } from "react"

interface Props {
  disabled: boolean
  placeholder?: string
  onChange?: (val: string) => void
  onComplete?: (val: string) => void
  defaultValue?: string
}
//placeholder='',
export const TextInput = ({ disabled, onChange, onComplete, defaultValue, placeholder }: Props) => {
  const [focus, setFocus] = useState<boolean>(false)
  const [value, setValue] = useState<string>(defaultValue || '')
  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);
  return (
    <div
      className={`transition-all w-full h-auto rounded-2xl
      ${focus && !disabled ? "bg-white-5 px-6 break-all" : "px-2"
        } py-3  ${!disabled ? "hover:bg-white-5" : ""} flex flex-row gap-4 items-center`}
      onFocus={() => {
        if (!disabled) setFocus(true);
      }}//focus 鼠标移上去点击事件
      onBlur={() => {
        if (!disabled) setFocus(false);
      }}
    >
      <input
        disabled={disabled}//{}代表变量
        style={{ border: "" }}
        onChange={(e) => {
          setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        className={`grow text-sm font-medium ${value.length > 0 ? "text-black" : "text-gray-100"
          }`}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
}