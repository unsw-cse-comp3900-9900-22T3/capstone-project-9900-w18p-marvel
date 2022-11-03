import { CircularProgress } from "@mui/material"
import { useState } from "react"
import { uid } from "uid"
import { createProject } from "../api/project"
import { addProjectCollaborator } from "../api/projectCollaborator"
import { deleteFile, uploadFile } from "../api/storage"
import { useApp } from "../App"
import { Button } from "./Button"
import { CollaboratorChip } from "./CollaboratorChip"
import { Input } from "./Input"
import { TextInput } from "./TextInput"

interface Props{
    createdBy:string
    onComplete?:()=>void
}

export const CreateProject = ({createdBy,onComplete}:Props)=>{
    const [downloadURL,setDownloadURL] = useState<string>("")
    const [storagePath,setStoragePath] = useState<string>("")
    const [title,setTitle] = useState<string>("")
    const [uploading,setUploading] = useState<boolean>(false)
    const [progress,setProgress] = useState<number>(0)

    const {user} = useApp()

    return (
      <div className="overflow-hidden bg-white-100 relative w-[265px] h-fit rounded-3xl flex flex-col">
        <div
          className={`${
            uploading ? "brightness-75" : ""
          } transition-all relative w-full h-40 hover:brightness-75 overflow-hidden`}
        >
          <input
            type={"file"}
            className="opacity-0 absolute inset-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && user?.uid) {
                setUploading(true);
                if(storagePath !== ""){
                    deleteFile(
                      storagePath,
                      (path) => {
                    },
                    (error) => {}
                    );
                }
                uploadFile(
                  file,
                  "image",
                  (progress) => {
                    setProgress(progress);
                  },
                  (error) => {},
                  (url, storagePath) => {
                    setDownloadURL(url);
                    setStoragePath(storagePath);
                    setUploading(false);
                  }
                );
              }
            }}
          />
          {uploading && (
            <div className="absolute w-full h-full flex justify-center items-center text-white-100">
              <CircularProgress
                color="inherit"
              />
            </div>
          )}
          <img
            src={downloadURL === "" ? "/cover.png" : downloadURL}
            className="hover:brightness-75"
          />
        </div>
        <div className=" p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-base text-black">
              <TextInput
                onChange={(val) => {
                  setTitle(val)
                } } disabled={false}              />
            </div>
            <div className="pl-2 flex gap-1 text-gray-100 font-normal text-xs">
              <span>Created By - </span>
              <span className="text-black font-bold">{createdBy}</span>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center">
            <Button
              theme={"blue"}
              size={"fill"}
              label={"Create Project"}
              onClick={async () => {
                if(user?.uid){
                  if(title?.length > 0){
                    const id = uid(20)
                      await createProject(
                        id,
                        title,
                        { downloadURL, storagePath },
                        user?.uid,
                        new Date()
                      );
                      await addProjectCollaborator(user.uid,id,"owner")
                      onComplete?.()
                  }else{
                    alert("title can not be empty!")
                  }
                }else{
                  alert("user not login!")
                }
              }}
            />
          </div>
        </div>
        <div></div>
        <div className="absolute left-6 top-[136px] w-12 h-12 rounded-[12px] flex flex-col overflow-hidden border-white-100 border-[6px]">
          <div className="h-4 w-full bg-red-500"></div>
          <div className="h-full w-full bg-[#FDF5F3] flex justify-center items-center text-black font-bold text-base">
            {new Date().getDate()}
          </div>
        </div>
      </div>
    );
}