import { Avatar, AvatarGroup, LinearProgress } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { faker } from "@faker-js/faker";
import { Chip, Theme } from "./Chip";
import { AttachFile } from "@mui/icons-material";
import moment from "moment";
import { Status, TaskCollaborator } from "../api/type";
import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import { uid } from "uid";
import { queryAttachment } from "../api/attachment";

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  image?: string;
  status?: Status;
  collaborators: Array<TaskCollaborator>;
  onClick?: (id: string) => void;
}
const TaskCard = ({
  id,
  image,
  title,
  description,
  dueDate,
  status,
  collaborators,
  onClick,
}: TaskCardProps) => {
  let timeLeft = "";
  let timeTheme: Theme = "default";
  const day = moment(dueDate).diff(moment(), "days");
  if (day <= 0) {
    timeLeft = "Overdue";
    timeTheme = "error";
  } else {
    timeLeft = `${day} days left`;
    if (day > 2) {
      timeTheme = "default";
    } else {
      timeTheme = "warning";
    }
  }
  const progress =
    status === "start"
      ? 0
      : status === "blocked"
        ? 20
        : status === "complete"
          ? 100
          : 0;

  const [avatars, setAvatars] = useState<Array<string>>();
  const [attachmentCount, setAttachmentCount] = useState<number>(0);
  const getAvatars = async (_avatars: Array<string>) => {
    const list: Array<string> = [];
    await Promise.all(
      _avatars.map(async (a) => {
        const userInfo = await getUser(a);
        if (userInfo) {
          list.push(userInfo.photo?.downloadURL!);
        } else {
          list.push("");
        }
      })
    );

    setAvatars(list);
  };
  const getAttachmentCount = async (taskId: string) => {
    const attachments = await queryAttachment(taskId);
    if (attachments) {
      setAttachmentCount(attachments.length);
    }
  };

  useEffect(() => {
    if (collaborators?.length > 0) {
      const uids = collaborators.map((item) => item.userId);
      getAvatars(uids);
    }
  }, [collaborators]);

  useEffect(() => {
    getAttachmentCount(id);
  }, []);

  return (
    <div
      className="transition-all w-80 h-fit bg-white-100 flex flex-col p-6 gap-4 rounded-2xl hover:scale-95"
      onClick={() => {
        onClick?.(id);
      }}
    >
      {image && image !== "" && (
        <div className="h-20 w-50 rounded-2xl overflow-hidden flex justify-center items-center">
          <img src={image} className="" />
        </div>
      )}

      <div className="flex gap-2 items-baseline w-full justify-between">
        <div className="h-2 w-8 bg-blue-100 rounded"></div>
        <span className="text-xs text-gray-200 font-extralight">{id}</span>
      </div>
      <div className="font-bold text-base">{title}</div>
      <div className="font-semibold text-xs">{description}</div>
      <div className="h-fit w-fit flex flex-row gap-4">
        <Chip
          icon={
            <AttachFile
              sx={{ width: "16px", height: "16px", textColor: "inherit" }}
            />
          }
          label={attachmentCount.toString()}
          theme="default"
        />
        <Chip
          icon={
            <AccessTimeIcon
              sx={{ width: "16px", height: "16px", textColor: "inherit" }}
            />
          }
          label={timeLeft}
          theme={timeTheme}
        />
      </div>
      <LinearProgress variant="determinate" value={progress} />
      <div className="h-fit w-fit">
        {collaborators?.length > 0 && (
          <AvatarGroup sx={{ height: 24 }} max={10}>
            {avatars?.map((c) => (
              <Avatar key={uid(4)} sx={{ width: 24, height: 24 }} src={c} />
            ))}
          </AvatarGroup>
        )}
        {collaborators?.length === 0 && (
          <span className="text-gray-100 text-sm font-normal">
            No collaborators in this task
          </span>
        )}
      </div>
    </div>
  );
};

export { TaskCard };
