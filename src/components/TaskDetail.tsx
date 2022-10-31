import { TaskInfoBlock } from "../components/TaskInfoBlock";
import { UploadedCard } from "../components/UploadedCard";
import { NewUploadedCard } from "../components/NewUploadedCard";
import { CommentBox } from "../components/CommentBox";
import { NewCommentBox } from "../components/NewCommentBox";
import { Button } from "./Button";
import { TotalCommentItem } from "./TotalCommentItem";
import { Popup } from "./Popup";
import React, { useEffect, useState } from "react";
import { TextInput } from "./TextInput";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import Dropdownlist_mui from "./Dropdownlist_mui";
import { getUser } from "../api/user";
import { useApp } from "../App";
import { delay } from "../utils/promise";

import { User } from "../api/type";

import { queryComment } from "../api/comment";

import { queryAttachment } from "../api/attachment";
import { getTask } from "../api/task";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getApp } from "firebase/app";

interface TaskDetailProps {
  id: string;
}

//export const TaskDetail = ({ }: TaskDetailProps) => {
//const props = [{ id: "144d3881144d702d618d" }]
export function TaskDetail({ id }: TaskDetailProps) {
  console.log(id);

  const [isEditing, setIsEditing] = useState(true);
  const [inputcomment, setInputComment] = useState<any>({});
  const [inputattachments, setAttachment] = useState<any>({});
  const [taskdetails, setTaskdetails] = useState<any>([]);
  const { user, setUser } = useApp(); //useApp
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  console.log(user?.uid);

  let observer: any = null;
  useEffect(() => {
    setLoading(true);
  }, []);

  const fetchData = async () => {
    const tsk = await getTask(id);
    if (tsk) {
      setInvalid(false);
      handleGetComment();
      handleGetattached();
      handleGetTaskdetails();
    } else {
      setInvalid(true);
      alert("This task you are current viewing might be deleted for some reason just now, redirecting to task board...")
    }
  };

  useEffect(() => {
    fetchData();
    const app = getApp();
    const db = getFirestore(app);
    if (observer) observer();
    const q = doc(db, "tasks", id);
    observer = onSnapshot(q, (querySnapshot: any) => {
      fetchData();
    });
    return () => {
      if (observer) observer();
    };
  }, []);

  const handleGetComment = async () => {
    console.log(id);
    const allcomments = await queryComment(id);
    console.log(allcomments);
    setInputComment(allcomments);
    await delay(2000);
    setLoading(false);
  };

  const handleGetattached = async () => {
    const allattachments = await queryAttachment(id);
    setAttachment(allattachments);
    setLoading(false);
    console.log(allattachments);
  };

  const handleGetTaskdetails = async () => {
    const detailtask = await getTask(id);
    setTaskdetails(detailtask);
    setLoading(false);
    console.log(detailtask);
  };

  return (
    <>
      {!invalid && (
        <div className={`flex items-center w-200 rounded-[32px] bg-white-100 `}>
          <div
            className={`flex justify-items-start flex-col px-12 overflow-auto max-h-[70rem] relative `}
          >
            <div className={`flex h-auto pt-5 absolute`}>
              <Dropdownlist_mui />
            </div>

            <div className={`flex pt-20`}>
              <TaskInfoBlock
                TaskID={taskdetails.id}
                TaskName={taskdetails.title}
                //DueDate={taskdetails.dueDate.toDateString()}
                Description={taskdetails.description}
              ></TaskInfoBlock>
            </div>

            <div className={`flex flex-row w-175 h-auto pl-1 pt-20 pb-5`}>
              <div
                className={`flex font-bold text-lg text-zinc-600 items-center gap-4`}
              >
                <AttachFileOutlinedIcon fontSize="large" />
                Attachment
              </div>
            </div>

            <div className={`flex flex-col gap-4`}>
              {inputattachments?.length > 0 &&
                inputattachments.map(
                  (item: {
                    FilePic: string | undefined;
                    title: string;
                    createdAt: { toDateString: () => string };
                    id: string;
                    resource: { downloadURL: string };
                    Createby: string;
                  }) => (
                    <UploadedCard
                      FilePic={item.FilePic}
                      FileName={item.title}
                      FileAddedTime={item.createdAt.toDateString()}
                      FileID={item.id}
                      FileDownloadLink={item.resource.downloadURL}
                      UploadedBy={item.Createby}
                      handleGetattached={handleGetattached}
                    ></UploadedCard>
                  )
                )}
            </div>

            <div className={`flex pl-2 pt-3`}>
              <NewUploadedCard />
            </div>

            <div className={`justify-items-start pt-20 pb-5`}>
              <TotalCommentItem
                TotalComment={inputcomment.length}
              ></TotalCommentItem>
            </div>

            <div className={`flex w-176 h-auto flex-col gap-4`}>
              {inputcomment?.length > 0 &&
                inputcomment.map(
                  (item: {
                    taskId: string | undefined;
                    id: string | undefined;
                    createdBy: string | undefined;
                    createdAt: { toDateString: () => string | undefined };
                    content: string | undefined;
                  }) => (
                    <CommentBox
                      TaskId={item.taskId}
                      CommentId={item.id}
                      CommentorID={item.createdBy}
                      CommentDate={item.createdAt.toDateString()}
                      Comments={item.content}
                      OwnerID={user?.uid}
                      handleGetComment={handleGetComment}
                    ></CommentBox>
                  )
                )}
            </div>
            <div className={`flex pt-3`}>
              <NewCommentBox TaskId={id} handleGetComment={handleGetComment} />
            </div>
            <div className={`flex pb-5 w-auto items-end`}>
              <Button
                theme={"blue"}
                label={"Create"}
                onClick={() => {}}
                size={"hug"}
              ></Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

//export { TaskDetail };
