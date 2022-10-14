import { useState } from "react"

interface Props{
    placeholder?:string
    onChange?:(val:string)=>void
    onComplete?:(val:string)=>void
    defaultValue?:string
}

export const TextInput = ({placeholder='',onChange,onComplete,defaultValue}:Props)=>{
    const [focus,setFocus] = useState<boolean>(false)
    const [value,setValue] = useState<string>(defaultValue || '')
    return (
      <div
        className={`transition-all w-full h-10 rounded-2xl
      ${
        focus ? "bg-white-5 px-6 break-all" : "px-2"
      } py-3  hover:bg-white-5 flex flex-row gap-4 items-center`}
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
      >
          <input
            
            style={{ border: "" }}
            onChange={(e) => {
              setValue(e.target.value);
              onChange?.(e.target.value);
            }}
            className={`grow text-sm font-medium ${
              value.length > 0 ? "text-black" : "text-gray-100"
            }`}
            value={value}
            placeholder={placeholder}
          />
      </div>
    );
}