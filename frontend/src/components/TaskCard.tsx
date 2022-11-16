import { Avatar, AvatarGroup, LinearProgress } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { faker } from "@faker-js/faker";
import { Chip, Theme } from "./Chip";
import { AttachFile } from "@mui/icons-material";
import moment from "moment";
import { Status, Task, TaskCollaborator } from "../api/type";
import { useEffect, useState } from "react";
import { getUser } from "../api/user";
import { uid } from "uid";
import { queryAttachment } from "../api/attachment";
import {
  query,
  collection,
  where,
  onSnapshot,
  getFirestore,
  doc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { queryCollaboratorsInTask } from "../api/taskcollaborator";
import { getTask } from "../api/task";
import { downloadFile } from "../api/storage";

interface TaskCardProps {
  id: string;
  onClick?: (id: string) => void;
}
const TaskCard = ({ id, onClick }: TaskCardProps) => {
  const [task, setTask] = useState<Task>();
  const [cover, setCover] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>();
  const [timeLeft, setTimeLeft] = useState<string>();
  const [timeTheme, setTimeTheme] = useState<Theme>();
  const [avatars, setAvatars] = useState<Array<string>>([]);
  const [attachmentCount, setAttachmentCount] = useState<number>(0);
  let observer: any = null;

  const fetchData = async (id: string) => {
    const tsk = await getTask(id);
    if (tsk) {
      const collaborators = await queryCollaboratorsInTask(id);
      const uids = collaborators.map((c) => c.userId);
      const list: Array<string> = [];
      await Promise.all(
        uids.map(async (a) => {
          const userInfo = await getUser(a);
          if (userInfo) {
            list.push(userInfo.photo?.downloadURL!);
          } else {
            list.push("");
          }
        })
      );
      setAvatars(list);
      const attachments = await queryAttachment(tsk.id);
      if (attachments) {
        setAttachmentCount(attachments.length);
      }
      setTask(tsk);
      let _timeLeft = "";
      let _timeTheme: Theme = "default";
      const day = moment(tsk.dueDate).diff(moment(), "days");
      if (day <= 0) {
        _timeLeft = "Overdue";
        _timeTheme = "error";
      } else {
        _timeLeft = `${day} days left`;
        if (day > 2) {
          _timeTheme = "default";
        } else {
          _timeTheme = "warning";
        }
      }
      setTimeLeft(_timeLeft);
      setTimeTheme(_timeTheme);
      const _progress =
        tsk.status === "started"
          ? 0
          : tsk.status === "blocked"
          ? 20
          : tsk.status === "complete"
          ? 100
          : 0;
      setProgress(_progress);
      const imgs = attachments.filter(
        (a) =>
          a.fileType.includes("image/png") || a.fileType.includes("image/jpeg")
      );
      if (imgs.length > 0) {
        const url = imgs[0].resource.downloadURL;
        setCover(url);
      }
    }
  };

  useEffect(() => {
    const app = getApp();
    const db = getFirestore(app);
    if (observer) observer();
    const q = doc(db, "tasks", id);
    observer = onSnapshot(q, (querySnapshot: any) => {
      fetchData(id);
    });
    fetchData(id);
    return () => {
      if (observer) observer();
    };
  }, []);

  return (
    <div
      className="transition-all w-80 h-fit bg-white-100 flex flex-col p-6 gap-4 rounded-2xl hover:scale-95"
      onClick={() => {
        onClick?.(id);
      }}
    >
      {cover && cover !== "" && (
        <div className="h-20 w-50 rounded-2xl overflow-hidden flex justify-center items-center">
          <img src={cover} className="" />
        </div>
      )}

      <div className="flex gap-2 items-baseline w-full justify-between">
        <div className="h-2 w-8 bg-blue-100 rounded"></div>
        <span className="text-xs text-gray-200 font-extralight">{id}</span>
      </div>
      <div className="font-bold text-base">{task?.title}</div>
      <div className="font-semibold text-xs">{task?.description}</div>
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
          label={timeLeft || ""}
          theme={timeTheme || "default"}
        />
      </div>
      <LinearProgress variant="determinate" value={progress || 0} />
      <div className="h-fit w-fit">
        {avatars?.length > 0 && (
          <AvatarGroup sx={{ height: 24 }} max={10}>
            {avatars?.map((c) => (
              <Avatar key={uid(4)} sx={{ width: 24, height: 24 }} src={c} />
            ))}
          </AvatarGroup>
        )}
        {avatars?.length === 0 && (
          <span className="text-gray-100 text-sm font-normal">
            No collaborators in this task
          </span>
        )}
      </div>
    </div>
  );
};

export { TaskCard };
