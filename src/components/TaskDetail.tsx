import { TaskInfoBlock } from "../components/TaskInfoBlock";
import { UploadedCard } from "../components/UploadedCard";
import { NewUploadedCard } from "../components/NewUploadedCard";
import { CommentBox } from "../components/CommentBox";
import { NewCommentBox } from "../components/NewCommentBox";
import { Button } from "./Button";
import { TotalCommentItem } from "./TotalCommentItem";


interface TaskDetailProps { }


const img_address = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"
const CommenterAvator = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9LonfTfSW8SOAc8E7Fe982afR_kqYbwSuQ&usqp=CAU"
const desc = "This is the test!!!Currently, no matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in schoolno matter whether in school, company, etc, people usually need to work as a team for the final assignment, product manufacturing, or software development. It will be very complicated if the group is very large, or the big project is divided into various small teams. Such as if the company wants to build new products, they need to have several teams, one for design, one for manufacture, one for testing, etc. If there is no well- structured system to manage the task, the products might be missing some critical parts, causing some severe issues and failing the project."
const uploadedcardpic = "https://icons.veryicon.com/png/o/miscellaneous/real-cool/live-cool-background-picture-upload.png"
const uplodaicon = "https://cdn-icons-png.flaticon.com/128/1702/1702912.png"


const TaskDetail = ({ }: TaskDetailProps) => {
  const TaskDetail = [
    { TaskID: 1234, TaskName: "Marvel Task Management", Assignee: "123", DueDate: "22/02/2023", Description: desc }
  ]


  const CommentorData = [
    { CommentorID: 1, Name: 'Linda Hsu', CommenterAvator: img_address, Comments: '@11', CommentDate: '10/12/2023' },
    { CommentorID: 2, Name: 'Teddy', CommenterAvator: img_address, Comments: '@113', CommentDate: '10/12/2023' },
    { CommentorID: 3, Name: 'Anthony', CommenterAvator: img_address, Comments: '@112', CommentDate: '10/12/2023' },
    { CommentorID: 4, Name: 'Lisa', CommenterAvator: img_address, Comments: '@11', CommentDate: '10/12/2023' },
  ]

  const UploadedCardDetails = [
    { FilePic: uploadedcardpic, FileName: "Marvel Porject", FileAddedTime: "10/10/2022", FileID: "1", FileDownloadLink: "test" },
    { FilePic: uploadedcardpic, FileName: "Marvel Porject", FileAddedTime: "10/10/2022", FileID: "2", FileDownloadLink: "test" },
    { FilePic: uploadedcardpic, FileName: "Marvel Porject", FileAddedTime: "10/10/2022", FileID: "3", FileDownloadLink: "test" }

  ]

  const TotalComment = '1'




  return (
    <>

      <div className={`flex items-center flex-col w-190 h-5/6 overflow-auto gap-2 border-solid border-2 rounded-2xl relative`}>
        <div className={`flex h-auto w-auto mt-5 left-8 absolute`}>
          <Button
            theme={"gray"}
            label={"Mark as Complete"}
            onClick={() => {
            }}
            size={"fill"}
          ></Button>

        </div>

        <div className={`flex mt-20`}>
          {TaskDetail.map((item) => (
            <TaskInfoBlock
              TaskID={item.TaskID}
              TaskName={item.TaskName}
              Assignee={item.Assignee}
              DueDate={item.DueDate}
              Description={item.Description} />
          ))}
        </div>



        <div className={`flex flex-row w-176 h-auto mt-10 mb-5`}>
          <div className={`flex font-bold text-2xl items-center`}>
            <img src={uplodaicon} className={`w-10 h-10 mr-3`} />Attachment
          </div>
        </div>

        <div className={`flex flex-col`}>
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


        <div className={`flex`}><NewUploadedCard /></div>

        <div className={`ml-12 justify-items-start mt-10 mb-5`}>
          <TotalCommentItem TotalComment={TotalComment}></TotalCommentItem>
        </div>

        <div className={`flex flex-col`}>
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
