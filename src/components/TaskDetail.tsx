import { TaskInfoBlock } from "../components/TaskInfoBlock";
import { DescriptionBox } from "../components/DescriptionBox";
import { UploadedCard } from "../components/UploadedCard";
import { NewUploadedCard } from "../components/NewUploadedCard";
import { CommentBox } from "../components/CommentBox";
import { NewCommentBox } from "../components/NewCommentBox";


interface TaskDetailProps {
}


const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"

const TaskDetail = ({}: TaskDetailProps) => {
  return (
    <>
    <div className={`flex items-center flex-col w-190 h-auto gap-5 border-solid border-2 rounded-2xl `}> 
    <div className={`flex`}><TaskInfoBlock TaskID={12345} TaskName={"Marvel Task Management"} Assignee={[]} DueDate={"22/02/2023"} /></div>
    <div className={`flex`}><DescriptionBox Description={"This is the test!"} /></div>
    <div className={`flex mt-10`}><UploadedCard FilePic={""} FileName={"Marvel Porject"} FileAddedTime={"10/10/2022"} /></div>
    <div className={`flex`}><NewUploadedCard /></div>
    <div className={`flex  mt-10`}><CommentBox CommentDate={"10/08/2022"} TotalComment={1} Name={"Linda Hsu"} Avator={""} Comments={"Hi Could you provide me the link of data?"} /></div>
    <div className={`flex`}><NewCommentBox Avator={img_address} /></div>

    </div>
    </>



  );
};

export { TaskDetail };
