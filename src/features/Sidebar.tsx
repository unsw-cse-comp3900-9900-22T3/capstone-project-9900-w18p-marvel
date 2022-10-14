import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardIcon } from "../icons/DashboardIcon";
import { LeftArrowIcon } from "../icons/LeftArrowIcon";
import { ProjectIcon } from "../icons/ProjectIcon";
import { TaskIcon } from "../icons/TaskIcon";

interface MenuItemProps {
  prefix?: JSX.Element;
  label: string;
  onClick?: () => void;
}

const MenuItem = ({ prefix, label, onClick }: MenuItemProps) => {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <div
      className={`w-full h-14 flex fle-row gap-5 cursor-pointer items-center select-none`}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={() => {
        onClick?.();
      }}
    >
      <div
        className={`transition-all ${hover ? "w-1" : "w-0"} h-8 rounded-r-2xl ${
          hover ? "bg-blue-100" : "bg-transparent"
        }`}
      ></div>
      <div
        className={`flex flex-row gap-4 text-sm ${
          hover ? "text-blue-100" : "text-black"
        } `}
      >
        <div
          className={`${hover ? "text-blue-100" : "text-white-60"} font-bold`}
        >
          {prefix && prefix}
        </div>
        <div className="text-inherit font-bold">{label}</div>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [collapse, setCollpase] = useState<boolean>(false);
  const menuItems = [];
  const navigate = useNavigate();
  return (
    <div
      className={`relative transition-all overflow-hidden flex flex-col ${
        collapse ? "w-16 basis-16" : "w-56 basis-56"
      } bg-white-100 h-full`}
    >
      <div className="absolute top-3 left-8">
        <img src="/brand.png" className="w-16 h-16"/>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full flex justify-end items-center">
          <div className="pointer-events-auto"
            onClick={() => {
              setCollpase(!collapse);
            }}
          >
            <LeftArrowIcon className={""} />
          </div>
        </div>
      </div>
      <div className="pt-36">
        <MenuItem
          prefix={<ProjectIcon className={""} />}
          label={"projects"}
          onClick={() => {
            navigate("/projects");
          }}
        ></MenuItem>
        <MenuItem
          prefix={<DashboardIcon className={""} />}
          label={"Profile"}
          onClick={() => {
            navigate("/profile");
          }}
        ></MenuItem>
        <MenuItem
          prefix={<TaskIcon className={""} />}
          label={"Tasks"}
          onClick={() => {
            navigate("/tasks");
          }}
        ></MenuItem>
         <MenuItem
          prefix={<TaskIcon className={""} />}
          label={"API"}
          onClick={() => {
            navigate("/api");
          }}
        ></MenuItem>
      </div>
    </div>
  );
};
