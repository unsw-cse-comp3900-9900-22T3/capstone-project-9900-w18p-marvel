import { TaskInfoBlock } from "../components/TaskInfoBlock";
import { DescriptionBox } from "../components/DescriptionBox";
import { UploadedCard } from "../components/UploadedCard";
import { NewUploadedCard } from "../components/NewUploadedCard";
import { CommentBox } from "../components/CommentBox";
import { NewCommentBox } from "../components/NewCommentBox";
import { Button } from "./Button";


interface TaskDetailProps {
}


const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"
const CommenterAvator = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"

const desc = "This is the test!!!Currently, no matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in school, company, etc, people usually need to work as a team for the final assignment, product manufacturing, or software development. It will be very complicated if the group is very large, or the big project is divided into various small teams. Such as if the company wants to build new products, they need to have several teams, one for design, one for manufacture, one for testing, etc. If there is no well- structured system to manage the task, the products might be missing some critical parts, causing some severe issues and failing the project."

const TaskDetail = ({}: TaskDetailProps) => {
  return (
    <>
    <div className={`flex items-center flex-col w-190 h-5/6 overflow-auto gap-5 border-solid border-2 rounded-2xl `}> 
    <div className={`flex`}><TaskInfoBlock TaskID={12345} TaskName={"Marvel Task Management"} Assignee={[]} DueDate={"22/02/2023"} /></div>
    <div className={`flex`}><DescriptionBox Description={desc} /></div>
    <div className={`flex mt-10`}><UploadedCard FilePic={""} FileName={"Marvel Porject"} FileAddedTime={"10/10/2022"} /></div>
    <div className={`flex`}><NewUploadedCard /></div>
    <div className={`flex  mt-10`}><CommentBox CommentDate={"10/08/2022"} TotalComment={1} Name={"Linda Hsu"} CommenterAvator={CommenterAvator} Comments={"Hi Could you provide me the link of data?"} /></div>
    <div className={`flex`}><NewCommentBox MyAvator={img_address} /></div>
    <div className={`flex w-60 mb-5`}>
    <Button
            theme={"blue"}
            label={"Create"}
            onClick={() => {
            }}
            size={"fill"}
          ></Button>
          </div>
    </div>
    </>



  );
};

export { TaskDetail };
