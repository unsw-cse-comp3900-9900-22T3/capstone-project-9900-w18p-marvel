import { useState } from "react";
import { DashboardIcon } from "../icons/DashboardIcon";
import { ProjectIcon } from "../icons/ProjectIcon";

interface MenuItemProps {
    prefix?:JSX.Element
    label:string
}

const MenuItem = ({prefix,label}:MenuItemProps)=>{
    const [hover,setHover] = useState<boolean>(false)
    return (
      <div
        className={`w-full h-14 flex fle-row gap-5 cursor-pointer items-center select-none`}
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
            setHover(false);
          }}
      >
        <div className={`transition-all ${hover?'w-1':'w-0'} h-8 rounded-r-2xl ${hover?'bg-blue-100':'bg-transparent'}`}></div>
        <div className={`flex flex-row gap-4 ${hover?'text-blue-100':'text-black'} `}>
          <div className={`${hover?'text-blue-100':'text-white-60'} font-bold`}>{prefix && prefix}</div>
          <div className="text-inherit font-bold">{label}</div>
        </div>
      </div>
    );
}

export const Sidebar = ()=>{
    const [collapse, setCollpase] = useState<boolean>(false);
    const menuItems = []
    return (
      <div
        className={`transition-all overflow-hidden flex flex-col ${
          collapse ? "w-14" : "w-60"
        } bg-white-100 h-full py-36`}
        onClick={() => {
            setCollpase(!collapse);
          }}
      >
        <MenuItem
          prefix={<ProjectIcon className={""} />}
          label={"Project"}
        ></MenuItem>
        <MenuItem
          prefix={<DashboardIcon className={""} />}
          label={"Profile"}
        ></MenuItem>
      </div>
    );
}