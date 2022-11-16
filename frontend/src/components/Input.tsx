import React, { useCallback } from "react"
import { useState } from "react"
import { EyeIcon } from "../icons/EyeIcon"

type InputType =
|'text'
|'password'
|'search'

interface Props{
    type:InputType
    placeholder?:string
    onChange?:(val:string)=>void
    onComplete?:(val:string)=>void
    defaultValue?:string
}

export const Input = ({type,placeholder='',onChange,onComplete,defaultValue}:Props)=>{
    const [focus,setFocus] = useState<boolean>(false)
    const [value,setValue] = useState<string>(defaultValue || '')
    const [hidePassword,setHidePassword] = useState<boolean>(true)

    const getType = useCallback(() => {
      if (value.length > 0 && hidePassword && type === "password") {
        return "password";
      } else {
        return "text";
      }
    }, [value, focus, hidePassword]);


    return (
      <div
        className={`transition w-full h-12 rounded-2xl
          hover:bg-white-10 bg-white-5
         px-6 py-3   flex flex-row gap-4 items-center`}
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
          type={getType()}
          className={`grow text-sm font-medium ${
            value.length > 0 ? "text-black" : "text-gray-100"
          }`}
          value={value}
          placeholder={placeholder}
        />
        {type === "password" && (
          <div
            className="cursor-pointer basis-6"
            onClick={() => {
              setHidePassword(!hidePassword);
            }}
          >
            <EyeIcon
              className={`w-6 h-6 ${
                hidePassword ? "text-gray-100" : "text-white-10"
              }`}
            />
          </div>
        )}
      </div>
    );
}