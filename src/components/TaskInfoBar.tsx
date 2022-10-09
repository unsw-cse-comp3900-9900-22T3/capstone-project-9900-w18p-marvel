import { useEffect, useState } from "react"
import check from '/check.svg'

interface TaskInfoBarProps {
    defaultcomplete:boolean
    onValueChange?:(val:boolean)=>void

  }
  


  
export const Checkbox = ({defaultcomplete,onValueChange}:TaskInfoBarProps)=>{

    const [complete,setComplete] = useState(false)

    useEffect(() => {
    if (defaultcomplete) {
        setComplete(defaultcomplete);
    }
    }, [defaultcomplete]);
    return(

        <div
        className={`cursor-pointer select-none flex justify-center items-center w-3 h-3 ${
            complete? "bg-blue-100" : "bg-white-10"
        } rounded-sm`}
        onClick={() => {
            setComplete(!complete);
          onValueChange?.(complete)
        }}
      >
        {complete && <img src={check} />}
      </div>

      );
    }
  

  