import { TaskInfoBlock } from "../components/TaskInfoBlock";
import { UploadedCard } from "../components/UploadedCard";
import { NewUploadedCard } from "../components/NewUploadedCard";
import { CommentBox } from "../components/CommentBox";
import { NewCommentBox } from "../components/NewCommentBox";
import Box from "@mui/material/Box";
import { TotalCommentItem } from "./TotalCommentItem";
import React, { useEffect, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { getUser } from "../api/user";
import { useApp } from "../App";
import { Popup } from "./Popup";
import { delay } from "../utils/promise";
import Button from '@mui/material/Button';

import { Status, User } from "../api/type";

import { queryComment } from "../api/comment";

import { queryAttachment } from "../api/attachment";
import { deleteTask, getTask, updateTask, completeTask } from "../api/task";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getApp } from "firebase/app";
import TSelect from "./TSelect";
import { TotalAttachedItem } from "./TotalAttachedItem";

import { Grade } from "./Grade"

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
  const { user, setUser, role, setRole, snackbarOpen, setSnackbarOpen, snackbarText, setSnackbarText } = useApp(); //useApp
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState<boolean>(false);
  console.log(user?.uid);

  const [gradeOpen, setgradeOpen] = useState<boolean>(false)



  const handleGetattached = async () => {
    const allattachments = await queryAttachment(id);
    setAttachment(allattachments);
    await delay(2000);
    setLoading(true);
    console.log(allattachments);

  };

  let observer: any = null;
  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const fetchData = async () => {
    const tsk = await getTask(id);
    if (tsk) {
      setInvalid(false);
      handleGetComment();
      handleGetattached();
      handleGetTaskdetails();

    } else {
      setInvalid(true);
      setSnackbarText("This task you are current viewing might be deleted for some reason just now, redirecting to task board...")
      setSnackbarOpen(true)
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



  const handleGetTaskdetails = async () => {
    const detailtask = await getTask(id);
    setTaskdetails(detailtask);
    setLoading(false);
    console.log(detailtask);
  };


  console.log(inputattachments);
  return (
    <>
      {!invalid && (
        <div className={`flex items-center w-200 rounded-[32px] bg-white-100 `}>



          <div
            className={`flex justify-items-start flex-col px-12 overflow-auto max-h-[70rem] relative `}
          >
            <div className={`flex flex-row justify-between`}>
              <div className={`flex pt-5`}>
                <TSelect
                  defaultValue={taskdetails.status ? taskdetails.status as Status : "Not Started" as Status}
                  onChange={(val) => {
                    console.log(taskdetails.status)
                    if (val === "Completed") {
                      console.log('jjjj')
                      updateTask(id, null, val as Status, null, null, null,
                        null, null);
                      completeTask(id);

                    }
                    else {
                      updateTask(id, null, val as Status, null, null, null,
                        null, null);
                    }

                  }}
                  values={["Not Started", "In Progress", "Blocked", "Completed"]}
                />

              </div>

              <div className={`flex h-auto pt-5`}>

                <div onClick={() => { setgradeOpen(true); }} className={`mr-5`}><Button variant="contained" >Grade The Task!</Button></div>


                <Box
                  className={`hover:bg-slate-300 text-slate-500 rounded-[14px] h-6 mt-1`}
                >
                  <DeleteOutlinedIcon
                    onClick={() => {
                      deleteTask(id);
                    }}
                  />
                </Box>
              </div>
            </div>
            <div className={`flex pt-10`}>
              <TaskInfoBlock
                TaskID={taskdetails.id}
                TaskName={taskdetails.title}
                DueDate={taskdetails?.dueDate?.toDateString()}
                Description={taskdetails.description}
                ProjectId={taskdetails.projectId}
                UserRole={role}
              ></TaskInfoBlock>
            </div>

            <div className={`justify-items-start pt-20 pb-5`}>
              <TotalAttachedItem
                TotalAttached={inputattachments.length}
              ></TotalAttachedItem>
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
                    createdBy: string;
                  }) => (
                    <UploadedCard
                      FilePic={item.FilePic}
                      FileName={item.title}
                      FileAddedTime={item.createdAt.toDateString()}
                      FileID={item.id}
                      FileDownloadLink={item.resource.downloadURL}
                      UploadedBy={item.createdBy}
                      handleGetattached={handleGetattached}
                    ></UploadedCard>
                  )
                )}
            </div>

            <div className={`flex pl-2 pt-3`}>
              <NewUploadedCard TaskId={id} handleGetattached={handleGetattached} />
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
                    taskId: string;
                    id: string;
                    createdBy: string;
                    createdAt: { toDateString: () => string };
                    content: string;
                  }) => (
                    <CommentBox
                      TaskId={item.taskId}
                      CommentId={item.id}
                      CommentorID={item.createdBy}
                      CommentDate={item.createdAt.toDateString()}
                      Comments={item.content}
                      OwnerId={user?.uid}
                      handleGetComment={handleGetComment}
                    ></CommentBox>
                  )
                )}
            </div>
            <div className={`flex pt-3`}>
              <NewCommentBox TaskId={id} handleGetComment={handleGetComment} />
            </div>

          </div>
        </div>
      )
      }


      <Popup
        open={gradeOpen}
        onClose={() => {
          setgradeOpen(false);
        }}
      >

        <Grade
          id={id}
          onComplete={() => {
            setgradeOpen(false);
          }}
        />
      </Popup>
    </>
  );
}

function TaskID(
  TaskID: any,
  arg1: null,
  val: string,
  arg3: null,
  arg4: null,
  arg5: null
) {
  throw new Error("Function not implemented.");
}
