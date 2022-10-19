import { TaskInfoBlock } from "../components/TaskInfoBlock";
import { UploadedCard } from "../components/UploadedCard";
import { NewUploadedCard } from "../components/NewUploadedCard";
import { CommentBox } from "../components/CommentBox";
import { NewCommentBox } from "../components/NewCommentBox";
import { Button } from "./Button";
import { TotalCommentItem } from "./TotalCommentItem";
import { Popup } from "./Popup";
import { UserList } from "./UserList";
import { useState } from "react";
import { TextInput } from "./TextInput";
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';



interface TaskDetailProps {
}


const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"
const CommenterAvator = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"
const desc = "This is the test!!!Currently, no matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in school, company, etc, people usually need to work as a team for the final assignment, product manufacturing, or software development. It will be very complicated if the group is very large, or the big project is divided into various small teams. Such as if the company wants to build new products, they need to have several teams, one for design, one for manufacture, one for testing, etc. If there is no well- structured system to manage the task, the products might be missing some critical parts, causing some severe issues and failing the project."
const uploadedcardpic = "https://icons.veryicon.com/png/o/miscellaneous/real-cool/live-cool-background-picture-upload.png"
const uplodaicon = "https://cdn-icons-png.flaticon.com/128/1702/1702912.png"


export const TaskDetail = ({ }: TaskDetailProps) => {
  const [isEditing, setIsEditing] = useState(true);
  const [open, setOpen] = useState(false)
  const [inputcomment, setInputComment] = useState("");

  const TaskDetail = [
    { TaskID: 1234, TaskName: "Marvel Task Management", Assignee: "Lisa", DueDate: "22/02/2023", Description: "123kwnflkwfnlkwnfklwnflwln" }
  ]


  const CommentorData = [
    { CommentorID: '1', Name: 'Linda Hsu', CommenterAvator: img_address, Comments: '@11', CommentDate: '10/12/2023' },
    { CommentorID: '2', Name: 'Teddy', CommenterAvator: img_address, Comments: '@113', CommentDate: '10/12/2023' },
    { CommentorID: '3', Name: 'Anthony', CommenterAvator: img_address, Comments: '@1enfcwjenfjwenfjwenfjknwejfnwlejnfljwenfjlnweljfnwlenfljewnfljwenlfnwelfnweljnfjwenfjwnejlfnweljnfljwenfljnweljfnlwejnflwjnflwjenflwjfnlwejnfjlwenfljwenfjo2unfou2nfou2nojfn2ojn1enfcwjenfjwenfjwenfjknwejfnwlejnfljwenfjlnweljfnwlenfljewnfljwenlfnwelfnweljnfjwenfjwnejlfnweljnfljwenfljnweljfnlwejnflwjnflwjenflwjfnlwejnfjlwenfljwenfjo2unfou2nfou2nojfn2ojn1enfcwjenfjwenfjwenfjknwejfnwlejnfljwenfjlnweljfnwlenfljewnfljwenlfnwelf1enfcwjenfjwenfjwenfjknwejfnwlejnfljwenfjlnweljfnwlenfljewnfljwenlfnwelfnwelj1enfcwjenfjwenfjwenfjknwejfnwlejnfljwenfjlnweljfnwlenfljewnfljwenlfnwelfnweljnfjwenfjwnejlfnweljnfljwenfljnweljfnlwejnflwjnflwjenflwjfnlwejnfjlwenfljwenfjo2unfou2nfou2nojfn2ojnnfjwenfjwnejlfnweljnfljwenfljnweljfnlwejnflwjnflwjenflwjfnlwejnfjlwenfljwenfjo2unfou2nfou2nojfn2ojnnweljnfjwenfjwnejlfnweljnfljwenfljnweljfnlwejnflwjnflwjenflwjfnlwejnfjlwenfljwenfjo2unfou2nfou2nojfn2ojn fo12', CommentDate: '10/12/2023' },
    { CommentorID: '4', Name: 'Lisa', CommenterAvator: img_address, Comments: '@11', CommentDate: '10/12/2023' },
  ]

  const UploadedCardDetails = [
    { FilePic: uploadedcardpic, FileName: "Marvel Porject", FileAddedTime: "10/10/2022", FileID: "1", FileDownloadLink: "test" },
    { FilePic: uploadedcardpic, FileName: "Marvel Porject", FileAddedTime: "10/10/2022", FileID: "2", FileDownloadLink: "test" },
    { FilePic: uploadedcardpic, FileName: "Marvel Porject", FileAddedTime: "10/10/2022", FileID: "3", FileDownloadLink: "test" }

  ]

  const TotalComment = '1'



  return (
    <>

      <div className={`flex items-center w-200 rounded-[32px] h-4/5 bg-white-100`}>
        <div className={`flex justify-items-start flex-col px-12 h-full py-5 overflow-auto relative`}>
          <div className={`flex h-auto  absolute`}>
            <Button
              theme={"gray"}
              label={"Mark as Complete"}
              onClick={() => {
              }}
              size={"fill"}
            ></Button>

          </div>

          <div className={`flex pt-20`} onClick={() => {
            setOpen(true)
          }}>
            {TaskDetail.map((item) => (
              <TaskInfoBlock
                TaskID={item.TaskID}
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
            {UploadedCardDetails.map((item) => (
              <UploadedCard
                FilePic={item.FilePic}
                FileName={item.FileName}
                FileAddedTime={item.FileAddedTime}
                FileID={item.FileID}
                FileDownloadLink={item.FileDownloadLink} >

              </UploadedCard>
            ))}

          </div>


          <div className={`flex pl-2 pt-3`}><NewUploadedCard /></div>

          <div className={`ustify-items-start pt-20 pb-5`}>
            <TotalCommentItem TotalComment={TotalComment}></TotalCommentItem>
          </div>

          <div className={`flex w-176 h-auto flex-col gap-4`}>
            {CommentorData.map((item) => (
              <CommentBox
                CommentorID={item.CommentorID}
                CommentDate={item.CommentDate}
                Name={item.Name}
                CommenterAvator={item.CommenterAvator}
                Comments={item.Comments}>

              </CommentBox>
            ))}

          </div>
          <div className={`flex pt-3`}><NewCommentBox MyAvator={img_address} /></div>
          <div className={`flex pb-5 w-auto justify-items-center`}>
            <Button
              theme={"blue"}
              label={"Create"}
              onClick={() => {
              }}
              size={"fill"}
            ></Button>
          </div>
        </div>
        <Popup open={open} onClose={() => { setOpen(false) }}>
          <UserList taskId={""} onConfirm={function (collaborators: string[]): void {
            setOpen(false)
          }} />
        </Popup>
      </div>
    </>



  );
};

//export { TaskDetail };
