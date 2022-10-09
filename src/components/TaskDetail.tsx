import { TaskInfoBlock } from "../components/TaskInfoBlock";
import { UploadedCard } from "../components/UploadedCard";
import { NewUploadedCard } from "../components/NewUploadedCard";
import { CommentBox } from "../components/CommentBox";
import { NewCommentBox } from "../components/NewCommentBox";


interface TaskDetailProps {
}

const TaskDetail = ({}: TaskDetailProps) => {
  return (
    <>
    <div className={`flex items-center flex-col w-190 h-auto gap-5 border-solid border-2 rounded-2xl `}> 
    <div className={`flex`}><TaskInfoBlock TaskID={0} TaskName={""} Assignee={[]} /></div>
    <div className={`flex mt-10`}><UploadedCard /></div>
    <div className={`flex`}><NewUploadedCard /></div>
    <div className={`flex  mt-10`}><CommentBox CommentDate={""} /></div>
    <div className={`flex`}><NewCommentBox /></div>

    </div>
    </>



  );
};

export { TaskDetail };
