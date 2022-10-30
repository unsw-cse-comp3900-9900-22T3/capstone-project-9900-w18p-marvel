import { useEffect, useRef, useState } from "react"
import { LogoutIcon } from "../icons/LogoutIcon";
import { Avatar } from "./Avatar";
import { Button } from "./Button";

interface Props{
    photoURL?:string
    onClickLogout?:()=>void
    onClickProfile?:()=>void
}

export const ProfileEntry = ({photoURL,onClickLogout,onClickProfile}:Props)=>{
    const [open,setOpen] = useState<boolean>(false)
    const wrapperRef = useRef(null);
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event:any) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          console.log("click outside")
          setOpen(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [wrapperRef]);
    return (
      <div className="relative" ref={wrapperRef}>
        <div >
          <Avatar
            size={"lg"}
            rounded={"full"}
            src={photoURL || ""}
            onClick={() => {
              setOpen(true);
            }}
          ></Avatar>
        </div>
        <div
          className={`z-50 transition-all rounded-2xl absolute bg-white-100 drop-shadow-2xl flex flex-col justify-center items-start w-24 ${
            open ? "h-fit py-2" : "h-0"
          }  top-14 -right-4  overflow-hidden`}
        >
          <Button
            theme={"transparent"}
            size={"fill"}
            label={"Profile"}
            rounded={"none"}
            onClick={() => {
              onClickProfile?.();
              setOpen(false);
            }}
          />
          <Button
            theme={"transparent"}
            size={"fill"}
            label={"Logout"}
            rounded={"none"}
            onClick={() => {
              onClickLogout?.();
              setOpen(false);
            }}
          />
        </div>
      </div>
    );
}