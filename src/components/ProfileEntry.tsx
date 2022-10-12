import { useState } from "react"
import { LogoutIcon } from "../icons/LogoutIcon";
import { Avatar } from "./Avatar";
import { Button } from "./Button";

interface Props{
    onClickLogout?:()=>void
    onClickProfile?:()=>void
}

export const ProfileEntry = ({onClickLogout,onClickProfile}:Props)=>{
    const [open,setOpen] = useState<boolean>(false)

    return (
      <div className="relative">
        <Avatar
          size={"lg"}
          rounded={"full"}
          src={""}
          onClick={() => {
            setOpen(!open)
          }}
        ></Avatar>
        <div
          className={`transition-all rounded-2xl absolute bg-white-100 drop-shadow-2xl flex flex-col justify-center items-start w-24 ${
            open ? "h-fit py-2" : "h-0"
          }  top-14 -right-4  overflow-hidden`}
        >
          <Button
            theme={"transparent"}
            size={"fill"}
            label={"Profile"}
            rounded={"none"}
            onClick={()=>{
              onClickProfile?.()
              setOpen(false)
            }}
            />
          <Button
            theme={"transparent"}
            size={"fill"}
            label={"Logout"}
            rounded={"none"}
            onClick={()=>{
              onClickLogout?.();
              setOpen(false)
            }}
          />
        </div>
      </div>
    );
}