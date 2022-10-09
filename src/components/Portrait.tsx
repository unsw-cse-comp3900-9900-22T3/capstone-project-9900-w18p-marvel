import { useState } from "react"
import { LogoutIcon } from "../icons/LogoutIcon";
import { Avatar } from "./Avatar";

interface Props{
    onClick?:()=>void
}

export const Portrait = ({onClick}:Props)=>{
    const [hover,setHover] = useState<boolean>(false)

    return (
      <div
        className="relative"
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <Avatar
          size={"lg"}
          rounded={"full"}
          src={""}
          onClick={() => {
            onClick?.();
          }}
        ></Avatar>
        <div className="rounded-full absolute flex justify-center items-center w-full h-full inset-0 pointer-events-none">
          <LogoutIcon
            className={
              `transition ${hover?'text-white-100':' text-transparent'} pointer-events-none`
            }
          ></LogoutIcon>
        </div>
      </div>
    );
}