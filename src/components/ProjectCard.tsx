import { create } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../api/type";
import { getUser } from "../api/user";
import { Button } from "./Button";

interface Props {
  id: string;
  src: string;
  title: string;
  createdBy: string;
  onClick: (id: string) => void;
}

export const ProjectCard = ({ id, src, title, createdBy, onClick }: Props) => {
  const [owner, setOwner] = useState<User>();

  const getOwner = async (userId: string) => {
    const user = await getUser(userId);
    if (user) {
      setOwner(user);
    }
  };

  useEffect(() => {
    getOwner(createdBy);
  }, [createdBy]);

  return (
    <div
      onClick={() => {
        onClick?.(id);
      }}
      className="transition-all hover:scale-95 flex flex-col justify-start w-64 h-fit items-center gap-4 p-4 pb-6 bg-white-100 rounded-2xl"
    >
      <div className="w-full h-40 overflow-hidden">
        <img src={src === "" ? "/cover.png" : src} className="" />
      </div>
      <div className="w-full pl-2 flex flex-col justify-start bg-white-100">
        <div className="text-base font-bold">{title}</div>
        <div className="w-full flex gap-1 text-gray-100 font-normal text-xs">
          <span>Created By - </span>
          <span className="text-black font-bold">{owner?.displayName}</span>
        </div>
      </div>
    </div>
  );
};
