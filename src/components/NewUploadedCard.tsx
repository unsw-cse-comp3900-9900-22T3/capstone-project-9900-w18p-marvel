import { addAttachment } from "../api/attachment";
import { addComment } from "../api/comment";
import { deleteFile, uploadFile } from "../api/storage"
import { useState } from "react"
import { useEffect } from "react";
import { useApp } from "../App"
import { Button } from "./Button";
import { uid } from "uid";
import { delay } from "../utils/promise";
import { async } from "@firebase/util";

interface NewUploadedCardProps {
  TaskId: string;
  handleGetattached: any;


}


const img_address = "https://icons.veryicon.com/png/o/miscellaneous/real-cool/live-cool-background-picture-upload.png"
const NewUploadedCard = ({ TaskId, handleGetattached }: NewUploadedCardProps) => {
  const [downloadURL, setDownloadURL] = useState<string>("")
  const [storagePath, setStoragePath] = useState<string>("")
  const [uploading, setUploading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)
  const [loading, setLoading] = useState(false);


  const { user } = useApp()



  useEffect(() => {
    setLoading(true);
  }, []);



  const handleaddedatt = async (file) => {
    if (file && user?.uid) {
      setUploading(true);

      await addAttachment(
        TaskId,
        user?.uid,
        file,
        (progress) => {
          setProgress(progress);
        },
        (error) => { },
        (url, storagePath) => {
          setDownloadURL(url);
          setStoragePath(storagePath);
          setUploading(false);
        }

      );

      await delay(6000);
    }
    await handleGetattached();
    setLoading(false);
  };








  return (
    <div className={`flex w-166 h-24 gap-5 ml-8 items-center justify-center bg-gray-50 rounded-2xl border-dashed border-2 border-gray-400 relative`}>
      <div className={`flex flex-row items-center gap-1`}>

        <input type="file" className={`block file:opacity-100 w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 content-center`}
          onChange={(e) => {

            const file = e.target.files?.[0];
            handleaddedatt(file);


          }} />
      </div>

    </div>
  );
};

export { NewUploadedCard };