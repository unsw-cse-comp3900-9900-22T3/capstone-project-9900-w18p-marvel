import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { getUser, updateUserProfile } from "../api/user";
import React, { useEffect, useState } from "react";
import { useApp } from "../App";

interface UploadedCardProps {
  FileID: number;
  FilePic?: string; //Depending on the file format for different Pic
  FileName: string;
  FileAddedTime: string;
  FileDownloadLink: string;
  UploadedBy: string;

}


const temp_img_address = "https://cdn.pixabay.com/photo/2017/02/07/02/16/cloud-2044823_960_720.png"
const waste_icon = "https://freesvg.org/img/trash.png"

const UploadedCard = ({ FileID, FilePic, FileName, FileAddedTime, FileDownloadLink, UploadedBy }: UploadedCardProps) => {

  const [uploaduser, setUploaduser] = useState(true);
  const fetchData = async () => {
    const userinfo = await getUser(UploadedBy);


    console.log(userinfo)
    setUploaduser(userinfo)

  }



  const fetchAttach = async (url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

  }


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`flex flex-col w-176 h-auto mb-2`}>


      <div className={`flex item-start items-center flex-row w-166 h-32 bg-gray-50 rounded-2xl relative ml-10`}>
        <div className={`flex h-32 w-30 items-center`}>
          <img src={temp_img_address} className={`h-20 w-20`} />
        </div>
        <div className={`flex flex-col ml-5 w-auto h-auto gap-3`} onClick={fetchAttach(FileDownloadLink)}>
          <div className={`text-xl font-bold`}>{FileName}</div>
          <div className={`text-xs text-gray-100`}>Added at {FileAddedTime}, Created by {uploaduser?.displayName ? commnetuser?.displayName : "Anonymous"}</div>
        </div>
        <div className={`flex flex-row absolute right-5 items-center`}>
          <DeleteForeverOutlinedIcon />
        </div>

      </div>
    </div >
  );
}

export { UploadedCard };

