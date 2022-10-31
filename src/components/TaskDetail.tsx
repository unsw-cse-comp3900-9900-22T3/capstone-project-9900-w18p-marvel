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
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import Dropdownlist_mui from "./Dropdownlist_mui";
import { getUser } from "../api/user";
import { useApp } from "../App";
import { delay } from "../utils/promise";

import { User } from "../api/type";


import {
  queryComment
} from "../api/comment";


import {
  queryAttachment
} from "../api/attachment";




interface TaskDetailProps {
  id: string;

}


const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"
const CommenterAvator = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"
const desc = "This is the test!!!Currently, no matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in school, company, etc, people usually need to work as a team for the final assignment, product manufacturing, or software development. It will be very complicated if the group is very large, or the big project is divided into various small teams. Such as if the company wants to build new products, they need to have several teams, one for design, one for manufacture, one for testing, etc. If there is no well- structured system to manage the task, the products might be missing some critical parts, causing some severe issues and failing the project."
const uploadedcardpic = "https://icons.veryicon.com/png/o/miscellaneous/real-cool/live-cool-background-picture-upload.png"
const uplodaicon = "https://cdn-icons-png.flaticon.com/128/1702/1702912.png"


//export const TaskDetail = ({ }: TaskDetailProps) => {
//const props = [{ id: "144d3881144d702d618d" }]
export function TaskDetail({
  id
}: TaskDetailProps) {
  console.log(id)

  const [isEditing, setIsEditing] = useState(true);
  const [inputcomment, setInputComment] = useState({});
  const [inputattachments, setAttachment] = useState({});
  const { user, setUser } = useApp(); //useApp
  const [loading, setLoading] = useState(false);
  console.log(user?.uid);


  useEffect(() => {
    setLoading(true);
  }, []);


  useEffect(() => {
    handleGetComment();
    handleGetattached();
  }, []);




  const handleGetComment = async () => {
    console.log(id);
    const allcomments = await queryComment(id);
    console.log(allcomments)
    setInputComment(allcomments)
    await delay(2000)
    setLoading(false)


  }



  const handleGetattached = async () => {

    const allattachments = await queryAttachment(id);
    setAttachment(allattachments)
    setLoading(false)
    console.log(allattachments)


  }


  const TaskDetail = [
    { TaskID: 1234, TaskName: "Marvel Task Management", Assignee: [{ name: "Lisa", AssigneePic: img_address }, { name: "Lisa2", AssigneePic: img_address }, { name: "Lisa2", AssigneePic: img_address }, { name: "Lisa2", AssigneePic: img_address }, { name: "Lisa2", AssigneePic: img_address }, { name: "Lisa2", AssigneePic: img_address }], DueDate: "22/02/2023", Description: "123kwnflkwfnlkwnfklwnflwln" }
  ]







  return (
    <>

      <div className={`flex items-center w-200 rounded-[32px] bg-white-100 `}>
        <div className={`flex justify-items-start flex-col px-12 overflow-auto max-h-[70rem] relative `}>
          <div className={`flex h-auto pt-5 absolute`}>
            <Dropdownlist_mui />

          </div>

          <div className={`flex pt-20`}>
            {TaskDetail.map((item) => (
              <TaskInfoBlock
                TaskID={item.id}
                TaskName={item.TaskName}
                Assignee={item.Assignee}
                DueDate={item.DueDate}
                Description={item.Description} />
            ))}
          </div>



          <div className={`flex flex-row w-175 h-auto pl-1 pt-20 pb-5`}>
            <div className={`flex font-bold text-lg text-zinc-600 items-center gap-4`}>
              <AttachFileOutlinedIcon fontSize="large" />Attachment
            </div>
          </div>

          <div className={`flex flex-col gap-4`}>

            {inputattachments?.length > 0 && inputattachments.map((item) => (

              < UploadedCard
                FilePic={item.FilePic}
                FileName={item.title}
                FileAddedTime={item.createdAt.toDateString()}
                FileID={item.id}
                FileDownloadLink={item.resource.downloadURL}
                UploadedBy={item.Createby}
                handleGetattached={handleGetattached}
              >
              </UploadedCard>

            ))}

          </div>


          <div className={`flex pl-2 pt-3`}><NewUploadedCard /></div>

          <div className={`justify-items-start pt-20 pb-5`}>
            <TotalCommentItem TotalComment={inputcomment.length}></TotalCommentItem>
          </div>

          <div className={`flex w-176 h-auto flex-col gap-4`}>

            {inputcomment?.length > 0 && inputcomment.map((item) => (

              < CommentBox
                TaskId={item.taskId}
                CommentId={item.id}
                CommentorID={item.createdBy}
                CommentDate={item.createdAt.toDateString()}
                Comments={item.content}
                OwnerID={user?.uid}
                handleGetComment={handleGetComment}

              >
              </CommentBox>

            ))}

          </div>
          <div className={`flex pt-3`}><NewCommentBox TaskId={id} handleGetComment={handleGetComment} /></div>
          <div className={`flex pb-5 w-auto items-end`}>
            <Button
              theme={"blue"}
              label={"Create"}
              onClick={() => {
              }}
              size={"hug"}
            ></Button>
          </div>
        </div>

      </div>

    </>



  );
};
<TaskDetail />
//export { TaskDetail };
