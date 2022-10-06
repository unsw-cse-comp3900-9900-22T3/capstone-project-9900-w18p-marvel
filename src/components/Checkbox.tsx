import { useEffect, useState } from "react"
import check from '/check.svg'

interface CheckboxProps {
    defaultValue:boolean
    onValueChange?:(val:boolean)=>void
}

export const Checkbox = ({defaultValue,onValueChange}:CheckboxProps)=>{
    const [value,setValue] = useState(false)

    useEffect(() => {
      if (defaultValue) {
        setValue(defaultValue);
      }
    }, [defaultValue]);

    return (
      <div
        className={`cursor-pointer select-none flex justify-center items-center w-3 h-3 ${
          value ? "bg-blue-100" : "bg-gray-100"
        } rounded-sm`}
        onClick={() => {
          setValue(!value);
          onValueChange?.(value)
        }}
      >
        {value && <img src={check} />}
      </div>
    );
}
