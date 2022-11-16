import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../App";
import { Button } from "../components/Button";
import { DashboardIcon } from "../icons/DashboardIcon";
import { LeftArrowIcon } from "../icons/LeftArrowIcon";
import { PlusIcon } from "../icons/PlusIcon";
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
        className={`transition-all ${hover ? "w-1" : "w-0"} h-8 rounded-r-2xl ${hover ? "bg-blue-100" : "bg-transparent"
          }`}
      ></div>
      <div
        className={`flex flex-row gap-4 text-sm ${hover ? "text-blue-100" : "text-black"
          } `}
      >
        <div
          className={`${hover ? "text-blue-100" : "text-white-60"} font-bold`}
        >
          {prefix && prefix}
        </div>
        <div className="text-inherit text-lg font-bold">{label}</div>
      </div>
    </div>
  );
};

interface Props {
  onClickManageMember?: () => void;
}

export const Sidebar = ({ onClickManageMember }: Props) => {
  const [collapse, setCollpase] = useState<boolean>(false);
  const menuItems = [];
  const navigate = useNavigate();
  const { projectId, setProjectId, role, setRole } = useApp();

  useEffect(() => { }, []);

  return (
    <div
      className={`relative transition-all overflow-hidden shrink-0 grow-0 ${collapse ? "w-16 basis-16" : "w-56 basis-56"
        } bg-white-100 h-full `}
    >
      {<div className={`flex flex-col items-center`}>

        <div className="flex text-xl font-extrabold pt-5">

          <img src={"https://live.staticflickr.com/65535/52503382719_0e80264fc9_z.jpg className="} className="w-40 h-20" />
        </div>
      </div>}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full flex justify-end items-center">
          <div
            className="pointer-events-auto"
            onClick={() => {
              setCollpase(!collapse);
            }}
          >
            <LeftArrowIcon className={""} />
          </div>
        </div>
      </div>
      <div className="pt-10 pb-10 w-full h-full flex flex-col  justify-between">
        <div className="w-full">
          <MenuItem
            prefix={<ProjectIcon className={""} />}
            label={"Projects"}
            onClick={() => {
              setProjectId?.(null)
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
          {/* <MenuItem
            prefix={<TaskIcon className={""} />}
            label={"Tasks"}
            onClick={() => {
              navigate("/tasks");
            }}
          ></MenuItem> */}
          {/* <MenuItem
            prefix={<TaskIcon className={""} />}
            label={"API"}
            onClick={() => {
              navigate("/api");
            }}
          ></MenuItem> */}
        </div>
        {projectId && role === "owner" && (
          <div className="px-4 w-full">
            <Button
              theme={"gray"}
              size={"fill"}
              label={"Manage Members"}
              prefix={<PlusIcon className="" />}
              onClick={() => {
                onClickManageMember?.();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
